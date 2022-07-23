import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Artist } from '../../artists/entities';
import { Album } from '../../albums/entities';
import { Track } from '../../tracks/entities';

export enum FavoriteType {
  Track = 'track',
  Artist = 'artist',
  Album = 'album',
}

@Entity({ name: 'favorite' })
export class Favorite {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({
    type: 'enum',
    enum: FavoriteType,
    default: FavoriteType.Track,
  })
  type: FavoriteType;
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
