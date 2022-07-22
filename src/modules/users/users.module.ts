import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
