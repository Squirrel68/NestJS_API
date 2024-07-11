import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { GetProjectFilterDto } from './dto/filter-project-dto';
import { IsActive } from 'src/common/is-active.enum';
import { ManageTasksDto } from './dto/manage-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { UserProjectService } from 'src/user_project/user_project.service';
import { CreateUserProjectDto } from 'src/user_project/dto/create-user_project.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ManageUsersDto } from './dto/manage-user.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private taskService: TasksService,

    @Inject(forwardRef(() => UserProjectService))
    private userProjectService: UserProjectService,

    private readonly usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<any> {
    let { start_date, end_date } = createProjectDto;
    start_date === undefined
      ? (start_date = new Date())
      : (start_date = new Date(start_date));
    end_date === undefined
      ? (end_date = new Date())
      : (end_date = new Date(end_date));
    createProjectDto.start_date = start_date;
    createProjectDto.end_date = end_date;
    return await this.projectRepository.save(createProjectDto);
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return await this.projectRepository.save(updateProjectDto);
  }

  async findAll(
    @Query() filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    const { is_active, project_type, search } = filterDto;
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.client', 'client')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .leftJoinAndSelect('project.timesheets', 'timesheets');

    if (is_active) {
      query.andWhere('project.is_active = :is_active', { is_active });
    }

    if (project_type) {
      query.andWhere('project.project_type = :project_type', { project_type });
    }

    if (search) {
      query.andWhere('LOWER(project.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    const projects = await query.getMany();
    if (projects.length === 0) {
      throw new NotFoundException('No projects found');
    }
    return projects;
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const query = await this.projectRepository
      .createQueryBuilder('project')
      .where({
        id,
        is_active: IsActive.ACTIVE,
      })
      .leftJoin('project.tasks', 'task')
      .leftJoin('project.userProjects', 'userProject')
      .leftJoin('userProject.user', 'user');
    await query.select([
      'project',
      'task.id',
      'task.name',
      'userProject.role',
      'user.id',
      'user.fullname',
    ]);
    const project = await query.getOne();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async addTaskToProject(manageTasksDto: ManageTasksDto): Promise<any> {
    const { project_id, task_id } = manageTasksDto;
    const project = await this.findOne(project_id);
    const task = await this.taskService.findOne(task_id);
    project.tasks.push(task);
    return await this.projectRepository.save(project);
  }

  async removeTaskFromProject(manageTasksDto: ManageTasksDto): Promise<any> {
    const { project_id, task_id } = manageTasksDto;
    const project = await this.findOne(project_id);
    project.tasks = project.tasks.filter((task) => task.id !== task_id);
    return await this.projectRepository.save(project);
  }

  async addUserToProject(createProjectDto: CreateUserProjectDto): Promise<any> {
    const { project_id, user_id, role } = createProjectDto;
    const userProjectExist =
      await this.userProjectService.findByUserIdAndProjectId(createProjectDto);
    if (userProjectExist) {
      // console.log('userProjectExist', userProjectExist);
      await this.userProjectService.updateRole(userProjectExist.id, role);
    } else {
      await this.userProjectService.create(createProjectDto);
    }
    const project = await this.findOne(project_id);
    return project;
  }

  async removeUserFromProject(
    createUserProject: CreateUserProjectDto,
  ): Promise<any> {
    // remove user project
    await this.userProjectService.remove(createUserProject);
    const project = await this.findOne(createUserProject.project_id);
    return project;
  }
}
