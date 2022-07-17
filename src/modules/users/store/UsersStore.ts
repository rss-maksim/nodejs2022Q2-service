import { User } from '../models';

class UsersStore {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  setUsers(tracks: User[]) {
    this.users = tracks;
  }
}

export default new UsersStore();
