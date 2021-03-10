import { showToast } from '../helpers';
import { userFactory } from './UserFactory';
import service from './Service';

export class NotificationsDecorator {
    constructor(service) {
        this.service = service;
    }

    async getUsers() {
        let users;

        try {
            const usersData = await this.service.getUsers();
            users =  usersData.map(user => userFactory.create(user));
            showToast('success', 'Users loaded');
        } catch (err) {
            showToast('error', `Failed loading users. ${err}`);
        }

        return users;
    };

    async getEvents() {
        let events;

        try {
            events = await this.service.getEvents();
            showToast('success', 'Events loaded');
        } catch (err) {
            showToast('error', `Failed loading events. ${err}`);
        }

        return events;
    };

    async deleteEvent(eventId) {
        try {
            await this.service.deleteEvent(eventId);
            showToast('success', 'Event deleted');
        } catch (err) {
            showToast('error', `Failed to delete event. ${err}`);
        }
    };

    async createEvent(event) {
        let newEvent;

        try {
            newEvent = await this.service.createEvent(event);
            showToast('success', 'Event created');
        } catch (err) {
            showToast('error', `Failed creating event. ${err}`);
        }

        return newEvent;
    };
}

export default new NotificationsDecorator(service);
