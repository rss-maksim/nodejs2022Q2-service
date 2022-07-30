import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TrackDto } from './dto';
import { Track } from './entities';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(trackDto: TrackDto): Promise<Track> {
    const track = await this.tracksRepository.create(trackDto);
    await this.tracksRepository.save(track);
    return track;
  }

  async update(id: string, trackDto: TrackDto): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Not found');
    }

    return await this.tracksRepository.save({
      ...track,
      ...trackDto,
    });
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findMany(ids: string[]): Promise<Track[]> {
    if (!ids?.length) {
      return [];
    }
    const query = ids.map((id: string) => ({ id }));
    return this.tracksRepository.find({
      where: query,
    });
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Not found');
    }
    return track;
  }

  async delete(id: string): Promise<void> {
    const result = await this.tracksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found');
    }
  }

  async resetAlbumIdField(albumId: string) {
    const track = await this.tracksRepository.findOneBy({ albumId });
    if (!track) {
      return;
    }
    return await this.tracksRepository.save({
      ...track,
      albumId: null,
    });
  }

  async resetArtistIdField(artistId: string) {
    const track = await this.tracksRepository.findOneBy({ artistId });
    if (!track) {
      return;
    }
    return await this.tracksRepository.save({
      ...track,
      artistId: null,
    });
  }

  async findOneById(id: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id });
  }
}
