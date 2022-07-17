import { Artist } from '../models';

class ArtistsStore {
  private artists: Artist[] = [];

  getArtists() {
    return this.artists;
  }

  setArtists(artists: Artist[]) {
    this.artists = artists;
  }
}

export default new ArtistsStore();
