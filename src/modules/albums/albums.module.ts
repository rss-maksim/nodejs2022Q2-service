import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services';
import { AlbumsRepository } from './albums.repository';
import { TracksService } from '../tracks/services';
import { TracksRepository } from '../tracks/tracks.repository';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, TracksService, TracksRepository],
  exports: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
