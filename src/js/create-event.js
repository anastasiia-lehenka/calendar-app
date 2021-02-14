import { v4 } from 'uuid';
import { getStorageData } from './helpers';
import '../scss/create-event.scss';

// Selectors
const createEventButton = document.querySelector('.button--create');
const nameInput = document.getElementById('inputName');
const participantsSelect = document.getElementById('selectParticipants');
const daySelect = document.getElementById('selectDay');
const timeSelect = document.getElementById('selectTime');
const nameAlert = document.querySelector('.alert--name');
const timeAlert = document.querySelector('.alert--time');
const hideNameAlertButton = document.querySelector('.alert--name .alert__hide-button');
const hideTimeAlertButton = document.querySelector('.alert--time .alert__hide-button');

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
    const userEvents = getStorageData() || [];

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
            localStorage.setItem('userEvents', JSON.stringify(userEvents));
        } else {
            e.preventDefault();
            showAlert(timeAlert);
        }
    } else {
        e.preventDefault();
        showAlert(nameAlert);
    }
};

//Add EventListeners
createEventButton.addEventListener('click', addEvent);
hideTimeAlertButton.addEventListener('click', () => hideAlert(timeAlert));
hideNameAlertButton.addEventListener('click', () => hideAlert(nameAlert));