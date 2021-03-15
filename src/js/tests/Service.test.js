import service from '../modules/Service';
import { SERVER_URL } from '../constants';

let response;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(response),
    ok: true,
  }),
);

describe('Get events:', () => {
  let events;

  beforeEach(() => {
    fetch.mockClear();

    response = [
      {
        id: '6cb578d6-8562-4d62-b672-5ef1f93ebc52',
        data: '{"name":"sync up","participants":["Maria"],"day":"Mon","time":"16.00"}',
      },
      {
        id: 'a7b31457-3ca8-41c4-b6ce-d18136bcd7e5',
        data: '{"name":"meeting","participants":["Alex"],"day":"Mon","time":"14.00"}',
      },
    ];

    events = [
      {
        id: '6cb578d6-8562-4d62-b672-5ef1f93ebc52',
        name: 'sync up',
        participants: ['Maria'],
        day: 'Mon',
        time: '16.00',
      },
      {
        id: 'a7b31457-3ca8-41c4-b6ce-d18136bcd7e5',
        name: 'meeting',
        participants: ['Alex'],
        day: 'Mon',
        time: '14.00',
      },
    ];
  });

  test('should be defined', () => {
    expect(service.getEvents).toBeDefined();
  });

  test('should be called once', async () => {
    await service.getEvents();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should return correct data', async () => {
    const result = await service.getEvents();
    expect(result).toEqual(events);
  });

  test('should throw error if server response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    expect.assertions(1);

    try {
      await service.getEvents();
    } catch (error) {
      expect(error.message).toBe('404');
    }
  });

  test('should throw error if server error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('500')));

    expect.assertions(1);

    try {
      await service.getEvents();
    } catch (error) {
      expect(error.message).toBe('500');
    }
  });

  test('should call fetch with correct parameters', async () => {
    await service.getEvents();
    expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/events`, {
      method: 'GET',
      body: undefined,
      headers: { 'Content-Type': 'application/json' },
    });
  });
});

describe('Create event:', () => {
  let event;
  let createdEvent;

  beforeEach(() => {
    fetch.mockClear();

    response = {
      id: '6cb578d6-8562-4d62-b672-5ef1f93ebc52',
      data: '{"name":"sync up","participants":["Maria"],"day":"Mon","time":"16.00"}',
    };

    createdEvent = {
      id: '6cb578d6-8562-4d62-b672-5ef1f93ebc52',
      name: 'sync up',
      participants: ['Maria'],
      day: 'Mon',
      time: '16.00',
    };

    event = {
      name: 'sync up',
      participants: ['Maria'],
      day: 'Mon',
      time: '16.00',
    };
  });

  test('should be defined', () => {
    expect(service.createEvent).toBeDefined();
  });

  test('should return correct data', async () => {
    const result = await service.createEvent(event);
    expect(result).toEqual(createdEvent);
  });

  test('should be called once', async () => {
    await service.createEvent(event);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should throw error if server response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    expect.assertions(1);

    try {
      await service.createEvent(event);
    } catch (error) {
      expect(error.message).toBe('404');
    }
  });

  test('should throw error if server error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('500')));

    expect.assertions(1);

    try {
      await service.createEvent(event);
    } catch (error) {
      expect(error.message).toBe('500');
    }
  });

  test('should call fetch with correct parameters', async () => {
    await service.createEvent(event);
    expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/events`, {
      method: 'POST',
      body: JSON.stringify({ data: JSON.stringify(event) }),
      headers: { 'Content-Type': 'application/json' },
    });
  });
});

describe('Delete event:', () => {
  let eventId;

  beforeEach(() => {
    fetch.mockClear();
    eventId = '6cb578d6-8562-4d62-b672-5ef1f93ebc52';
  });

  test('should be defined', () => {
    expect(service.deleteEvent).toBeDefined();
  });

  test('should return correct data', async () => {
    const result = await service.deleteEvent(eventId);
    expect(result).toEqual(undefined);
  });

  test('should be called once', async () => {
    await service.deleteEvent();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should throw error if server response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    expect.assertions(1);

    try {
      await service.deleteEvent(eventId);
    } catch (error) {
      expect(error.message).toBe('404');
    }
  });

  test('should throw error if server error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('500')));

    expect.assertions(1);

    try {
      await service.deleteEvent(eventId);
    } catch (error) {
      expect(error.message).toBe('500');
    }
  });

  test('should call fetch with correct parameters', async () => {
    await service.deleteEvent(eventId);
    expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/events/${eventId}`, {
      method: 'DELETE',
      body: undefined,
      headers: { 'Content-Type': 'application/json' },
    });
  });
});

describe('Get users:', () => {
  let users;

  beforeEach(() => {
    fetch.mockClear();

    response = [
      {
        id: '2060e063-0dbe-4b6a-a565-c0ae22bd345e',
        data: '{"name":"Maria","admin":true}',
      },
      {
        id: 'fec160c6-71a0-49c3-811c-c9e49c8a4c79',
        data: '{"name":"Bob","admin":false}',
      },
    ];

    users = [
      {
        id: '2060e063-0dbe-4b6a-a565-c0ae22bd345e',
        name: 'Maria',
        admin: true,
      },
      {
        id: 'fec160c6-71a0-49c3-811c-c9e49c8a4c79',
        name: 'Bob',
        admin: false,
      },
    ];
  });

  test('should be defined', () => {
    expect(service.getUsers).toBeDefined();
  });

  test('should return correct data', async () => {
    const result = await service.getUsers();
    expect(result).toEqual(users);
  });

  test('should be called once', async () => {
    await service.getUsers();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should throw error if server response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    expect.assertions(1);

    try {
      await service.getUsers();
    } catch (error) {
      expect(error.message).toBe('404');
    }
  });

  test('should throw error if server error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('500')));

    expect.assertions(1);

    try {
      await service.getUsers();
    } catch (error) {
      expect(error.message).toBe('500');
    }
  });

  test('should call fetch with correct parameters', async () => {
    await service.getUsers();
    expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/users`, {
      method: 'GET',
      body: undefined,
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
