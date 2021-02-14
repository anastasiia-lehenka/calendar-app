import { DAYS, TIMESLOTS } from './constants';
import '../scss/calendar.scss';

//Selectors
const table = document.querySelector('.calendar-table');
const deleteModalConfirmButton = document.querySelector('.delete-modal__confirm-button');
const membersSelect = document.querySelector('.members-select');

const getStorageData = () => {
    return JSON.parse(localStorage.getItem('userEvents'));
};

const showAllEvents = () => {
    const userEvents = getStorageData();
    showEvents(userEvents);
};

const clearTable = () => {
    const tableCells = table.getElementsByTagName('td');

    Array.from(tableCells).map((cell) => {
        if (cell.children.length) {
            while (cell.lastChild) {
                cell.removeChild(cell.firstChild);
            }
            cell.classList.remove('calendar-table__cell--event');
        }
    })
};

const showEvents = (userEvents) => {
    clearTable();

    if (userEvents) {
        userEvents.map((userEvent) => {
            const tableCell = table.rows[TIMESLOTS.indexOf(userEvent.time) + 1]
                .cells[DAYS.indexOf(userEvent.day) + 1];

            while (tableCell.lastChild) {
                tableCell.removeChild(tableCell.firstChild);
            }

            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event');

            const eventName = document.createElement('span');
            eventName.classList.add('event__name');
            eventName.innerText = userEvent.name;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('event__delete-button');
            deleteButton.classList.add('btn-close');
            deleteButton.classList.add('btn-sm');
            deleteButton.setAttribute('data-bs-toggle', 'modal');
            deleteButton.setAttribute('data-bs-target', '#deleteModal');

            eventContainer.appendChild(eventName);
            eventContainer.appendChild(deleteButton);

            tableCell.classList.add('calendar-table__cell--event');
            tableCell.setAttribute('data-id', userEvent.id);
            tableCell.appendChild(eventContainer);
        });
    }
};

const configureDeleteModal = (e) => {
    if (e.target.classList.contains('event__delete-button')) {
        const deleteModalText = document.querySelector('.delete-modal__text');

        const eventCell = e.target.parentElement;
        const eventName = eventCell.children[0].innerText;

        deleteModalText.innerText = `Are you sure you want to delete "${eventName}" event?`;

        deleteModalConfirmButton.addEventListener('click', removeEvent.bind(this, eventCell));
    }
};

const removeEvent = (event) => {
    const events = getStorageData();
    const eventId = event.dataset.id;
    const neededEvent = events.find(item => item.id === eventId);

    events.splice(events.indexOf(neededEvent), 1);

    if (events.length) {
        localStorage.setItem('userEvents', JSON.stringify(events));
    } else {
        localStorage.removeItem('userEvents');
    }

    showEvents(events);
};

const filterEvents = (e) => {
    const events = getStorageData();

    if (e.target.value === 'All members') {
        showEvents(events);
    } else {
        const filteredEvents = events.filter((event) => event.participants.includes(e.target.value));
        showEvents(filteredEvents);
    }
};

//Add event listeners
document.addEventListener('DOMContentLoaded', showAllEvents);
table.addEventListener('click', configureDeleteModal);
membersSelect.addEventListener('change', filterEvents);
