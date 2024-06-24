import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { TimesheetsModule } from './timesheets/timesheets.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ncc-time-sheet',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    UsersModule,
    ClientsModule,
    TimesheetsModule,
  ],
})
export class AppModule {}
