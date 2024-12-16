import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScheduleDto } from './dto/createScheduledto';
import { ApplyScheduelDto } from './dto/applyScheduledto';
import { UpdateApplicationStatusDto } from './dto/updateScheduledto';
import { CancleScheduleDto } from './dto/cancelScheduledto';

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
  @UseGuards(JwtAuthGuard)
  @Get('my-app')
  async getMyApplication(@Req() req: any) {
    const userId = req.user.id;
    return this.scheduleService.getMyApp(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-status')
  async updateApplicationStatus(
    @Req() req: any,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    const teacherId = req.user.id;
    return this.scheduleService.updateApp(
      teacherId,
      updateApplicationStatusDto.applicationId,
      updateApplicationStatusDto.status,
    );
  }
  @UseGuards(JwtAuthGuard)

  @Post('cancel')
  async cancelSchedule(
    @Req() req: any,
    @Body() cancelScheduleDto: CancleScheduleDto,
  ) {
    const userId = req.user.id;
    return this.scheduleService.cancelSchedule(
      userId,
      cancelScheduleDto.scheduleId,
    );
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
