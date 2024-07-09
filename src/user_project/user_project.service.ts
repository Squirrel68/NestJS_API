import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { UserProjectEntity } from './entities/user_project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(UserProjectEntity)
    private readonly userProjectRepository: Repository<UserProjectEntity>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
  ) {}
  async create(createUserProjectDto: CreateUserProjectDto) {
    const { user_id, project_id, role } = createUserProjectDto;
    const user = await this.usersService.findOne(user_id);
    const project = await this.projectsService.findOne(project_id);
    return await this.userProjectRepository.save({
      user,
      project,
      role,
    });
  }
  async remove(createUserProjectDto: CreateUserProjectDto) {
    const userProject =
      await this.findByUserIdAndProjectId(createUserProjectDto);
    if (!userProject) {
      return {
        statuscode: HttpStatus.NOT_FOUND,
        message: 'User Project not found',
      };
    }
    return await this.userProjectRepository.remove(userProject);
  }
  async findById(id: string): Promise<any> {
    const userProject = await this.userProjectRepository.findOne({
      where: { id },
    });
    if (!userProject) {
      return {
        statuscode: HttpStatus.NOT_FOUND,
        message: 'User Project not found',
      };
    }
    return userProject;
  }
  async findByUserIdAndProjectId(
    createUserProjectDto: CreateUserProjectDto,
  ): Promise<any> {
    const { user_id, project_id } = createUserProjectDto;
    const query = this.userProjectRepository
      .createQueryBuilder('user_project')
      .leftJoinAndSelect('user_project.user', 'user')
      .leftJoinAndSelect('user_project.project', 'project');
    query.where('user_project.user_id = :user_id', { user_id });
    query.andWhere('user_project.project_id = :project_id', { project_id });
    const userProject = await query.getOne();
    if (!userProject) {
      return null;
    }
    return userProject;
  }

  async updateRole(id: string, role: string): Promise<any> {
    const userProject = await this.userProjectRepository.findOne({
      where: { id },
    });
    if (!userProject) {
      return {
        statuscode: HttpStatus.NOT_FOUND,
        message: 'User Project not found',
      };
    }
    userProject.role = role;
    return await this.userProjectRepository.save(userProject);
  }
}
