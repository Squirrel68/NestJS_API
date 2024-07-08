import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';
import { GetClientFilterDto } from './dto/get-client-filter.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(createClientDto);
  }

  async findAll(
    @Query() filterDto: GetClientFilterDto,
  ): Promise<ClientEntity[]> {
    const { is_active, search } = filterDto;
    const query = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.projects', 'projects');
    if (is_active) {
      query.andWhere('client.is_active = :is_active', { is_active });
    }
    if (search) {
      query.andWhere('LOWER(client.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const clients = await query.getMany();
    if (clients.length === 0) {
      throw new NotFoundException('No clients found');
    }
    return clients;
  }

  async findOne(id: string): Promise<ClientEntity> {
    const query = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.projects', 'projects')
      .where('client.id = :id', { id });
    const client = await query.getOne();
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async update(updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(updateClientDto);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
  }
}
