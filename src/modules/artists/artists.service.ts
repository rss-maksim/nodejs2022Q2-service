import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ArtistDto } from './dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { Artist } from './entities';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.create(artistDto);
    await this.artistsRepository.save(artist);
    return artist;
  }

  async update(id: string, artistDto: ArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Not found');
    }

    return await this.artistsRepository.save({
      ...artist,
      ...artistDto,
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findMany(ids: string[]): Promise<Artist[]> {
    return this.artistsRepository.find({
      where: ids.map((id: string) => ({ id })),
    });
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found');
    }

    // await this.tracksService.resetArtistIdField(id);
    // await this.albumsService.resetArtistIdField(id)
  }
}
