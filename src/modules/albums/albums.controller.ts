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

import { AlbumDto } from './dto';
import { AlbumsService } from './albums.service';
import { Album } from './models';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post('')
  create(@Body() albumDto: AlbumDto): Promise<Partial<Album>> {
    return this.albumsService.create(albumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() albumDto: AlbumDto,
  ): Promise<Partial<Album>> {
    return this.albumsService.update(id, albumDto);
  }

  @Get('')
  async getAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Album>> {
    return this.albumsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumsService.delete(id);
  }
}
