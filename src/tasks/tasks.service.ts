import { Injectable } from '@nestjs/common';
import { ETaskStatus, type ITask } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTasksDto } from './dtos/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllsTasks(): ITask[] {
    return this.tasks;
  }

  getFilteredTasks(filterTasksDto: FilterTasksDto): ITask[] {
    const { description, title, status } = filterTasksDto;

    let tasks: ITask[] = this.getAllsTasks();

    if (description) {
      tasks = tasks.filter((value) => value.description === description);
    }

    if (title) {
      tasks = tasks.filter((value) => value.title === title);
    }

    if (status) {
      tasks = tasks.filter((value) => value.status === status);
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): ITask | undefined {
    return this.tasks.find((value) => value.id === id);
  }

  deleteTaskById(id: string): boolean {
    const index = this.tasks.findIndex((value) => value.id === id);
    if (index === -1) {
      return false;
    }

    try {
      this.tasks.splice(index, 1);

      return true;
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): ITask | undefined {
    const { status } = updateTaskDto;
    const index = this.tasks.findIndex((value) => value.id === id);
    if (index === -1) {
      return undefined;
    }

    try {
      this.tasks[index].status = status;

      return this.tasks[index];
    } catch (error) {
      console.error(error);
    }

    return undefined;
  }
}
