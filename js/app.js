const eventInput = document.getElementById('input-event-name');
const dateInput = document.getElementById('input-date');
const locationInput = document.getElementById('input-location');
const tableBody = document.querySelector('.table-body');
const addButton = document.querySelector('.add-btn');


function addInTable(e) {
    e.preventDefault();

    let tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${eventInput.value}</td>
        <td>${dateInput.value}</td>
        <td>${locationInput.value}</td>
    `
    tableBody.appendChild(tableRow);

    eventInput.value = '';
    dateInput.value = '';
    locationInput.value = '';
}


addButton.addEventListener('click', addInTable);



// 1. Dodavanje u tabelu