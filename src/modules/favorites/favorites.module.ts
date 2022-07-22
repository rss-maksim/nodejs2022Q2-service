import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services';
import { FavoritesRepository } from './favorites.repository';
import { AlbumsService } from '../albums/services';
import { ArtistsService } from '../artists/services';
import { TracksService } from '../tracks/services';
import { AlbumsRepository } from '../albums/albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { TracksRepository } from '../tracks/tracks.repository';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesRepository,
    TracksService,
    TracksRepository,
    AlbumsService,
    ArtistsService,
    AlbumsRepository,
    ArtistsRepository,
  ],
})
export class FavoritesModule {}
