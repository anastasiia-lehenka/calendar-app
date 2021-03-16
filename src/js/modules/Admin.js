import User from './User';

export default class Admin extends User {
  constructor(name) {
    super(name);
    this.canModifyEvents = true;
  }
}
