import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(
    @Query('is_active') is_active: IsActive,
  ): Promise<UserEntity[]> {
    const query = this.userRepository.createQueryBuilder('user');
    if (is_active) {
      query.andWhere('user.is_active = :is_active', { is_active });
    }
    const users = await query.getMany();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);
    user.is_active = IsActive.INACTIVE;
    await this.userRepository.save(user);
    return user;
  }
}
