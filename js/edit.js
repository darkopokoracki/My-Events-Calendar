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
            <td>${parseEventItem.id}</td>
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


function sortTable(sortBy) {
    var eventArray = [];
    var idArray = [];

    for (let i = 0; i < localStorage.length; i++) {
        const getEventItem = localStorage.getItem(localStorage.key(i));
        const parseEventItem = JSON.parse(getEventItem);
        console.log(parseEventItem)
        eventArray.push(parseEventItem);
        idArray.push(parseEventItem.id)
    }
    

    switch(sortBy) {
        case 'by-id':
            console.log(eventArray);
            const sorted = idArray.sort(function(a, b) {return a - b});
            console.log(sorted);

            var sortedEventsArray = []
            for (let i = 0; i < idArray.length; i++) {
                for (j = 0; j < eventArray.length; j++) {
                    if (idArray[i] === eventArray[j].id) {
                        sortedEventsArray.push(eventArray[j])
                    }
                }
            }
            // Toto Sortirania Po ID Robi, nacim mi smisliet logiku ako to prikazat do tabele
            // Fora je ze secko co kcem aby bolo trajnvo, misi ist cez LocalStorage
            // FOra je v tom ze localStorage mi nerobi najlepsie lebo miesa indforamcije
            console.log(sortedEventsArray)

            // localStorage.clear();
        
            // for (let i = 0; i < eventArray.length; i++) {
            //     localStorage.setItem(`event${i + 1}`, JSON.stringify(sortedEventsArray[i]));
            // }
            // updateTable();
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


function sortTableValidation() {
    const sortById = document.getElementById('by-id'); //checkbox
    const sortByEventNameAZ = document.getElementById('by-event-name-az'); //checkbox
    const sortByEventNameZA = document.getElementById('by-event-name-za'); // checkbox
    const sortByDate = document.getElementById('by-date');
    const checkboxArray = [sortById, sortByEventNameAZ, sortByEventNameZA, sortByDate];
    var flag = 0;

    checkboxArray.forEach( checkbox => {
        if (checkbox.checked === true) {
            flag = 1;
            sortTable(checkbox.id);
            createAlert(true);
        }
    });

    if (flag === 0) {
        createAlert(false);
    }
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



updateTable();
defaultValues();

modifyDiv.addEventListener('click', modifyView);
deleteDiv.addEventListener('click', deleteView);
sortDiv.addEventListener('click', sortView);





