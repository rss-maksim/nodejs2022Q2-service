import { Favorites } from '../models';

class FavoritesStore {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavorites() {
    return this.favorites;
  }

  setFavorites(favorites: Favorites) {
    this.favorites = favorites;
  }
}

export default new FavoritesStore();
