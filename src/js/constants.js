import { User } from './User';
import { Admin } from './Admin';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const TIMESLOTS = ['10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'];
export const USERS = [
    new Admin('Maria'),
    new User('Kate'),
    new Admin('Alex'),
    new User('Bob'),
];
export const EVENTS_STORAGE_KEY = 'events';
export const USER_STORAGE_KEY = 'user';