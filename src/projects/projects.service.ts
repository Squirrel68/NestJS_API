import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { GetProjectFilterDto } from './dto/filter-project-dto';
import { IsActive } from 'src/common/is-active.enum';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { ManageTasksDto } from './dto/manage-task.dto';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    private taskService: TasksService,
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
    const task = await this.projectRepository.findOne({
      where: { id, is_active: IsActive.ACTIVE },
      relations: ['client', 'tasks', 'timesheets', 'userProjects'],
    });
    if (!task) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return task;
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
}
