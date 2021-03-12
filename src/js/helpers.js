import * as bootstrap from 'bootstrap';

export const fillSelect = (usersList, selectElement) => {
  usersList.forEach((user) => {
    const option = document.createElement('option');
    option.innerText = user.name;
    option.setAttribute('value', user.name);
    selectElement.appendChild(option);
  });
};

export const showToast = (type, text) => {
  const toastContainer = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  // prettier-ignore
  toast.innerHTML = `<div class="toast-header">
      <i class="bi me-2 ${type === 'success' ? 'bi-check-circle-fill text-success' : type === 'error' ? 'bi-x-circle-fill text-danger' : ''}"></i>
        <strong class="me-auto">${type.toUpperCase()}</strong>
     </div>
     <div class="toast-body">${text}</div> `;
  toastContainer.appendChild(toast);

  const toastEl = new bootstrap.Toast(toast, {
    animation: true,
    autohide: true,
    delay: 2000,
  });

  toastEl.show();
};
