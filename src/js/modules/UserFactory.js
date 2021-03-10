import { Admin } from './Admin';
import { User } from './User';

class UserFactory {
    create(user) {
        if (user.admin) {
            return new Admin(user.name);
        } else {
            return new User(user.name);
        }
    }
}

export const userFactory = new UserFactory();