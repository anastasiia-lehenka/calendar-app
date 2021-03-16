import Admin from './Admin';
import User from './User';

class UserFactory {
  create(user) {
    if (user.admin) {
      return new Admin(user.name);
    }
    return new User(user.name);
  }
}

export default new UserFactory();
