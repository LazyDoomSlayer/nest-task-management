import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-task-managment-db',
      entities: [User, Task],
      // Migrations
      autoLoadEntities: false,
      synchronize: true,
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
