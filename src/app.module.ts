import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'task_management',
            // Entities translate to tables and schemas
            // Can either load specific entities manually or autoload all that are annotated
            autoLoadEntities: true,
            // Keep schema in sync. DO NOT USE IN PROD
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
