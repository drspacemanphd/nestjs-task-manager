import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    getTasks(dto: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if (dto.status) {
            query.andWhere('task.status = :status', { status: 'OPEN' });
        }

        if (dto.search) {
            query.andWhere(
                'task.title LIKE LOWER(:search) OR task.description LIKE LOWER(:search)',
                { search: `%${dto.search.toLowerCase()}%` },
            );
        }

        return query.getMany();
    }

    createTask(dto: CreateTaskDto): Promise<Task> {
        const task: Task = this.create({
            title: dto.title,
            description: dto.description,
            status: TaskStatus.OPEN,
        });

        return this.save(task);
    }
}
