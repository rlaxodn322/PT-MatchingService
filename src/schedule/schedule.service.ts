import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { DataSource, Repository } from 'typeorm';
import { Application } from './entity/application.entity';
import { User } from 'src/user/entity/user.entity';
import { CreateScheduleDto } from './dto/createScheduledto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async createSchedule(
    teacherId: number,
    createScheduledto: CreateScheduleDto,
  ) {
    const teacher = await this.userRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher || teacher.role !== 'pt') {
      throw new NotFoundException('Teacher not found');
    }
    const schedule = this.scheduleRepository.create({
      ...createScheduledto,
      teacher,
    });
    return await this.scheduleRepository.save(schedule);
  }

  async getMyApp(userId: number) {
    return await this.applicationRepository.find({
      where: { user: { id: userId } },
      relations: ['schedule', 'schedule.teacher'],
    });
  }

  async updateApp(teacherId: number, applicationId: number, status: string) {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
      relations: ['schedule', 'schedule.teacher'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.schedule.teacher.id !== teacherId) {
      throw new Error('You are not authorized to update this application');
    }

    if (!['approved', 'rejected'].includes(status)) {
      throw new Error('Invalid status. Use "approved" or "rejected"');
    }
    application.status = status;
    return await this.applicationRepository.save(application);
  }
  async cancelSchedule(userId: number, scheduleId: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: ['teacher', 'application', 'application.user'],
    });
  
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
  
    const application = schedule.application.find(
      (app) => app.user.id === userId,
    );
  
    if (!application) {
      throw new Error('You have not applied for this schedule');
    }
  
    // 취소 처리
    schedule.isBooked = false;
    await this.scheduleRepository.save(schedule);
  
    // 신청 정보 삭제
    await this.applicationRepository.remove(application);
  
    return { message: 'Schedule canceled successfully' };
  }
  
  async getAvailableSchedules(teacherId: number) {
    return await this.scheduleRepository.find({
      where: { teacher: { id: teacherId }, isBooked: false },
    });
  }

  async applyToSchedule(userId: number, scheduleId: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId, isBooked: false },
    });
    if (!schedule) {
      throw new NotFoundException('Schedule not available');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    schedule.isBooked = true;
    await this.scheduleRepository.save(schedule);

    const application = this.applicationRepository.create({
      user,
      schedule,
      status: 'pending',
    });
    return await this.applicationRepository.save(application);
  }
}
