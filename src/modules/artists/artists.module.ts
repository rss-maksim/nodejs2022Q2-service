import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services';
import { ArtistsRepository } from './artists.repository';
import { TracksService } from '../tracks/services';
import { TracksRepository } from '../tracks/tracks.repository';
import { AlbumsService } from '../albums/services';
import { AlbumsRepository } from '../albums/albums.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsRepository,
    TracksService,
    TracksRepository,
    AlbumsService,
    AlbumsRepository,
  ],
  exports: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}
