import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTasksDto } from './dtos/filter-tasks.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findById(id);

    if (!found) {
      throw new NotFoundException(`Task could not be found with id: ${id}`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task could not be found with id: ${id}`);
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;

    await this.tasksRepository.save(task);

    return task;
  }
}
