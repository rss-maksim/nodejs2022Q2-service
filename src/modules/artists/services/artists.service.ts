import { Injectable } from '@nestjs/common';

import { ArtistDto } from '../dto';
import { Artist } from '../models';
import { ArtistsRepository } from '../artists.repository';
import { TracksService } from '../../tracks/services';
import { AlbumsService } from '../../albums/services';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

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
    await this.tracksService.resetArtistIdField(id);
    await this.albumsService.resetArtistIdField(id);
    return this.artistsRepository.delete(id);
  }
}
