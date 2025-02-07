import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

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
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string) {
  //   this.tasksService.deleteTaskById(id);
  // }
  //
  // @Patch('/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): ITask | undefined {
  //   return this.tasksService.updateTaskById(id, updateTaskDto);
  // }
  //
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): ITask {
  //   return this.tasksService.createTask(createTaskDto);
  // }
}
