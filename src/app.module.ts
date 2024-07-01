import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { BranchesModule } from './branches/branches.module';
import { PositionsModule } from './positions/positions.module';
import { UsersModule } from './users/users.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { dataSourceOptions } from 'db/data-source';
import { UserProjectModule } from './user_project/user_project.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientsModule,
    ProjectsModule,
    BranchesModule,
    PositionsModule,
    UsersModule,
    TimesheetsModule,
    UserProjectModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
