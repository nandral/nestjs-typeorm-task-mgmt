import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, desc } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.desc = desc;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
      delete task.user;
      return task;
    } catch (err) {
      this.logger.error(
        `Failed to create task for User ${
          user.username
        }. Data: ${JSON.stringify(createTaskDTO)}`,
        err.stack,
      );
    }
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', {
        search: `%${search}%`,
      });
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      this.logger.error(
        `Failed to get tasks for user ${user.username} DTO: ${JSON.stringify(
          filterDto,
        )}`,
        err.stack,
      );
      throw new InternalServerErrorException(err.message);
    }
  }
}
