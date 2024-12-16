import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyScheduelDto {
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
