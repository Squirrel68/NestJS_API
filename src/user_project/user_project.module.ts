import { forwardRef, Module } from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { UserProjectController } from './user_project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectEntity } from './entities/user_project.entity';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProjectEntity]),
    UsersModule,
    forwardRef(() => ProjectsModule),
  ],
  controllers: [UserProjectController],
  providers: [UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule {}
