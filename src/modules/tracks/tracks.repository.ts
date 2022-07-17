import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './models';
import { TrackDto } from './dto';
import tracksStore from './store/TracksStore';

@Injectable()
export class TracksRepository {
  static excludedFields: string[] = [];

  get tracks(): Track[] {
    return tracksStore.getTracks();
  }

  set tracks(tracks: Track[]) {
    tracksStore.setTracks(tracks);
  }

  async create(trackDto: TrackDto): Promise<Partial<Track>> {
    const newTrack = {
      ...trackDto,
      id: uuidv4(),
    };
    this.tracks = [...this.tracks, newTrack];

    return omit(newTrack, TracksRepository.excludedFields);
  }

  async update(id: string, trackDto: TrackDto) {
    const track = await this.findOne(id);

    const updatedTrack = { ...track, ...trackDto };
    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return omit(updatedTrack, TracksRepository.excludedFields);
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findMany(ids: string[]): Promise<Track[]> {
    return this.tracks.filter((track) => ids.includes(track.id));
  }

  async findOneById(id: string): Promise<Partial<Track>> {
    const track = await this.findOne(id);
    return omit(track, TracksRepository.excludedFields);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    this.tracks = this.tracks.filter((user) => user.id !== id);
  }

  async findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }
}
