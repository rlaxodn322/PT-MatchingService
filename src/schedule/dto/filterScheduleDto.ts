import { IsOptional, IsString } from 'class-validator';

export class FilterScheduleDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;
}
