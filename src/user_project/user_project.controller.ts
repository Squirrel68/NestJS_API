import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';

@Roles(RoleEnum.ADMIN)
@Controller('user-project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Post()
  create(@Body() createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectService.create(createUserProjectDto);
  }

  // @Get(':id')
  // findOne(@Param() createUserProjectDto: CreateUserProjectDto) {
  //   return this.userProjectService.findOne(createUserProjectDto);
  // }

  // @Patch(':id')
  // update(@Body() updateUserProjectDto: CreateUserProjectDto) {
  //   return this.userProjectService.update(updateUserProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param() createUserProjectDto: CreateUserProjectDto) {
  //   return this.userProjectService.remove(createUserProjectDto);
  // }
}
