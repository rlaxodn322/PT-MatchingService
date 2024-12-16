import { IsNotEmpty, IsNumber } from 'class-validator';

export class CancleScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
