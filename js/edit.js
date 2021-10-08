const tableBody = document.querySelector('.table-body');
const table = document.querySelector('table');
const modifyDiv = document.querySelector('.modify');
const deleteDiv = document.querySelector('.delete');
const sortDiv = document.querySelector('.sort');
const actionTitle = document.querySelector('.action-title');
const backButton = document.querySelector('.back-button');
const modifyAction = document.querySelector('.modify-action');
const sortAction = document.querySelector('.sort-action');
const deleteAction = document.querySelector('.delete-action');
const sortButton = document.querySelector('.sort-btn');


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
            <td>${parseEventItem.type}</td>
        `

        tableBody.appendChild(tableRow); 
    }      
}

function defaultValues() {
    table.style.display = 'none';  //default
    backButton.style.display = 'none'; //default
    modifyAction.style.display = 'none';
    sortAction.style.display = 'none';
    deleteAction.style.display = 'none';
}

function back() {
    table.style.display = 'none';  
    backButton.style.display = 'none'; 
    deleteDiv.style.removeProperty('display');
    modifyDiv.style.removeProperty('display');
    sortDiv.style.removeProperty('display');
    actionTitle.innerText = 'Edit';
    actionTitle.style.textAlign = 'left';
    modifyAction.style.display = 'none';
    sortAction.style.display = 'none';
    deleteAction.style.display = 'none';
}


function modifyView() {
    table.style.removeProperty('display');
    backButton.style.removeProperty('display');
    modifyAction.style.removeProperty('display');
    deleteDiv.style.display = 'none';
    modifyDiv.style.display = 'none';
    sortDiv.style.display = 'none';
    actionTitle.innerText = 'Modify';
    actionTitle.style.textAlign = 'center';


    backButton.addEventListener('click', back);
}


function deleteView() {
    table.style.removeProperty('display');
    backButton.style.removeProperty('display');
    deleteAction.style.removeProperty('display');
    deleteDiv.style.display = 'none';
    modifyDiv.style.display = 'none';
    sortDiv.style.display = 'none';
    actionTitle.innerText = 'Delete';
    actionTitle.style.textAlign = 'center';


    backButton.addEventListener('click', back);
}

function sortView() {
    table.style.removeProperty('display');
    backButton.style.removeProperty('display');
    sortAction.style.removeProperty('display');
    deleteDiv.style.display = 'none';
    modifyDiv.style.display = 'none';
    sortDiv.style.display = 'none';
    actionTitle.innerText = 'Sort';
    actionTitle.style.textAlign = 'center';

    backButton.addEventListener('click', back);
    sortButton.addEventListener('click', sortTableValidation);
}

function sortTableValidation() {
    const sortById = document.getElementById('by-id'); //checkbox
    const sortByEventNameAZ = document.getElementById('by-event-name-az'); //checkbox
    const sortByEventNameZA = document.getElementById('by-event-name-za'); // checkbox
    const sortByDate = document.getElementById('by-date');
    const checkboxArray = [sortById, sortByEventNameAZ, sortByEventNameZA, sortByDate];

    checkboxArray.forEach( checkbox => {
        if (checkbox.checked === true) {
            sortTable(checkbox.id);
        }
    });
}

function sortTable(sortBy) {
    var eventArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);
        eventArray.push(parseEventItem);
    }

    switch(sortBy) {
        case 'by-id':
            break;
        case 'by-event-name-az':
            console.log('Izabrano je by event-name-az');
            break;
        case 'by-event-name-za':
            console.log('Izabrano je by event name-za');
            break;
        case 'by-date':
            console.log('Izabrano je by-date');
            break;
    }
}

function createAlert(bool) {
    const sortAction = document.querySelector('.sort-action'); // For append alert
    const alert = document.createElement('div');
    alert.className = 'alert';

    const closeAlertBtn = document.createElement('span');
    closeAlertBtn.className = 'close-btn';
    closeAlertBtn.appendChild(document.createTextNode('X'));

    alert.appendChild(closeAlertBtn);

    if (bool === true) {
        alert.classList.add('success-alert');
        alert.appendChild(document.createTextNode(`Succeess: The table was successfully sorted!`));
    } else {
        alert.classList.add('error-alert');
        alert.appendChild(document.createTextNode(`Error: Please check one option`));
    }
    
    sortAction.insertBefore(alert, sortButton);

    closeAlertBtn.addEventListener('click', () => {
        alert.remove();
    });

    setTimeout(() => {
        alert.remove();
    }, 7000);
}


defaultValues();
updateTable();
modifyDiv.addEventListener('click', modifyView);
deleteDiv.addEventListener('click', deleteView);
sortDiv.addEventListener('click', sortView);





