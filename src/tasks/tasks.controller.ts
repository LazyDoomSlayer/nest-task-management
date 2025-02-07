import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterTasksDto: FilterTasksDto): ITask[] {
  //   if (Object.keys(filterTasksDto).length) {
  //     return this.tasksService.getFilteredTasks(filterTasksDto);
  //   }
  //
  //   return this.tasksService.getAllsTasks();
  // }
  //
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTaskById(id);
  }
  //
  // @Patch('/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): ITask | undefined {
  //   return this.tasksService.updateTaskById(id, updateTaskDto);
  // }
  //
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }
}
