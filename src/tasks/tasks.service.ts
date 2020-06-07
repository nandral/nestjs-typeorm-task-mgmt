import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  createTask(title: string, desc: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
