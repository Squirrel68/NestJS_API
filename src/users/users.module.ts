import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { BranchEntity } from 'src/branches/entities/branch.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { BranchesModule } from 'src/branches/branches.module';
import { PositionsModule } from 'src/positions/positions.module';
import { BranchesService } from 'src/branches/branches.service';
import { PositionsService } from 'src/positions/positions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BranchEntity, PositionEntity]),
    ConfigModule,
    // BranchesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, BranchesService, PositionsService],
  exports: [UsersService],
})
export class UsersModule {}
