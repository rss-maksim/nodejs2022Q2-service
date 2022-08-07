import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { UsersService } from './users.service';
import { UserResponse } from './entities';
import { Public } from '../../decorators/public.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('')
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Get('')
  async getAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
