import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await this.hashPassword(createUserDto.password);
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (user) {
      throw new NotFoundException('Username already exists');
    }
    return await this.userRepository.save({
      ...createUserDto,
      refresh_token: 'refresh_token',
      password: hashPassword,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findAll(@Query() query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = items_per_page * (page - 1);
    const is_active = query.is_active;
    const [result, total] = await this.userRepository.findAndCount({
      where: { is_active },
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip,
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: result,
      pagination: {
        total,
        per_page: items_per_page,
        current_page: page,
        last_page: lastPage,
        next_page: nextPage,
        prev_page: prevPage,
      },
    };
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

  async updateAvatar(id: string, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar });
  }
}
