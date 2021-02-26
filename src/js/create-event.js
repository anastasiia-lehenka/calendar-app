import { v4 } from 'uuid';
import { getEventsData, setEventsData } from './helpers';
import { ALERTS } from './constants';
import '../scss/create-event.scss';

const createEventButton = document.querySelector('.button--create');
const hideAlertButton = document.querySelector('.alert__hide-button');
const alert = document.querySelector('.alert');

const showAlert = (text) => {
    const alertTextContainer = document.querySelector('.alert__text');
    alert.classList.remove('d-none');
    alertTextContainer.innerText = text;
};

const hideAlert = () => {
    alert.classList.add('d-none');
};

const addEvent = (e) => {
    const userEvents = getEventsData() || [];
    const nameInput = document.getElementById('inputName');
    const participantsSelect = document.getElementById('selectParticipants');
    const daySelect = document.getElementById('selectDay');
    const timeSelect = document.getElementById('selectTime');

    if (nameInput.value) {
        const id = v4();
        const name = nameInput.value;
        const participants = [...participantsSelect.options].filter(option => option.selected).map(option => option.value);
        const day = daySelect.value;
        const time = timeSelect.value;
        const existingEvent = userEvents.find((userEvent) => userEvent.day === day && userEvent.time === time);

        if (!existingEvent) {
            userEvents.push({
                id,
                name,
                participants,
                day,
                time,
            });
            setEventsData(userEvents);
        } else {
            e.preventDefault();
            showAlert(ALERTS.time);
        }
    } else {
        e.preventDefault();
        showAlert(ALERTS.name);
    }
};

createEventButton.addEventListener('click', addEvent);
hideAlertButton.addEventListener('click', hideAlert);
