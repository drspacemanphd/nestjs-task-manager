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
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // Empty query binds the underlying query parameters object, so we don't have to explicitly
    // request with ?filterDto=...
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getById(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateTaskStatusDto,
    ): Promise<Task> {
        return this.tasksService.updateStatus(id, dto.status);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<Record<string, any>> {
        await this.tasksService.deleteById(id);
        return {
            success: true,
        };
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(dto);
    }
}
