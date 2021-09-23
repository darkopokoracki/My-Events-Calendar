const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');
const eventForm = document.querySelector('.event-form');

function updateTable() {
    
    for (let i = 0; i < localStorage.length; i++) {
        const dd = localStorage.getItem(localStorage.key(i));
        const ff = JSON.parse(dd);

        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${i + 1}</td>
            <td>${ff.event}</td>
            <td>${ff.date}</td>
            <td>${ff.location}</td>
        `

        tableBody.appendChild(tableRow); 
    }      
}

function addInTable(stringifyEventObject) {
    const parseEventObject = JSON.parse(stringifyEventObject);
    let eventsCounter = localStorage.length;

    let tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${eventsCounter}</td>
        <td>${parseEventObject.event}</td>
        <td>${parseEventObject.date}</td>
        <td>${parseEventObject.location}</td>
    `
    tableBody.appendChild(tableRow);

    eventInput.value = '';
    dateInput.value = '';
    locationInput.value = '';

}

function addInLocalStorage(event, date, location) {
    let eventsCounter = localStorage.length;

    class Event {
        constructor(event, date, location) {
            this.event = event;
            this.date = date;
            this.location = location;
        }
    }

    const eventObject = new Event(event, date, location);

    const stringifyEventObject = JSON.stringify(eventObject);
    localStorage.setItem(`event${eventsCounter + 1}`, stringifyEventObject);
    
    addInTable(stringifyEventObject);
}

function createAlert(bool) {

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
        createAlert(true);
        addInLocalStorage(eventInput.value, dateInput.value, locationInput.value);
    }
}


addButton.addEventListener('click', formValidation);
updateTable();
// localStorage.clear();
