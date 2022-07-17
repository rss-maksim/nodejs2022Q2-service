import { Track } from '../models';

class TracksStore {
  private tracks: Track[] = [];

  getTracks() {
    return this.tracks;
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }
}

export default new TracksStore();
