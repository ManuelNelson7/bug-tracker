import { bugsToRender, bugTable } from "./constants.js";
import { fetchResults } from "./app.js";
import { getTheme } from "./darkTheme.js";

//Assigns the event click to all the status's buttons in the array
const assignButtonsStatus = () => {
    const statusButtons = document.querySelectorAll('.estado');
    statusButtons.forEach(statusBtn => {
        statusBtn.addEventListener('click', () => { openStatus(statusBtn.id) })
    })
};

//Assigns the event click to all the status's buttons in the array
const assignButtonsDelete = () => {
    const deleteButtons = document.querySelectorAll('.trash');
    deleteButtons.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => { deleteBug(deleteBtn.id) })
    })
};

export const assignBtns = () => {
    assignButtonsDelete();
    assignButtonsStatus();
};

// Fetch the bugs to renders them in the table
export const fetchBugs = () => {
    bugTable.innerHTML = '';

    bugsToRender.forEach((bug) => {
        bugTable.innerHTML += `<tr>
        <td class="bug-name">${bug.name}</td>
        <td class="status">
            <div id="${bug.id}" class="estado ${bug.status}">${bug.status}</div>
        </td>
        <td class="date">${new Date(bug.due).toLocaleDateString()}</td>
        <td class="responsable">${bug.responsible}</td>
        <td class='trash' id="${bug.id}"><i class="fas fa-trash"></i></td>
        </tr>
        `
    })
    assignBtns();
    fetchResults();
    getTheme();
};

//Opens the modal to change the status
export const openStatus = (id) => {
    document.getElementById('modal-status').classList.add('active');
    console.log(id);
    document.getElementById('edit-status').addEventListener("click", (e) => {
        e.preventDefault()
        setStatus(id)
    });
};

export const setStatus = (id) => {
    const newStatus = document.getElementById('new-status').value;
    bugsToRender.forEach(bug => {
        bug.id === id && (bug.status = newStatus);
    })
    document.getElementById('modal-status').classList.remove('active');
    localStorage.setItem('bugs', JSON.stringify(bugsToRender));
    fetchBugs();
    fetchResults();
};

export const deleteBug = (id) => {
    for (let i = 0; i < bugsToRender.length; i++) {
        bugsToRender[i].id === id && (bugsToRender.splice(i, 1));
    }
    localStorage.setItem('bugs', JSON.stringify(bugsToRender));
    fetchBugs();
    fetchResults();
};