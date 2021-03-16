import { ALERTS } from '../constants';
import { fillSelect } from '../helpers';
import service from '../modules/NotificationsDecorator';
import '../../scss/create-event.scss';

const createEventButton = document.querySelector('.button--create');
const cancelButton = document.querySelector('.button--cancel');
const hideAlertButton = document.querySelector('.alert__hide-button');
const alert = document.querySelector('.alert');

let events;
let allUsers;

const renderUsers = (users) => {
  if (users) {
    const membersSelect = document.getElementById('selectParticipants');
    fillSelect(users, membersSelect);
    membersSelect.options[0].selected = true;
  }
};

const onLoad = async () => {
  if (!allUsers) {
    allUsers = await service.getUsers();
    await renderUsers(allUsers);
  }

  if (!events) {
    events = await service.getEvents();
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

const redirectToCalendar = () => {
  window.location.href = './calendar.html';
};

// eslint-disable-next-line import/prefer-default-export
export const addEvent = async (e) => {
  e.preventDefault();
  hideAlert();

  const nameInput = document.getElementById('inputName');
  const participantsSelect = document.getElementById('selectParticipants');
  const daySelect = document.getElementById('selectDay');
  const timeSelect = document.getElementById('selectTime');

  if (nameInput.value) {
    const name = nameInput.value;
    const participants = [...participantsSelect.options]
      .filter((option) => option.selected)
      .map((option) => option.value);
    const day = daySelect.value;
    const time = timeSelect.value;
    // prettier-ignore
    const existingEvent = events && events.find(userEvent => userEvent.day === day && userEvent.time === time);

    if (!existingEvent) {
      createEventButton.disabled = true;
      cancelButton.classList.add('disabled');
      const event = await service.createEvent({
        name,
        participants,
        day,
        time,
      });

      if (event) {
        setTimeout(redirectToCalendar, 2000);
      } else {
        createEventButton.disabled = false;
        cancelButton.classList.remove('disabled');
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
