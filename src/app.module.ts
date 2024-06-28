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
  ],
})
export class AppModule {}
