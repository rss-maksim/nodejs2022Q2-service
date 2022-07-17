import { Injectable } from '@nestjs/common';

import { AlbumDto } from '../dto';
import { Album } from '../models';
import { AlbumsRepository } from '../albums.repository';
import { TracksService } from '../../tracks/services';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly tracksService: TracksService,
  ) {}

  async create(albumDto: AlbumDto): Promise<Partial<Album>> {
    return this.albumsRepository.create(albumDto);
  }

  async update(id: string, albumDto: AlbumDto): Promise<Partial<Album>> {
    return this.albumsRepository.update(id, albumDto);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.findAll();
  }

  async findMany(ids: string[]): Promise<Album[]> {
    return this.albumsRepository.findMany(ids);
  }

  async findOneById(id: string): Promise<Partial<Album>> {
    return this.albumsRepository.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.tracksService.resetAlbumIdField(id);
    return this.albumsRepository.delete(id);
  }

  async resetArtistIdField(artistId: string) {
    return this.albumsRepository.resetArtistIdField(artistId);
  }
}
