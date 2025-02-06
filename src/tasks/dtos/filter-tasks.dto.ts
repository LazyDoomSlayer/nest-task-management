import { ETaskStatus } from '../task.model';

export class FilterTasksDto {
  title?: string;
  description?: string;
  status?: ETaskStatus;
}
