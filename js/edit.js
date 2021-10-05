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


function modifyTable() {
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


function deleteTable() {
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

function sortTable() {
    table.style.removeProperty('display');
    backButton.style.removeProperty('display');
    sortAction.style.removeProperty('display');
    deleteDiv.style.display = 'none';
    modifyDiv.style.display = 'none';
    sortDiv.style.display = 'none';
    actionTitle.innerText = 'Sort';
    actionTitle.style.textAlign = 'center';

    backButton.addEventListener('click', back);
}




defaultValues();
updateTable();
modifyDiv.addEventListener('click', modifyTable);
deleteDiv.addEventListener('click', deleteTable);
sortDiv.addEventListener('click', sortTable);





