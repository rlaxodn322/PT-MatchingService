import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // 사용자 정보는 req.user에 담겨있음
    const user = await this.userService.findOneByEmail(req.user.email);
    // 필요한 정보를 필터링하여 반환 (비밀번호 제외)
    const { password, refreshToken, ...profile } = user;
    return profile;
  }
}
