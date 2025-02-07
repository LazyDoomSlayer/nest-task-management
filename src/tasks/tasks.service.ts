import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  //   getAllsTasks(): ITask[] {
  //     return this.tasks;
  //   }
  //
  //   getFilteredTasks(filterTasksDto: FilterTasksDto): ITask[] {
  //     const { description, title, status } = filterTasksDto;
  //
  //     let tasks: ITask[] = this.getAllsTasks();
  //
  //     if (description) {
  //       tasks = tasks.filter((value) => value.description === description);
  //     }
  //
  //     if (title) {
  //       tasks = tasks.filter((value) => value.title === title);
  //     }
  //
  //     if (status) {
  //       tasks = tasks.filter((value) => value.status === status);
  //     }
  //
  //     return tasks;
  //   }
  //
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto);
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

  //
  //   updateTaskById(id: string, updateTaskDto: UpdateTaskDto): ITask | undefined {
  //     const { status } = updateTaskDto;
  //     const index = this.tasks.findIndex((value) => value.id === id);
  //     if (index === -1) {
  //       return undefined;
  //     }
  //
  //     try {
  //       this.tasks[index].status = status;
  //
  //       return this.tasks[index];
  //     } catch (error) {
  //       console.error(error);
  //     }
  //
  //     return undefined;
  //   }
}
