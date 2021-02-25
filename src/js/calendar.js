import * as bootstrap from 'bootstrap';
import { DAYS, TIMESLOTS } from './constants';
import {
    getEventsData,
    setEventsData,
    getUserData,
    setUserData,
    deleteUserData,
} from './helpers';
import '../scss/calendar.scss';

const table = document.querySelector('.calendar-table');
const membersSelect = document.querySelector('.members-select');
const authModal = new bootstrap.Modal(document.querySelector('.auth-modal'), {
    backdrop: 'static',
    keyboard: false,
});
const authModalConfirmButton = document.querySelector('.auth-modal__confirm-button');
const logoutBtn = document.querySelector('.logout-btn');


const renderAuthData = () => {
    const currentUser = getUserData();
    const authText = document.querySelector('.auth-info__text');
    const newEventBtn = document.querySelector('.new-event-button');

    if (currentUser) {
        authText.innerHTML = `You are logged in as <strong>${currentUser.name}</strong>`;
        logoutBtn.classList.remove('d-none');

        if (!currentUser.canModifyEvents) {
            newEventBtn.classList.add('d-none');
        } else {
            newEventBtn.classList.remove('d-none');
        }
    } else {
        authText.innerHTML = '';
        logoutBtn.classList.add('d-none');
    }
};

const onLoad = () => {
    const currentUser = getUserData();

    renderAuthData();
    renderEvents();

    if (!currentUser) {
        authModal.show();
    }
};

const onAuthConfirm = () => {
    const usersSelect = document.querySelector('.auth-modal-select');
    const currentUsername = usersSelect.value;

    authModal.hide();
    setUserData(currentUsername);
    onLoad();
};

const logOut = () => {
    deleteUserData();
    onLoad();
};

const clearTable = () => {
    const tableCells = table.getElementsByTagName('td');

    Array.from(tableCells).map((cell) => {
        clearTableCell(cell);
    })
};

const clearTableCell = (cell) => {
    if (cell.children.length) {
        while (cell.lastChild) {
            cell.removeChild(cell.firstChild);
        }
        cell.classList.remove('calendar-table__cell--event');
    }
};

const renderEvents = (userEvents) => {
    clearTable();

    const currentUser = getUserData();
    if (!currentUser) return;

    if (!userEvents) {
        userEvents = getEventsData();
    }

    if (userEvents) {
        userEvents.map((userEvent) => {
            const eventCell =
                table.rows[TIMESLOTS.indexOf(userEvent.time) + 1].cells[DAYS.indexOf(userEvent.day) + 1];
            clearTableCell(eventCell);

            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event');

            const eventName = document.createElement('span');
            eventName.classList.add('event__name');
            eventName.innerText = userEvent.name;
            eventContainer.appendChild(eventName);

            if (currentUser.canModifyEvents) {
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('event__delete-button');
                deleteButton.classList.add('btn-close');
                deleteButton.classList.add('btn-sm');
                deleteButton.setAttribute('data-bs-toggle', 'modal');
                deleteButton.setAttribute('data-bs-target', '#deleteModal');
                eventContainer.appendChild(deleteButton);
            }

            eventCell.classList.add('calendar-table__cell--event');
            eventCell.setAttribute('data-id', userEvent.id);
            eventCell.appendChild(eventContainer);
        });
    }
};

const configureDeleteModal = (e) => {
    if (e.target.classList.contains('event__delete-button')) {
        const deleteModalText = document.querySelector('.delete-modal__text');
        const deleteModalConfirmButton = document.querySelector('.delete-modal__confirm-button');
        const eventCell = e.target.parentElement;
        const eventName = eventCell.children[0].innerText;

        deleteModalText.innerText = `Are you sure you want to delete "${eventName}" event?`;
        deleteModalConfirmButton.addEventListener('click', deleteEvent.bind(this, eventCell.dataset.id));
    }
};

const deleteEvent = (eventId) => {
    const events = getEventsData();
    const deletedEvent = events.find(item => item.id === eventId);

    events.splice(events.indexOf(deletedEvent), 1);
    setEventsData(events);
    renderEvents();
};

const filterEvents = (e) => {
    let events = getEventsData();

    if (e.target.value !== 'All members') {
        events = events.filter((event) => event.participants.includes(e.target.value));
    }
    renderEvents(events);
};

document.addEventListener('DOMContentLoaded', onLoad);
table.addEventListener('click', configureDeleteModal);
membersSelect.addEventListener('change', filterEvents);
authModalConfirmButton.addEventListener('click', onAuthConfirm);
logoutBtn.addEventListener('click', logOut);