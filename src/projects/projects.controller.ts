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
import { GetProjectFilterDto } from './dto/get-project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() filterDto: GetProjectFilterDto): Promise<ProjectEntity[]> {
    return this.projectsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectsService.update(id, updateProjectDto);
  }
}
