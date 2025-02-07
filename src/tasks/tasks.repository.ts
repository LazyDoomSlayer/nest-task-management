import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async findById(id: string): Promise<Task | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async saveTask(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }
}
