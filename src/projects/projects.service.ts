import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { GetProjectFilterDto } from './dto/get-project-dto';
import { IsActive } from 'src/common/is-active.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<any> {
    let { name, project_type, start_date, end_date } = createProjectDto;
    if (start_date === undefined) {
      start_date = new Date();
    } else {
      start_date = new Date(start_date);
    }
    if (end_date === undefined) {
      end_date = new Date();
    } else {
      end_date = new Date(end_date);
    }

    const project = this.projectRepository.create({
      name,
      project_type,
      start_date,
      end_date,
      is_active: IsActive.ACTIVE,
    });
    await this.projectRepository.save(project);
    return project;
  }

  async findAll(
    @Query() filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    const { is_active, project_type, search } = filterDto;
    const query = this.projectRepository.createQueryBuilder('project');

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
    const task = await this.projectRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return task;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id);
    const { name, project_type, start_date, end_date, is_active } =
      updateProjectDto;
    project.name = name;
    project.project_type = project_type;
    project.start_date = start_date;
    project.end_date = end_date;
    project.is_active = is_active;
    await this.projectRepository.save(project);
    return project;
  }
}
