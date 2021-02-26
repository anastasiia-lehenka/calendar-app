import { User } from './User';

export class Admin extends User {
    constructor (name) {
        super(name);
        this.canModifyEvents = true;
    }
}