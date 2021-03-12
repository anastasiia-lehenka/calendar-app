import { SERVER_URL } from '../constants';

class Service {
  constructor() {
    if (!Service.instance) {
      this.url = SERVER_URL;
      this.eventsEntity = 'events';
      this.usersEntity = 'users';
      Service.instance = this;
    }

    return Service.instance;
  }

  async sendHttpRequest(method, entity, data) {
    const response = await fetch(`${this.url}/${entity}`, {
      method,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const message = `${response.status}`;
      throw new Error(message);
    }

    return response;
  }

  async getEvents() {
    const response = await this.sendHttpRequest('GET', this.eventsEntity);
    const events = await response.json();
    return events && events.map((event) => Object.assign(JSON.parse(event.data), { id: event.id }));
  }

  async createEvent(eventData) {
    const response = await this.sendHttpRequest('POST', this.eventsEntity, {
      data: JSON.stringify(eventData),
    });
    const event = await response.json();
    return Object.assign(JSON.parse(event.data), { id: event.id });
  }

  async deleteEvent(id) {
    await this.sendHttpRequest('DELETE', `${this.eventsEntity}/${id}`);
  }

  async getUsers() {
    const response = await this.sendHttpRequest('GET', this.usersEntity);
    const users = await response.json();
    return users && users.map((user) => Object.assign(JSON.parse(user.data), { id: user.id }));
  }

  async createUser(userData) {
    const response = await this.sendHttpRequest('POST', this.usersEntity, {
      data: JSON.stringify(userData),
    });
    const user = await response.json();
    return Object.assign(JSON.parse(user.data), { id: user.id });
  }
}

const service = new Service();
Object.freeze(service);
export default service;
