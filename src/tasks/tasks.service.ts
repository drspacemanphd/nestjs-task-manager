import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    getTasks(dto: GetTasksFilterDto): Promise<Task[]> {
        // return this.taskRepository.find();
    }

    async getById(id: string): Promise<Task> {
        const task: Task = await this.taskRepository.findOne(id);
        if (task) return task;
        throw new NotFoundException(`Task with id ${id} not found!`);
    }

    // getFiltered(filterDto: GetTasksFilterDto): Task[] {
    //     return this.tasks.filter((task: Task) => {
    //         const matchesStatus =
    //             !filterDto.status || task.status === filterDto.status;

    //         const matchesSearch =
    //             !filterDto.search ||
    //             task.title.includes(filterDto.search) ||
    //             task.description.includes(filterDto.search);

    //         return matchesStatus && matchesSearch;
    //     });
    // }

    async updateStatus(id: string, status: TaskStatus): Promise<Task> {
        const matching = await this.getById(id);
        matching.status = status;
        return this.taskRepository.save(matching);
    }

    async deleteById(id: string): Promise<void> {
        const result =  await this.taskRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Task with id ${id} not found!`);
        }
    }

    create(dto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(dto);
    }
}
