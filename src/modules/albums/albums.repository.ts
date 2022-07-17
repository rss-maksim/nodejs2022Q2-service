import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './models';
import { AlbumDto } from './dto';
import AlbumsStore from './store/AlbumsStore';

@Injectable()
export class AlbumsRepository {
  static excludedFields: string[] = [];

  get albums(): Album[] {
    return AlbumsStore.getAlbums();
  }

  set albums(tracks: Album[]) {
    AlbumsStore.setAlbums(tracks);
  }

  async create(albumDto: AlbumDto): Promise<Partial<Album>> {
    const newAlbum = {
      ...albumDto,
      id: uuidv4(),
    };
    this.albums = [...this.albums, newAlbum];

    return omit(newAlbum, AlbumsRepository.excludedFields);
  }

  async update(id: string, albumDto: AlbumDto) {
    const album = await this.findOne(id);

    const updatedAlbum = { ...album, ...albumDto };
    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return omit(updatedAlbum, AlbumsRepository.excludedFields);
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findMany(ids: string[]): Promise<Album[]> {
    return this.albums.filter((album) => ids.includes(album.id));
  }

  async findOneById(id: string): Promise<Partial<Album>> {
    const album = await this.findOne(id);
    return omit(album, AlbumsRepository.excludedFields);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    this.albums = this.albums.filter((user) => user.id !== id);
  }

  async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }
}
