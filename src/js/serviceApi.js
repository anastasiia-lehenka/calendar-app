import {
    EVENTS_API_URL,
    USERS_API_URL,
} from './constants';

export const sendHttpRequest = async (method, url, data) => {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        const message = `${response.status}`;
        throw new Error(message);
    }

    return response;
};

export const getEventsData = async () => {
    const response = await sendHttpRequest('GET', EVENTS_API_URL);
    const events = await response.json();
    return events && events.map((event) => Object.assign({ id: event.id }, JSON.parse(event.data)));
};

export const createEventData = async (eventData) => {
    const response = await sendHttpRequest('POST', EVENTS_API_URL, { data: JSON.stringify(eventData) });
    const event = await response.json();
    return Object.assign({ id: event.id }, JSON.parse(event.data));
};

export const deleteEventData = async (id) => {
    await sendHttpRequest('DELETE', `${EVENTS_API_URL}/${id}`);
};

export const getUsersData = async () => {
    const response = await sendHttpRequest('GET', USERS_API_URL);
    const users = await response.json();
    return users && users.map((user) => Object.assign({ id: user.id }, JSON.parse(user.data)));
};

export const createUserData = async (userData) => {
    const response = await sendHttpRequest('POST', USERS_API_URL, { data: JSON.stringify(userData) });
    const user = await response.json();
    return Object.assign({ id: user.id }, JSON.parse(user.data));
};