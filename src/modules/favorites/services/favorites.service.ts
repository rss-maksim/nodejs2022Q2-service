import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FavoritesResponse } from '../models';
import { FavoritesRepository } from '../favorites.repository';
import { TracksService } from '../../tracks/services';
import { ArtistsService } from '../../artists/services';
import { AlbumsService } from '../../albums/services';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.getAll();
    const tracks = await this.tracksService.findMany(favorites.tracks);
    const artists = await this.artistsService.findMany(favorites.artists);
    const albums = await this.albumsService.findMany(favorites.albums);

    return {
      tracks,
      artists,
      albums,
    };
  }

  async addTrack(id: string): Promise<void> {
    try {
      await this.tracksService.findOneById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Track does not exist',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    return this.favoritesRepository.addTrack(id);
  }

  async deleteTrack(id: string): Promise<void> {
    return this.favoritesRepository.deleteTrack(id);
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.albumsService.findOneById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Album does not exist',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    return this.favoritesRepository.addAlbum(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    return this.favoritesRepository.deleteAlbum(id);
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.artistsService.findOneById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Artist does not exist',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    return this.favoritesRepository.addArtist(id);
  }

  async deleteArtist(id: string): Promise<void> {
    return this.favoritesRepository.deleteArtist(id);
  }
}
