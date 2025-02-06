import { IsEnum } from 'class-validator';
import { ETaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
