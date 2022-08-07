import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Headers,
} from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, RefreshTokenDto } from '../users/dto';
import { Public } from '../../decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoggingService } from '../logging/logging.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new LoggingService();
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.createAccessTokenFromRefreshToken(
      refreshTokenDto.refreshToken,
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logOut(@Request() req: any, @Headers('authorization') authorization) {
    await this.authService.removeRefreshToken(authorization?.split(' ')?.[1]);
    req.res.setHeader('Authorization', null);
  }
}
