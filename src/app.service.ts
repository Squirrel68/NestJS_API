import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { FilterUserDto } from './users/dto/filter-user.dto';
import { IsActive } from './common/is-active.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UsersService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async setUserEmailsList() {
    const filterDto: FilterUserDto = {
      page: '1',
      items_per_page: '10000',
      is_active: IsActive.ACTIVE,
    };
    const CacheTTL = 1000 * 60 * 60 * 24;
    const users = await this.userService.findAll(filterDto);
    const listEmail = await users.data.map((user) => user.email);
    await this.cacheManager.set('userEmailsList', listEmail, CacheTTL);
    return {
      message: 'User emails list has been cached',
      data: listEmail,
      ttl: CacheTTL,
    };
  }

  async getUserEmailsList() {
    const userEmailsList = await this.cacheManager.get('userEmailsList');
    if (!userEmailsList) {
      return {
        message: 'User emails list is empty',
        data: userEmailsList,
      };
    }
    return {
      message: 'User emails list',
      data: userEmailsList,
    };
  }
}
