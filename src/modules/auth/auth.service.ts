import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async login(user: any) {
    console.log('login', user);
    const payload = { login: user.login, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
