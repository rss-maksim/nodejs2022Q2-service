import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';

import { Artist } from './models';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [];
  static excludedFields: string[] = [];

  async create(artistDto: ArtistDto): Promise<Partial<Artist>> {
    const newArtist = {
      ...artistDto,
      id: uuidv4(),
    };
    this.artists.push(newArtist);

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
