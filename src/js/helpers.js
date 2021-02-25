import {
    EVENTS_STORAGE_KEY,
    USER_STORAGE_KEY,
    USERS
} from './constants';

export const getEventsData = () => {
    return JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY));
};

export const setEventsData = (events) => {
    if (events.length) {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } else {
        localStorage.removeItem(EVENTS_STORAGE_KEY);
    }
};

export const getUserData = () => {
    return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
};

export const setUserData = (username) => {
    const currentUser = USERS.find((user) => user.name === username);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
};

export const deleteUserData = () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
};