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
import { TrackDto } from './dto';
import { TracksService } from './tracks.service';
import { Track } from './entities';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post('')
  create(@Body() trackDto: TrackDto): Promise<Track> {
    return this.tracksService.create(trackDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() trackDto: TrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, trackDto);
  }

  @Get('')
  async getAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.tracksService.delete(id);
  }
}
