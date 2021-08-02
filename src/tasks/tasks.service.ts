import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    constructor() {
        this.tasks.push({
            id: '1',
            title: 'A Default Task',
            description: 'A Default Task',
            status: TaskStatus.OPEN,
        });
    }

    getAll(): Task[] {
        return this.tasks;
    }

    getById(id: string): Task {
        const matching = this.tasks.filter((t) => t.id === id);
        if (matching.length > 0) return matching[0];
        throw new NotFoundException(`Task with id ${id} not found!`);
    }

    getFiltered(filterDto: GetTasksFilterDto): Task[] {
        return this.tasks.filter((task: Task) => {
            const matchesStatus =
                !filterDto.status || task.status === filterDto.status;

            const matchesSearch =
                !filterDto.search ||
                task.title.includes(filterDto.search) ||
                task.description.includes(filterDto.search);

            return matchesStatus && matchesSearch;
        });
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const matching = this.deleteById(id);
        if (!matching) return null;
        matching.status = status;
        this.tasks.push(matching);
        return matching;
    }

    deleteById(id: string): Task {
        const matching = this.tasks.filter((t) => t.id === id);
        this.tasks = this.tasks.filter((t) => t.id !== id);
        if (matching.length > 0) return matching[0];
        throw new NotFoundException(`Task with id ${id} not found!`);
    }

    create(dto: CreateTaskDto): Task {
        const task: Task = {
            id: uuid(),
            title: dto.title,
            description: dto.description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }
}
