import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from '../dto';
import { User } from '../models/User.model';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userRepository.create(createUserDto);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    return this.userRepository.updatePassword(id, updatePasswordDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneById(id: string): Promise<Partial<User>> {
    return this.userRepository.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
