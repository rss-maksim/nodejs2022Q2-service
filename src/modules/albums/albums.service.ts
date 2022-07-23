import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AlbumDto } from './dto';
import { Album } from './entities';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    private readonly tracksService: TracksService,
  ) {}

  async create(albumDto: AlbumDto): Promise<Album> {
    const album = await this.albumsRepository.create(albumDto);
    await this.albumsRepository.save(album);
    return album;
  }

  async update(id: string, albumDto: AlbumDto): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Not found');
    }

    return await this.albumsRepository.save({
      ...album,
      ...albumDto,
    });
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findMany(ids: string[]): Promise<Album[]> {
    return this.albumsRepository.find({
      where: ids.map((id: string) => ({ id })),
    });
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const result = await this.albumsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found');
    }
    await this.tracksService.resetAlbumIdField(id);
  }

  async resetArtistIdField(artistId: string) {
    // return this.albumsRepository.resetArtistIdField(artistId);
  }
}
