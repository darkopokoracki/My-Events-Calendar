const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');
const eventForm = document.querySelector('.event-form');


function addInTable() {
    let tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${eventInput.value}</td>
        <td>${dateInput.value}</td>
        <td>${locationInput.value}</td>
    `
    tableBody.appendChild(tableRow);

    eventInput.value = '';
    dateInput.value = '';
    locationInput.value = '';
}

function createAlert(bool) {
    console.log(bool);

    const alert = document.createElement('div');
    alert.className = 'alert';

    const closeAlertBtn = document.createElement('span');
    closeAlertBtn.className = 'close-btn';
    closeAlertBtn.appendChild(document.createTextNode('X'));

    alert.appendChild(closeAlertBtn);

    if (bool === true) {
        alert.classList.add('success-alert');
        alert.appendChild(document.createTextNode(`Succeess: The event is added to the table`));
    } else {
        alert.classList.add('error-alert');
        alert.appendChild(document.createTextNode(`Error: All fields must be filled`));
    }
    
    eventForm.appendChild(alert);

    closeAlertBtn.addEventListener('click', () => {
        alert.remove();
    });

    setTimeout(() => {
        alert.remove();
    }, 7000);
}

function formValidation(e) {
    e.preventDefault();

    if (eventInput.value === '' || dateInput.value === '' || locationInput.value === '') {
        createAlert(false);
    } else {
        addInTable();
        createAlert(true);
    }
}


addButton.addEventListener('click', formValidation);



// 1. Dodavanje u tabelu