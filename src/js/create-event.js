import { ALERTS } from './constants';
import { getUsers, createEvent, getEvents } from './dataFacade';
import { fillSelect } from './helpers';
import '../scss/create-event.scss';

const createEventButton = document.querySelector('.button--create');
const hideAlertButton = document.querySelector('.alert__hide-button');
const alert = document.querySelector('.alert');

let events;
let allUsers;

const onLoad = async() => {
    if (!allUsers) {
        allUsers = await getUsers();
        await renderUsers(allUsers);
    }

    if (!events) {
        events = await getEvents();
    }
};

const renderUsers = (users) => {
    if (users) {
        const membersSelect = document.getElementById('selectParticipants');
        fillSelect(users, membersSelect);
        membersSelect.options[0].selected = true;
    }
};

const showAlert = (text) => {
    const alertTextContainer = document.querySelector('.alert__text');
    alert.classList.remove('d-none');
    alertTextContainer.innerText = text;
};

const hideAlert = () => {
    alert.classList.add('d-none');
};

const addEvent = async(e) => {
    e.preventDefault();
    hideAlert();

    const nameInput = document.getElementById('inputName');
    const participantsSelect = document.getElementById('selectParticipants');
    const daySelect = document.getElementById('selectDay');
    const timeSelect = document.getElementById('selectTime');

    if (nameInput.value) {
        const name = nameInput.value;
        const participants = [...participantsSelect.options].filter(option => option.selected).map(option => option.value);
        const day = daySelect.value;
        const time = timeSelect.value;
        const existingEvent = events && events.find((userEvent) => userEvent.day === day && userEvent.time === time);

        if (!existingEvent) {
            const event = await createEvent({
                name,
                participants,
                day,
                time
            });
            if (event) {
                setTimeout(() => location.href = './calendar.html', 2000);
            }
        } else {
            showAlert(ALERTS.time);
        }
    } else {
        showAlert(ALERTS.name);
    }
};

document.addEventListener('DOMContentLoaded', onLoad);
createEventButton.addEventListener('click', addEvent);
hideAlertButton.addEventListener('click', hideAlert);
