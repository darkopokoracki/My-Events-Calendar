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
    let eventsArray = JSON.parse(localStorage.getItem('Events'));

    for (let i = 0; i < eventsArray.length; i++) {
        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${eventsArray[i].id}</td>
            <td>${eventsArray[i].event}</td>
            <td>${eventsArray[i].date}</td>
            <td>${eventsArray[i].location}</td>
            <td>${eventsArray[i].type}</td>
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
    // getting events from localStorage
    let eventsArray = JSON.parse(localStorage.getItem('Events'));

    switch(sortBy) {
        case 'by-id-ascending':
            var eventsIdAscending = [];

            for (let i = 0; i < eventsArray.length; i++) {
                eventsIdAscending.push(i + 1);
            }

            let sortedArrayAscending = [];

            for (let j = 0; j < eventsIdAscending.length; j++) {
                for (let k = 0; k < eventsArray.length; k++) {
                    if (eventsIdAscending[j] === eventsArray[k].id) {
                        sortedArrayAscending.push(eventsArray[k]);
                    }
                }
            }

            localStorage.setItem('Events', JSON.stringify(sortedArrayAscending));
            break;
        case 'by-id-descending':
            let eventsIdDescending = [];

            for (let i = eventsArray.length; i > 0; i--) {
                eventsIdDescending.push(i);
            }

            let sortedArrayDescending = [];

            for (let j = 0; j < eventsIdDescending.length; j++) {
                for (let k = 0; k < eventsArray.length; k++) {
                    if (eventsIdDescending[j] === eventsArray[k].id) {
                        sortedArrayDescending.push(eventsArray[k]);
                    }
                }
            }

            localStorage.setItem('Events', JSON.stringify(sortedArrayDescending));
            break;
        case 'by-event-name-az':
            let eventsNameAZ = [];

            for (let i = 0; i < eventsArray.length; i++) {
                eventsNameAZ.push(eventsArray[i].event);
            }
            console.log("Pre sortiranja");
            console.log(eventsNameAZ);
            eventsNameAZ.sort();

            let sortedArrayAZ = eventsNameAZ.sort();
            console.log("Posle sortiranja");
            console.log(sortedArrayAZ);

            // for (let j = 0; j < eventsNameAZ.length; j++) {
            //     for (let k = 0; k < eventsArray.length; k++) {
            //         if (eventsNameAZ[j] === eventsArray[k].event) {
            //             sortedArrayAZ.push(eventsArray[k]);
            //         }
            //     }
            // }

            localStorage.setItem('Events', JSON.stringify(sortedArrayAZ));

            break;
        case 'by-event-name-za':
            let eventsNameZA = [];

            for (let i = 0; i < eventsArray.length; i++) {
                eventsNameZA.push(eventsArray[i].event);
            }

            eventsNameZA.sort().reverse();

            let sortedArrayZA = [];

            for (let j = 0; j < eventsNameZA.length; j++) {
                for (let k = 0; k < eventsArray.length; k++) {
                    if (eventsNameZA[j] === eventsArray[k].event) {
                        sortedArrayZA.push(eventsArray[k]);
                    }
                }
            }

            localStorage.setItem('Events', JSON.stringify(sortedArrayZA));
            break;
        case 'by-date':
            console.log("Da das ads")
            let eventsDate = [];

            for (let i = 0; i < eventsArray.length; i++) {
                console.log('ttt')
                eventsDate.push(new Date(eventsArray[i].date.split("-")));
            }

            // eventsNameAZ.sort();
            console.log("Pa Da vidimo");
            console.log(eventsDate);

            
            let sortedArrayDate = [];

            // for (let j = 0; j < eventsDate.length; j++) {
            //     for (let k = 0; k < eventsArray.length; k++) {
            //         if (eventsDate[j] === eventsArray[k].date) {
            //             sortedArrayDate.push(eventsArray[k]);
            //         }
            //     }
            // }

            // localStorage.setItem('Events', JSON.stringify(sortedArrayDate));
            break;
    }
}


function sortTableValidation() {
    const sortByIdAscending = document.getElementById('by-id-ascending'); // checkbox
    const sortByIdDescending = document.getElementById('by-id-descending'); // checkbox
    const sortByEventNameAZ = document.getElementById('by-event-name-az'); // checkbox
    const sortByEventNameZA = document.getElementById('by-event-name-za'); // checkbox
    const sortByDate = document.getElementById('by-date'); // checkbox
    const checkboxArray = [sortByIdAscending,sortByIdDescending, sortByEventNameAZ, sortByEventNameZA, sortByDate];

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

    // sortButton.parentElement.href = '../html/index.html';
}



updateTable();
defaultValues();

modifyDiv.addEventListener('click', modifyView);
deleteDiv.addEventListener('click', deleteView);
sortDiv.addEventListener('click', sortView);





