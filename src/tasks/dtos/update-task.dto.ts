import { IsEnum } from 'class-validator';
import { ETaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
