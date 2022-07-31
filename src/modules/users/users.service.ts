import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, UserResponse } from './entities';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const newUser = {
      ...createUserDto,
      password: await UsersService.hashPassword(createUserDto.password),
    };
    const user = await this.usersRepository.create(newUser);
    await this.usersRepository.save(user);
    return user.toResponse();
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException();
    }
    const password = await UsersService.hashPassword(
      updatePasswordDto.newPassword,
    );
    const savedUser = await this.usersRepository.save({ ...user, password });
    return User.toResponse(savedUser);
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user.toResponse();
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ login });
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found');
    }
  }
}
