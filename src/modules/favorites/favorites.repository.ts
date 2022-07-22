import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './models';
import FavoritesStore from './store/FavoritesStore';

@Injectable()
export class FavoritesRepository {
  get favorites(): Favorites {
    return FavoritesStore.getFavorites();
  }

  set favorites(favorites: Favorites) {
    FavoritesStore.setFavorites(favorites);
  }

  async getAll(): Promise<Favorites> {
    return this.favorites;
  }

  async addTrack(id: string): Promise<void> {
    const hasTrack = this.favorites.tracks.some((trackId) => id === trackId);
    if (hasTrack) {
      throw new BadRequestException();
    }

    this.favorites = {
      ...this.favorites,
      tracks: [...this.favorites.tracks, id],
    };
  }

  async deleteTrack(id: string): Promise<void> {
    const { tracks } = this.favorites;
    if (!tracks.includes(id)) {
      throw new NotFoundException();
    }
    this.favorites = {
      ...this.favorites,
      tracks: this.favorites.tracks.filter((trackId) => trackId !== id),
    };
  }

  async addAlbum(id: string): Promise<void> {
    const hasAlbum = this.favorites.albums.some((albumId) => id === albumId);
    if (hasAlbum) {
      throw new BadRequestException();
    }

    this.favorites = {
      ...this.favorites,
      albums: [...this.favorites.albums, id],
    };
  }

  async deleteAlbum(id: string): Promise<void> {
    const { albums } = this.favorites;
    if (!albums.includes(id)) {
      throw new NotFoundException();
    }
    this.favorites = {
      ...this.favorites,
      albums: this.favorites.albums.filter((trackId) => trackId !== id),
    };
  }

  async addArtist(id: string): Promise<void> {
    const hasArtist = this.favorites.artists.some(
      (artistId) => id === artistId,
    );
    if (hasArtist) {
      throw new BadRequestException();
    }
    this.favorites = {
      ...this.favorites,
      artists: [...this.favorites.artists, id],
    };
  }

  async deleteArtist(id: string): Promise<void> {
    const { artists } = this.favorites;
    if (!artists.includes(id)) {
      throw new NotFoundException();
    }
    this.favorites = {
      ...this.favorites,
      artists: this.favorites.artists.filter((artistId) => artistId !== id),
    };
  }
}
