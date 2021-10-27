// --------- References ----------
const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const typeSelect = document.getElementById('event-type');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');
const eventForm = document.querySelector('.event-form');

// ------Functions: 7-------
function updateTable() {
    // getting events from localStorage
    let eventsArray = JSON.parse(localStorage.getItem('Events'));

    // looping throught events if events list in localstorage is not empty
    for (let i = 0; i < eventsArray.length; i++) {
        // creating table row
        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${eventsArray[i].id}</td>
            <td>${eventsArray[i].event}</td>
            <td>${eventsArray[i].date}</td>
            <td>${eventsArray[i].location}</td>
            <td>${eventsArray[i].type}</td>
        `
        
        // adding new row in DOM, in table
        tableBody.appendChild(tableRow);
    }
}


function calendar() {
    const monthTitle = document.querySelector('.month-title');
    const daysRow = document.querySelector('.days-row');

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    var eventsDateList = []; // contains dates of events
    var monthlyEvents = []; // contains the days on which the event exists

    // getting events from localStorage
    let eventsArray = JSON.parse(localStorage.getItem('Events'));

    for (let i = 0; i < eventsArray.length; i++) {
        // making date with split method
        const getEventDate = new Date(eventsArray[i].date.split("-"));

        // pushing all events dates in list
        eventsDateList.push(getEventDate);
    }


    // checks the days on which events occur (in current year and month)
    for (let i = 0; i < eventsDateList.length; i++) {
        if (eventsDateList[i].getFullYear() === currentYear && eventsDateList[i].getMonth() === currentMonth) {
            monthlyEvents.push(eventsDateList[i].getDate());
        }
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    // month title on claendar
    monthTitle.innerText = months[currentMonth];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let iCounter = 0;

    // filling out the calendar
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
    var isEmpty = true;

    // getting events from localStorage
    let eventsArray = JSON.parse(localStorage.getItem('Events'));
    
    let nearestDate = new Date(2100, 8, 20);
    const today = new Date();


    for (let i = 0; i < eventsArray.length; i++) {
        var getEventDate = new Date(eventsArray[i].date.split("-"));

        if (getEventDate < nearestDate && getEventDate > today) {
            nearestDate = getEventDate; 
            var parseEventItem_id = i;
            isEmpty = false;
        }
    }

    if (isEmpty === false) {
        nextEventName.innerText = eventsArray[parseEventItem_id].event;
        nextEventDate.innerText = eventsArray[parseEventItem_id].date;
        nextEventLocation.innerText = eventsArray[parseEventItem_id].location;
    }
}


function addInTable(eventsArray) {
    // making table row
    let tableRow = document.createElement('tr');

    tableRow.innerHTML = 
    // adding last event in table
    `
        <td>${eventsArray[eventsArray.length - 1].id}</td>
        <td>${eventsArray[eventsArray.length - 1].event}</td>
        <td>${eventsArray[eventsArray.length - 1].date}</td>
        <td>${eventsArray[eventsArray.length - 1].location}</td>
        <td>${eventsArray[eventsArray.length - 1].type}</td>
    `;

    // adding new row in DOM, in table
    tableBody.appendChild(tableRow); 
}


function addInLocalStorage(event, date, location, type) {
    // getting number of events
    let eventsCounter = JSON.parse(localStorage.getItem('Events')).length;

    // Event class for making event objects
    class Event {
        constructor(id, event, date, location, type) {
            this.id = id + 1;   
            this.event = event;
            this.date = date;
            this.location = location;
            this.type = type;
        }
    }

    // making new event object
    const eventObject = new Event(eventsCounter, event, date, location, type);

    // getting events from localStorage
    const eventsArray = JSON.parse(localStorage.getItem('Events'));

    // adding new event object to list of events
    eventsArray.push(eventObject);

    // storing events in local storage with new added object
    localStorage.setItem('Events', JSON.stringify(eventsArray));

    addInTable(eventsArray);
    nextEvent();
}


function createAlert(bool) {
    // create alert
    const alert = document.createElement('div');
    alert.className = 'alert';

    // create close button for alert
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
    
    // adding alert in DOM
    eventForm.appendChild(alert);

    // closing alert on click or after 7 seconds
    closeAlertBtn.addEventListener('click', () => {
        alert.remove();
    });

    setTimeout(() => {
        alert.remove();
    }, 7000);
}


function formValidation(e) {
    e.preventDefault();

    // checking form validation
    if (eventInput.value === '' || dateInput.value === '' || locationInput.value === '' || typeSelect.value === '') {
        createAlert(false);
    } else {
        createAlert(true);
        addInLocalStorage(eventInput.value,
                          dateInput.value,  
                          locationInput.value, 
                          typeSelect.value);
        
        // clearing input fields
        eventInput.value = "";
        dateInput.value = "";
        locationInput.value = "";
        typeSelect.value = "";
    }
}


// ------- Functions Invoking and Event listeners -------

// Setting up list of events in localStorage
if (localStorage.length === 0) {
    localStorage.setItem("Events", JSON.stringify([]));
}

// Clear Local Storage for testing purpose
// localStorage.clear();


updateTable();
calendar();
nextEvent();

addButton.addEventListener('click', formValidation);


