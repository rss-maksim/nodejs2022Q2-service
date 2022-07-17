import { Injectable } from '@nestjs/common';

import { TrackDto } from '../dto';
import { Track } from '../models';
import { TracksRepository } from '../tracks.repository';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

  async create(trackDto: TrackDto): Promise<Partial<Track>> {
    return this.tracksRepository.create(trackDto);
  }

  async update(id: string, trackDto: TrackDto): Promise<Partial<Track>> {
    return this.tracksRepository.update(id, trackDto);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.findAll();
  }

  async findOneById(id: string): Promise<Partial<Track>> {
    return this.tracksRepository.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    return this.tracksRepository.delete(id);
  }
}
