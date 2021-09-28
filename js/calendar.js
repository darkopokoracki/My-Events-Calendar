// Calendar for whole year from scratch. 100% JS
const container = document.querySelector('.container');
const script = document.querySelector('script');

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();



function createCalendar() {
    const calendar = document.createElement('section');
    calendar.className = 'calendar';
    container.insertBefore(calendar, script);
    createMonth(calendar);  //function
}

function createMonth(calendar) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    for (let i = 0; i < 12; i++) {
        console.log('izvrsava se');
        const monthCard = document.createElement('article');
        monthCard.className = 'month-card';
        calendar.appendChild(monthCard);

        const monthTitle = document.createElement('div');
        monthTitle.className = 'month-title';
        monthTitle.appendChild(document.createTextNode(`${months[i]}`));
        monthCard.appendChild(monthTitle);

        const weekRow = document.createElement('div');
        weekRow.className = 'week-row';
        createWeekRow(weekRow);     //function
        monthCard.appendChild(weekRow);
        
        const daysRow = document.createElement('days-row');
        daysRow.className = 'days-row';
        createDays(daysRow, i);
        monthCard.appendChild(daysRow);
    }
}

function createWeekRow(weekRow) {
    const days = [
        'S', 'M', 'T', 'W', 'T', 'F', 'S'
    ];

    for (let i = 0; i < days.length; i++) {
        const day = document.createElement('p');
        day.appendChild(document.createTextNode(`${days[i]}`));
        weekRow.appendChild(day);

        if (i === 0) {
            day.style.color = 'red';
        }

        if (i === 6) {
            day.style.color = 'blue';
        }
    }
}

function createDays(daysRow, i) {

        const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
        const firstDay = new Date(currentYear, i, 1).getDay();

        let jCounter = 0;

        for (let j = 0; j < firstDay; j++) {
            const day = document.createElement('p');
            day.className = 'day';
            day.appendChild(document.createTextNode(' '));
            daysRow.appendChild(day);
            jCounter += 1;
        }

        for (let k = 1; k < daysInMonth + 1; k++) {
            const day = document.createElement('p');
            day.className = 'day';
            day.appendChild(document.createTextNode(k));
            daysRow.appendChild(day);

            // Markup current day on calendar
            if (currentMonth === i && currentDay === k) {
                day.style.backgroundColor = 'black';
                day.style.borderRadius = '10px';
                day.style.color = 'white';
                day.style.fontWeight = '500';
            }

            const weekendDate = new Date(currentYear, i, k);

            if (weekendDate.getDay() === 0) {
                day.style.color = 'red';
            }
    
            if (weekendDate.getDay() === 6) {
                day.style.color = 'blue';
            }
        }

        for (let m = jCounter + daysInMonth; m < 42; m++) {
            const day = document.createElement('p');
            day.className = 'day';
            day.appendChild(document.createTextNode(' '));
            daysRow.appendChild(day);
        }
    }

createCalendar();