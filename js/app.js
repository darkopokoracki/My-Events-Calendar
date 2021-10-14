const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const typeSelect = document.getElementById('event-type');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');
const eventForm = document.querySelector('.event-form');

function updateTable() {
    for (let i = 0; i < localStorage.length; i++) {

        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);

        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${parseEventItem.id}</td>
            <td>${parseEventItem.event}</td>
            <td>${parseEventItem.date}</td>
            <td>${parseEventItem.location}</td>
            <td>${parseEventItem.type}</td>
        `

        tableBody.appendChild(tableRow); 
    }      
}


function calendar() {
    var eventsList = [];
    var monthlyEvents = [];

    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);
        const getEventDate = new Date(parseEventItem.date.split("-"));

        // pushing all events in list
        eventsList.push(getEventDate);
    }


    const monthTitle = document.querySelector('.month-title');
    const daysRow = document.querySelector('.days-row');

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // const lastDay = new Date(currentYear, currentMonth + 1, 0).getDay();

    // checks the days on which events occur (in current year and month)
    for (let i = 0; i < eventsList.length; i++) {
        if (eventsList[i].getFullYear() === currentYear && eventsList[i].getMonth() === currentMonth) {
            monthlyEvents.push(eventsList[i].getDate());
        }
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    // const days = [
    //     'S', 'M', 'T', 'W', 'T', 'F', 'S'
    // ];

    monthTitle.innerText = months[currentMonth];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let iCounter = 0;

    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('p');
        day.className = 'day';
        day.appendChild(document.createTextNode(' '));
        daysRow.appendChild(day);
        iCounter += 1;
    }

    for (let j = 1; j < daysInMonth + 1; j++) {
        const day = document.createElement('p');
        day.className = 'day';
        day.appendChild(document.createTextNode(j));
        daysRow.appendChild(day);

        // Markup current day on calendar
        if (currentDay == j) {
            day.style.backgroundColor = 'black';
            day.style.borderRadius = '10px';
            day.style.color = 'white';
            day.style.fontWeight = '500';
        }

        // Markup saturday and sunday
        const weekendDate = new Date(currentYear, currentMonth, j);

        if (weekendDate.getDay() === 0) {
            day.style.color = 'red';
        }

        if (weekendDate.getDay() === 6) {
            day.style.color = 'blue';
        }

        // Markup events on calendar
        for (let i = 0; i < monthlyEvents.length; i++) {
            if (monthlyEvents[i] === j) {
                day.style.border = '1px solid black';
            }
        }
    }

    for (let k = iCounter + daysInMonth; k < 42; k++) {
        const day = document.createElement('p');
        day.className = 'day';
        day.appendChild(document.createTextNode(' '));
        daysRow.appendChild(day);
    }
}


function nextEvent() {
    const nextEventName = document.querySelector('.next-event-name');
    const nextEventDate = document.querySelector('.next-event-date');
    const nextEventLocation = document.querySelector('.next-event-location');
    // const nextEventType = document.querySelector('.next-event-type');

    var eventsArray = [];
    let nearestDate = new Date(2100, 8, 20);
    const today = new Date();

    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        var parseEventItem = JSON.parse(getEventItem);
        eventsArray.push(parseEventItem);

        var getEventDate = new Date(parseEventItem.date.split("-"));

        if (getEventDate < nearestDate && getEventDate > today) {
            nearestDate = getEventDate; 
            var parseEventItem_id = i;
        }
    }

    nextEventName.innerText = eventsArray[parseEventItem_id].event;
    nextEventDate.innerText = eventsArray[parseEventItem_id].date;
    nextEventLocation.innerText = eventsArray[parseEventItem_id].location;
    // nextEventType.innerText = eventsArray[parseEventItem_id].type; 
    // Toto mam este implementirat
}


function addInTable(stringifyEventObject) {
    const parseEventObject = JSON.parse(stringifyEventObject);

    let tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${parseEventObject.id}</td>
        <td>${parseEventObject.event}</td>
        <td>${parseEventObject.date}</td>
        <td>${parseEventObject.location}</td>
        <td>${parseEventObject.type}</td>
    `
    tableBody.appendChild(tableRow);

    eventInput.value = '';
    dateInput.value = '';
    locationInput.value = '';
    typeSelect.value = '';  

}


function addInLocalStorage(event, date, location, type) {
    let eventsCounter = localStorage.length;

    class Event {
        constructor(id, event, date, location, type) {
            this.id = id + 1;    // PITANJE1 Zasto ide ovde ID a ne eventsCounter?
            this.event = event;
            this.date = date;
            this.location = location;
            this.type = type;
        }
    }

    const eventObject = new Event(eventsCounter, event, date, location, type);
    const stringifyEventObject = JSON.stringify(eventObject);

    localStorage.setItem(`event${eventObject.id}`, stringifyEventObject);
    
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

    if (eventInput.value === '' || dateInput.value === '' || locationInput.value === '' || typeSelect.value === '') {
        createAlert(false);
    } else {
        createAlert(true);
        addInLocalStorage(eventInput.value,
                          dateInput.value,  
                          locationInput.value, 
                          typeSelect.value);
    }
}

// localStorage.clear();
addButton.addEventListener('click', formValidation);
updateTable();
calendar();


const eventCounter = localStorage.length;

if (eventCounter > 0) {
    nextEvent();
}


