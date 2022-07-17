import { Injectable } from '@nestjs/common';

import { AlbumDto } from '../dto';
import { Album } from '../models';
import { AlbumsRepository } from '../albums.repository';
import { Track } from '../../tracks/models';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

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
    return this.albumsRepository.delete(id);
  }
}
