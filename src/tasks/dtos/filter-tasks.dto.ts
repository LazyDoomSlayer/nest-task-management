import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ETaskStatus } from '../task.model';

export class FilterTasksDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;
}
