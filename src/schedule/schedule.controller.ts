import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScheduleDto } from './dto/createScheduledto';
import { ApplyScheduelDto } from './dto/applyScheduledto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createSchedule(
    @Req() req: any,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    const teacherId = req.user.id;
    return this.scheduleService.createSchedule(teacherId, createScheduleDto);
  }

  @Get('available/:teacherId')
  async getAvailableSchedules(@Req() req: any) {
    const teacherId = req.params.teacherId;
    return this.scheduleService.getAvailableSchedules(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  async applyToSchedule(
    @Req() req: any,
    @Body() applyScheduelDto: ApplyScheduelDto,
  ) {
    const userId = req.user.id;
    return this.scheduleService.applyToSchedule(
      userId,
      applyScheduelDto.scheduleId,
    );
  }
}
