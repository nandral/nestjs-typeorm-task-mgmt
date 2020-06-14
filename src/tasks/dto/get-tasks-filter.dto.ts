import { TaskStatus } from '../task-status.enum';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
