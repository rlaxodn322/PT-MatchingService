import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { Repository } from 'typeorm';
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
