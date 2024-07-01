import { Module } from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { UserProjectController } from './user_project.controller';

@Module({
  controllers: [UserProjectController],
  providers: [UserProjectService],
})
export class UserProjectModule {}
