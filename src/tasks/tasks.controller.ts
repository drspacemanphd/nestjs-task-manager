import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-tast-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // Empty query binds the underlying query parameters object, so we don't have to explicitly
    // request with ?filterDto=...
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getFiltered(filterDto);
        }
        console.log('all');
        return this.tasksService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Task {
        return this.tasksService.getById(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateTaskStatusDto,
    ): Task {
        return this.tasksService.updateStatus(id, dto.status);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): Task {
        return this.tasksService.deleteById(id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Task {
        return this.tasksService.create(dto);
    }
}
