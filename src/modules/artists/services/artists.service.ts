import { Injectable } from '@nestjs/common';

import { ArtistDto } from '../dto';
import { Artist } from '../models';
import { ArtistsRepository } from '../artists.repository';
import { Album } from '../../albums/models';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  async create(artistDto: ArtistDto): Promise<Partial<Artist>> {
    return this.artistsRepository.create(artistDto);
  }

  async update(id: string, artistDto: ArtistDto): Promise<Partial<Artist>> {
    return this.artistsRepository.update(id, artistDto);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.findAll();
  }

  async findMany(ids: string[]): Promise<Artist[]> {
    return this.artistsRepository.findMany(ids);
  }

  async findOneById(id: string): Promise<Partial<Artist>> {
    return this.artistsRepository.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    return this.artistsRepository.delete(id);
  }
}
