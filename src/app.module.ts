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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserEntity]),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
