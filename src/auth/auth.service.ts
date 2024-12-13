import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  refresh(refreshToken: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userService.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }
  // async logout(userId: number) {
  //   console.log(userId);
  //   await this.userService.updateRefreshToken(userId, null);
  // }
  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken); // JWT 토큰 검증
      const user = await this.userService.findOneByEmail(payload.email);

      if (!user || !(await bcrypt.compare(refreshToken, user.refreshToken))) {
        // 리프레시 토큰 비교
        throw new UnauthorizedException('Invalid refresh token');
      }

      // 새 액세스 토큰 발급
      return this.login(user); // 로그인 로직에 따라 액세스 토큰을 발급
    } catch (error) {
      console.error('Error in refreshTokens:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // async refreshTokens(refreshToken: string) {
  //   try {
  //     const payload = this.jwtService.verify(refreshToken);
  //     const user = await this.userService.findOneByEmail(payload.email);
  //     if (!user || (await bcrypt.compare(refreshToken, user.refreshToken))) {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }
  //     return this.login(user);
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
}
