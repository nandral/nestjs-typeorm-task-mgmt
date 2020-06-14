import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './validation-pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @ApiOkResponse({ description: 'Get tasks. Filter on status or search' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser()
    user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @ApiOkResponse({ description: 'Get task by ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Task Deletion' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser()
    user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Task creation' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser()
    user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} creating task ${JSON.stringify(createTaskDTO)}`,
    );
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch(':id/status')
  @ApiCreatedResponse({ description: 'Update Task' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe)
    status: TaskStatus,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
