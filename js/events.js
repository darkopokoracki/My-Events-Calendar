const eventsSection = document.querySelector('.events-section');

function getStatusMessage(date) {
    const todaysDate = new Date();
    const currentyear = todaysDate.getFullYear();
    const currentMonth = todaysDate.getMonth();
    const currentDay = todaysDate.getDate();

    const getEventDate = new Date(date.split("-"));

    if (todaysDate > getEventDate && todaysDate < getEventDate.getDate() + 1) {
        return "Passed";
    } else if (todaysDate < getEventDate) {
        return "Coming";
    } else if (todaysDate > getEventDate) {
        return "Today";
    }
}

function daysDiff(todaysDate, eventsDate) {
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = eventsDate.getTime() - todaysDate.getTime();
    
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
}

function getDaysLeft(date) {
    const todaysDate = new Date();
    const currentyear = todaysDate.getFullYear();
    const currentMonth = todaysDate.getMonth();
    const currentDay = todaysDate.getDate();

    const getEventDate = new Date(date.split("-"));
    
    if (todaysDate < getEventDate) {
        const diffInDays = daysDiff(todaysDate, getEventDate);
        return diffInDays;
    } else {
        return 0;
    }
}

function createEventCard() {
    for (let i = 0; i < localStorage.length; i++) {
        // Get Items from local storage
        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);

        console.log(parseEventItem);

        //////
        const statusMessage = getStatusMessage(parseEventItem.date); 
        const daysLeft = getDaysLeft(parseEventItem.date);

        ///////

        // Create event card from scratch - 100% JS
        const event = document.createElement('div');
        event.className = 'event';

        const eventImage = document.createElement('div');
        eventImage.className = 'event-image';
        eventImage.appendChild(document.createTextNode('Slika1'));
        event.appendChild(eventImage);

        const eventContent = document.createElement('div');
        eventContent.className = 'event-content';

        const div1 = document.createElement('div');
            const p1 = document.createElement('p');
            const icon1 = document.createElement('i');
            p1.className = 'event-name';
            p1.appendChild(document.createTextNode(`${parseEventItem.event}`));
            icon1.className = 'fas';
            icon1.classList.add('fa-star');
        div1.appendChild(icon1);
        div1.appendChild(p1);


        const div2 = document.createElement('div');
            const p2 = document.createElement('p');
            const icon2 = document.createElement('i');
            p2.className = 'event-date';
            p2.appendChild(document.createTextNode(`${parseEventItem.date}`));
            icon2.className = 'far';
            icon2.classList.add('fa-calendar-alt');
        div2.appendChild(icon2);
        div2.appendChild(p2);

    
        const div3 = document.createElement('div');
            const p3 = document.createElement('p');
            const icon3 = document.createElement('i');
            p3.className = 'event-location';
            p3.appendChild(document.createTextNode(`${parseEventItem.location}`));
            icon3.className = 'fas';
            icon3.classList.add('fa-map-marker-alt');
        div3.appendChild(icon3);
        div3.appendChild(p3);

        eventContent.appendChild(div1);
        eventContent.appendChild(div2);
        eventContent.appendChild(div3);
        event.appendChild(eventContent);


        const eventStatus = document.createElement('div');
        eventStatus.className = 'event-status';
        
        const status1 = document.createElement('div');
        status1.className = 'status';
            const value1 = document.createElement('div');
            value1.className = 'value';
            value1.appendChild(document.createTextNode(statusMessage));
            const type1 = document.createElement('div');
            type1.className = 'type';
            type1.appendChild(document.createTextNode('Status'));
        status1.appendChild(value1);
        status1.appendChild(type1);

        const status2 = document.createElement('div');
        status2.className = 'status';
            const value2 = document.createElement('div');
            value2.className = 'value';
            value2.appendChild(document.createTextNode(daysLeft));
            const type2 = document.createElement('div');
            type2.className = 'type';
            type2.appendChild(document.createTextNode('Days left'))
        status2.appendChild(value2);
        status2.appendChild(type2);

        eventStatus.appendChild(status1);
        eventStatus.appendChild(status2);
        event.appendChild(eventStatus);

        eventsSection.appendChild(event);
    }
}

if (localStorage.length > 0) {
    createEventCard();
} else {
    const eventAlert = document.createElement('div');
    eventAlert.className = 'event-alert';
    eventAlert.appendChild(document.createTextNode('Event does not exist'));
    eventsSection.appendChild(eventAlert);
}


