import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task => task.title.includes(search) || task.desc.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, desc } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, newStatus: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = newStatus;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
