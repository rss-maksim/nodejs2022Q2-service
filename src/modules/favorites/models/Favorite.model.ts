import { Artist } from '../../artists/models';
import { Album } from '../../albums/models';
import { Track } from '../../tracks/models';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
