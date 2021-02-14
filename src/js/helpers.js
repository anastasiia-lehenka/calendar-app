import { STORAGE_KEY } from './constants';

export const getStorageData = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
};