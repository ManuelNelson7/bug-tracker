import { bugsToRender, bugTable } from "./constants.js";
import { fetchResults } from "./arrays.js";

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

//Opens the modal to change the status
export const openStatus = (id) => {
    document.getElementById('modal-status').classList.add('active');
    document.getElementById('edit-status').addEventListener("click", (e) => {
        e.preventDefault()
        setStatus(id)
    });
};

//Sets the new status to a bug
export const setStatus = (id) => {
    const newStatus = document.getElementById('new-status').value;
    bugsToRender.forEach(bug => {
        bug.id === id && (bug.status = newStatus);

    })
    document.getElementById('modal-status').classList.remove('active');
    localStorage.setItem('bugs', JSON.stringify(bugsToRender));
    document.getElementById('form-status').reset()
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