import { ConfigModule, ConfigService } from '@nestjs/config';
import { BranchEntity } from 'src/branches/entities/branch.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  entities: [
    UserEntity,
    BranchEntity,
    PositionEntity,
    UserProjectEntity,
    ProjectEntity,
    ClientEntity,
    TaskEntity,
    TimesheetEntity,
  ],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  // synchronize: false,
  // logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
