import * as bootstrap from 'bootstrap';
import { DAYS, TIMESLOTS } from './constants';
import { getUserData, setUserData, deleteUserData } from './sessionStorageApi';
import { fillSelect } from './helpers';
import service from './NotificationsDecorator';
import '../scss/calendar.scss';

const table = document.querySelector('.calendar-table');
const membersSelect = document.querySelector('.members-select');
const authModal = new bootstrap.Modal(document.querySelector('.auth-modal'), {
    backdrop: 'static',
    keyboard: false,
});
const authModalConfirmBtn = document.querySelector('.auth-modal__confirm-button');
const logoutBtn = document.querySelector('.logout-btn');
const authSelect = document.querySelector('.auth-modal-select');

let events;
let activeUser;
let allUsers;

const onLoad = async() => {
    if (!allUsers) {
        allUsers = await service.getUsers();
        await renderUsers(allUsers);
    }

    if (!activeUser) {
        activeUser = getUserData();
    }

    if (!activeUser) {
        authModal.show();
    } else {
        await renderPageContent(activeUser);
    }

};

const renderPageContent = async(currentUser) => {
    if (!events) {
        events = await service.getEvents();
    }

    renderEvents(events);
    renderAuthData(currentUser);
};

const renderEvents = (userEvents) => {
    clearTable(table);

    if (userEvents) {
        userEvents.map((userEvent) => {
            const eventCell = table.rows[TIMESLOTS.indexOf(userEvent.time) + 1].cells[DAYS.indexOf(userEvent.day) + 1];

            eventCell.innerHTML =
                `<div class="event" data-id="${userEvent.id}">
                    <span class="event__name">${userEvent.name}</span>
                    ${ activeUser.canModifyEvents ?
                    '<button class="event__delete-button btn-close btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal"></button>' :
                    ''}
                </div>`;

            eventCell.classList.add('calendar-table__cell--event');
        });
    }
};

const renderAuthData = (currentUser) => {
    const authText = document.querySelector('.auth-info__text');
    const newEventBtn = document.querySelector('.new-event-button');

    if (activeUser) {
        authText.innerHTML = `You are logged in as <strong>${currentUser.name}</strong>`;
        logoutBtn.classList.remove('d-none');

        if (!activeUser.canModifyEvents) {
            newEventBtn.classList.add('d-none');
        } else {
            newEventBtn.classList.remove('d-none');
        }
    } else {
        authText.innerHTML = '';
        logoutBtn.classList.add('d-none');
        newEventBtn.classList.add('d-none');
    }
};

const renderUsers = (users) => {
    if (users) {
        fillSelect(users, authSelect);
        fillSelect(users, membersSelect);
    }
};

const onAuthConfirm = async() => {
    const selectedUsername = authSelect.value;

    if (selectedUsername) {
        authModal.hide();
        activeUser = allUsers.find((user) => user.name === selectedUsername);
        setUserData(activeUser);
        await renderPageContent(activeUser);
    }
};

const clearPageContent = () => {
    renderEvents();
    renderAuthData();
    membersSelect.value = 'All members';
};

const logOut = async() => {
    activeUser = null;
    deleteUserData();
    clearPageContent();
    await onLoad();
};

const clearTable = (table) => {
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

const configureDeleteModal = (e) => {
    if (e.target.classList.contains('event__delete-button')) {
        const deleteModalText = document.querySelector('.delete-modal__text');
        const deleteModalConfirmBtn = document.querySelector('.delete-modal__confirm-button');
        const eventElement = e.target.parentElement;
        const eventName = eventElement.children[0].innerText;

        deleteModalText.innerText = `Are you sure you want to delete "${eventName}" event?`;
        deleteModalConfirmBtn.addEventListener('click', removeEvent.bind(this, eventElement));
    }
};

const removeEvent = async(eventElement) => {
    const eventId = eventElement.dataset.id;
    await service.deleteEvent(eventId);

    const eventCell = eventElement.parentElement;
    clearTableCell(eventCell);

    events = events.filter((event) => event.id !== eventId);
};

const filterEvents = () => {
    const participant = membersSelect.value;
    const filteredEvents = (participant !== 'All members') ?
        events.filter((event) => event.participants.includes(participant)) :
        events;

    renderEvents(filteredEvents);
};

document.addEventListener('DOMContentLoaded', onLoad);
table.addEventListener('click', configureDeleteModal);
membersSelect.addEventListener('change', filterEvents);
authModalConfirmBtn.addEventListener('click', onAuthConfirm);
logoutBtn.addEventListener('click', logOut);