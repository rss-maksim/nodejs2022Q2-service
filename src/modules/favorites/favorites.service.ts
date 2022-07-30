import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { FavoritesResponse } from './models';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { Favorite, FavoriteType } from './entities';

@Injectable()
export class FavoritesService {
  userId = uuidv4();

  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.find();
    const favs = favorites.reduce(
      (acc, favorite) => {
        if (favorite.type === FavoriteType.Track) {
          acc.tracks.push(favorite.id);
        } else if (favorite.type === FavoriteType.Album) {
          acc.albums.push(favorite.id);
        } else if (favorite.type === FavoriteType.Artist) {
          acc.artists.push(favorite.id);
        }
        return acc;
      },
      { tracks: [], artists: [], albums: [] },
    );
    const tracks = await this.tracksService.findMany(favs.tracks);
    const artists = await this.artistsService.findMany(favs.artists);
    const albums = await this.albumsService.findMany(favs.albums);

    return {
      tracks,
      artists,
      albums,
    };
  }

  async addTrack(id: string): Promise<void> {
    const existingFavorite = await this.favoritesRepository.findOneBy({ id });
    if (existingFavorite) {
      throw new BadRequestException();
    }
    const track = await this.tracksService.findOneById(id);
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track does not exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = {
      id,
      userId: this.userId,
      type: FavoriteType.Track,
    };
    const newFavorite = await this.favoritesRepository.create(favorite);
    await this.favoritesRepository.save(newFavorite);
  }

  async deleteTrack(id: string): Promise<void> {
    await this.deleteFavorite(id);
  }

  async addAlbum(id: string): Promise<void> {
    const existingFavorite = await this.favoritesRepository.findOneBy({ id });
    if (existingFavorite) {
      throw new BadRequestException();
    }
    const album = await this.albumsService.findOneById(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album does not exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = {
      id,
      userId: this.userId,
      type: FavoriteType.Album,
    };
    const newFavorite = await this.favoritesRepository.create(favorite);
    await this.favoritesRepository.save(newFavorite);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.deleteFavorite(id);
  }

  async addArtist(id: string): Promise<void> {
    const existingFavorite = await this.favoritesRepository.findOneBy({ id });
    if (existingFavorite) {
      throw new BadRequestException();
    }
    const artist = await this.artistsService.findOneById(id);
    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist does not exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = {
      id,
      userId: this.userId,
      type: FavoriteType.Artist,
    };
    const newFavorite = await this.favoritesRepository.create(favorite);
    await this.favoritesRepository.save(newFavorite);
  }

  async deleteArtist(id: string): Promise<void> {
    await this.deleteFavorite(id);
  }

  async deleteFavorite(id: string): Promise<void> {
    const result = await this.favoritesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found');
    }
  }
}
