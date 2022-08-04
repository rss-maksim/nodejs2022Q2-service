import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { TokenPayload } from './types';
import { User } from '../users/entities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private static getTokenOptions() {
    const options: JwtSignOptions = {
      secret: process.env.REFRESH_TOKEN_SECRET,
    };
    const expiration: string = process.env.REFRESH_TOKEN_EXPIRATION;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new ForbiddenException();
      }
      delete user.password;
      return user;
    }
    return null;
  }

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async login(user: any) {
    const payload: TokenPayload = { login: user.login, userId: user.id };
    const refreshToken = this.jwtService.sign(
      payload,
      AuthService.getTokenOptions(),
    );
    await this.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken,
    };
  }

  public async createAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as TokenPayload;
      if (!decoded) {
        throw new Error();
      }
      const user = await this.usersService.findOneById(decoded.userId);
      if (!user) {
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refresh_token,
      );
      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('Invalid token');
      }
      await this.jwtService.verifyAsync(
        refreshToken,
        this.getRefreshTokenOptions(user),
      );
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getRefreshTokenOptions(user: User): JwtSignOptions {
    return AuthService.getTokenOptions();
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    return await this.usersService.update(userId, currentHashedRefreshToken);
  }

  async removeRefreshToken(token: string) {
    const decoded = this.jwtService.decode(token) as TokenPayload;
    const user = await this.usersService.findOneById(decoded.userId);

    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.usersService.update(decoded.userId, null);
  }
}
