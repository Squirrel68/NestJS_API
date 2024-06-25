import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { BranchesModule } from './branches/branches.module';
import { PositionsModule } from './positions/positions.module';
import { UsersModule } from './users/users.module';

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
    ClientsModule,
    ProjectsModule,
    BranchesModule,
    PositionsModule,
    UsersModule,
  ],
})
export class AppModule {}
