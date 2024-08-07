import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { GetProjectFilterDto } from './dto/filter-project-dto';
import { RoleEnum } from 'src/common/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { ManageTasksDto } from './dto/manage-task.dto';
import { ManageUsersDto } from './dto/manage-user.dto';
import { CreateUserProjectDto } from 'src/user_project/dto/create-user_project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.create(createProjectDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get()
  findAll(@Query() filterDto: GetProjectFilterDto): Promise<ProjectEntity[]> {
    return this.projectsService.findAll(filterDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectsService.findOne(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch()
  update(@Body() updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.update(updateProjectDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('add-task')
  addTaskToProject(@Body() manageTasksDto: ManageTasksDto): Promise<any> {
    return this.projectsService.addTaskToProject(manageTasksDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('remove-task')
  removeTaskFromProject(@Body() manageTasksDto: ManageTasksDto): Promise<any> {
    return this.projectsService.removeTaskFromProject(manageTasksDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('add-user')
  addUserToProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
  ): Promise<any> {
    return this.projectsService.addUserToProject(createUserProjectDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('remove-user')
  removeUserFromProject(
    @Body() CreateUserProjectDto: CreateUserProjectDto,
  ): Promise<any> {
    return this.projectsService.removeUserFromProject(CreateUserProjectDto);
  }
}
