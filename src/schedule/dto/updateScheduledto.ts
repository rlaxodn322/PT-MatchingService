import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsNotEmpty()
  @IsNumber()
  applicationId: number;

  @IsNotEmpty()
  @IsNumber()
  status: string;
}
