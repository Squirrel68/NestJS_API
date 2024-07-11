import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { GetClientFilterDto } from './dto/get-client-filter.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';

@Roles(RoleEnum.ADMIN)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientsService.create(createClientDto);
  }
  @Get()
  findAll(@Query() filterDto: GetClientFilterDto): Promise<ClientEntity[]> {
    return this.clientsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientsService.findOne(id);
  }

  @Patch()
  update(@Body() updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    return this.clientsService.update(updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientsService.remove(id);
  }
}
