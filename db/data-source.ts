import { BranchEntity } from 'src/branches/entities/branch.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'ncc_timesheet',
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
  synchronize: false,
  // logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
