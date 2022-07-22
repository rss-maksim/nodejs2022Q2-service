import { Album } from '../models';

class AlbumsStore {
  private albums: Album[] = [];

  getAlbums() {
    return this.albums;
  }

  setAlbums(tracks: Album[]) {
    this.albums = tracks;
  }
}

export default new AlbumsStore();
