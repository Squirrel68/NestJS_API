import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { UserProjectService } from 'src/user_project/user_project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, TaskEntity, UserProjectEntity]),
    TasksModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService, UserProjectService],
})
export class ProjectsModule {}
