import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ETaskStatus } from './task-status.enum';
import { FilterTasksDto } from './dtos/filter-tasks.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private _dataSource: DataSource) {
    super(Task, _dataSource.createEntityManager());
  }

  async getTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    const { status, title, description } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (title || description) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (description) {
      query.andWhere('LOWER(task.description) LIKE LOWER(:description)', {
        description: `%${description}%`,
      });
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    return await this.findOne({ where: { id } });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: ETaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  async deleteTask(id: string) {
    return await this.delete(id);
  }
}
