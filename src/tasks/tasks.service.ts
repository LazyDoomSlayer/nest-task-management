import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

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
  //   createTask(createTaskDto: CreateTaskDto): ITask {
  //     const { title, descriptioError: Nn } = createTaskDto;
  //
  //     const task: ITask = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: ETaskStatus.OPEN,
  //     };
  //
  //     this.tasks.push(task);
  //
  //     return task;
  //   }
  //
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task could not be found with id: ${id}`);
    }

    return found;
  }

  //   deleteTaskById(id: string) {
  //     const task = this.getTaskById(id);
  //
  //     this.tasks = this.tasks.filter((value) => value.id !== task?.id);
  //   }
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
