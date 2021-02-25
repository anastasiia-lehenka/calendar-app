import { v4 } from 'uuid';
import { getEventsData, setEventsData } from './helpers';
import '../scss/create-event.scss';

const createEventButton = document.querySelector('.button--create');
const hideNameAlertButton = document.querySelector('.alert--name .alert__hide-button');
const hideTimeAlertButton = document.querySelector('.alert--time .alert__hide-button');
const timeAlert = document.querySelector('.alert--time');
const nameAlert = document.querySelector('.alert--name');

let timer;

const showAlert = (alert) => {
    clearTimeout(timer);
    alert.classList.remove('d-none');
    timer = setTimeout(() => alert.classList.add('d-none'), 4000);
};

const hideAlert = (alert) => {
    clearTimeout(timer);
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
            showAlert(timeAlert);
        }
    } else {
        e.preventDefault();
        showAlert(nameAlert);
    }
};

createEventButton.addEventListener('click', addEvent);
hideTimeAlertButton.addEventListener('click', () => hideAlert(timeAlert));
hideNameAlertButton.addEventListener('click', () => hideAlert(nameAlert));