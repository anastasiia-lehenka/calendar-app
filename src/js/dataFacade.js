import { getUsersData, getEventsData, deleteEventData, createEventData } from './serviceApi';
import { showToast } from './helpers';
import { Admin } from './Admin';
import { User } from './User';

export const getUsers = async() => {
    let users;

    try {
        const usersData = await getUsersData();
        users =  usersData.map(user => {
            if (user.admin) {
                return new Admin(user.name);
            } else {
                return new User(user.name);
            }
        });
        showToast('success', 'Users loaded');
    } catch (err) {
        showToast('error', `Failed loading users. ${err}`);
    }

    return users;
};

export const getEvents = async() => {
    let events;

    try {
        events = await getEventsData();
        showToast('success', 'Events loaded');
    } catch (err) {
        showToast('error', `Failed loading events. ${err}`);
    }

    return events;
};

export const deleteEvent = async(eventId) => {
    try {
        await deleteEventData(eventId);
        showToast('success', 'Event deleted');
    } catch (err) {
        showToast('error', `Failed to delete event. ${err}`);
    }
};

export const createEvent = async(event) => {
    let newEvent;

    try {
        newEvent = await createEventData(event);
        showToast('success', 'Event created');
    } catch (err) {
        showToast('error', `Failed creating event. ${err}`);
    }

    return newEvent;
};