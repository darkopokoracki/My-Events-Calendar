const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');
const eventForm = document.querySelector('.event-form');

function updateTable() {
    
    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);

        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${i + 1}</td>
            <td>${parseEventItem.event}</td>
            <td>${parseEventItem.date}</td>
            <td>${parseEventItem.location}</td>
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
    nextEvent();
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

function nextEvent() {
    const nextEventName = document.querySelector('.next-event-name');
    const nextEventDate = document.querySelector('.next-event-date');
    const nextEventLocation = document.querySelector('.next-event-location');

    var eventsArray = [];
    let nearestDate = new Date(2100, 8, 20);
    const today = new Date();

    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        var parseEventItem = JSON.parse(getEventItem);
        eventsArray.push(parseEventItem);

        var getEventDate = new Date(parseEventItem.date.split("-")); //Zasto ovo radi ??

        if (getEventDate < nearestDate && getEventDate > today) {
            nearestDate = getEventDate;
            var parseEventItem_id = i;
        }
    }

    nextEventName.innerText = eventsArray[parseEventItem_id].event;
    nextEventDate.innerText = eventsArray[parseEventItem_id].date;
    nextEventLocation.innerText = eventsArray[parseEventItem_id].location;
}

addButton.addEventListener('click', formValidation);
updateTable();

const eventCounter = localStorage.length;
if (eventCounter > 0) {
    nextEvent();
}
// localStorage.clear();
