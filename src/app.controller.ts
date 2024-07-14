import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from './auth/decorator/role.decorator';
import { RoleEnum } from './common/role.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(RoleEnum.ADMIN)
  @Get('set-cache')
  async setCache() {
    return await this.appService.setUserEmailsList();
  }

  @Roles(RoleEnum.ADMIN)
  @Get('get-cache')
  async getCache() {
    return await this.appService.getUserEmailsList();
  }
}
