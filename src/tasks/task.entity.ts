import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

// Note the task.entity.ts naming convention
// This is important for auto-loading
@Entity({
    name: 'Task',
})
export default class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
    })
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
