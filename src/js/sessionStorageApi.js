import { USER_STORAGE_KEY } from './constants';

export const getUserData = () => JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
export const setUserData = (user) => sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
export const deleteUserData = () => sessionStorage.removeItem(USER_STORAGE_KEY);
