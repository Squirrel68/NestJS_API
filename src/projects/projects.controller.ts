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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectsService.update(id, updateProjectDto);
  }
}
