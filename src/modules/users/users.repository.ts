import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from './models';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UsersRepository {
  private users: User[] = [];
  static excludedFields: string[] = ['password'];

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const newUser = {
      ...createUserDto,
      password: await UsersRepository.hashPassword(createUserDto.password),
      id: uuidv4(),
      createdAt: Date.now(),
      version: 1,
    };
    this.users.push(newUser);

    return omit(newUser, UsersRepository.excludedFields);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findUser(id);
    const isPasswordCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ForbiddenException();
    }
    const password = await UsersRepository.hashPassword(
      updatePasswordDto.newPassword,
    );
    const updatedUser = { ...user, password, version: user.version + 1 };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );
    return omit(updatedUser, UsersRepository.excludedFields);
  }

  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.users.map(({ password, ...user }) => user);
  }

  async findOneById(id: string): Promise<Partial<User>> {
    const user = await this.findUser(id);
    return omit(user, UsersRepository.excludedFields);
  }

  async delete(id: string): Promise<void> {
    await this.findUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  async findUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
