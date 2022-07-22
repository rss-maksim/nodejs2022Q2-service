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
import { ArtistDto } from './dto';
import { ArtistsService } from './services';
import { Artist } from './models';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post('')
  create(@Body() artistDto: ArtistDto): Promise<Partial<Artist>> {
    return this.artistsService.create(artistDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artistDto: ArtistDto,
  ): Promise<Partial<Artist>> {
    return this.artistsService.update(id, artistDto);
  }

  @Get('')
  async getAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Artist>> {
    return this.artistsService.findOneById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.artistsService.delete(id);
  }
}
