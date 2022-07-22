import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './models';
import { ArtistDto } from './dto';
import ArtistsStore from './store/ArtistsStore';

@Injectable()
export class ArtistsRepository {
  static excludedFields: string[] = [];

  get artists(): Artist[] {
    return ArtistsStore.getArtists();
  }

  set artists(tracks: Artist[]) {
    ArtistsStore.setArtists(tracks);
  }

  async create(artistDto: ArtistDto): Promise<Partial<Artist>> {
    const newArtist = {
      ...artistDto,
      id: uuidv4(),
    };

    this.artists = [...this.artists, newArtist];

    return omit(newArtist, ArtistsRepository.excludedFields);
  }

  async update(id: string, artistDto: ArtistDto) {
    const artist = await this.findOne(id);

    const updatedArtist = { ...artist, ...artistDto };
    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );
    return omit(updatedArtist, ArtistsRepository.excludedFields);
  }

  async findAll() {
    return this.artists;
  }

  async findMany(ids: string[]): Promise<Artist[]> {
    return this.artists.filter((artist) => ids.includes(artist.id));
  }

  async findOneById(id: string): Promise<Partial<Artist>> {
    const artist = await this.findOne(id);
    return omit(artist, ArtistsRepository.excludedFields);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    this.artists = this.artists.filter((user) => user.id !== id);
  }

  async findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }
}
