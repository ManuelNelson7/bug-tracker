import { bugsToRender } from "./constants.js";
import { fetchResults } from "./arrays.js";
import { fetchBugs } from "./bugs.js";

let bugId;

//Assigns the event click to all the status's buttons in the array
const assignButtonsStatus = () => {
    const statusButtons = document.querySelectorAll('.estado');
    statusButtons.forEach(statusBtn => {
        statusBtn.addEventListener('click', () => {
            openStatus();
            bugId = "";
            bugId = statusBtn.id;
        })
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
export const openStatus = () => {
    document.getElementById('modal-status').classList.add('active');
    document.getElementById('edit-status').addEventListener("click", (e) => {
        e.preventDefault()
        setStatus()
    });
};

//Sets the new status to a bug
export const setStatus = () => {
    const newStatus = document.getElementById('new-status').value;
    bugsToRender.forEach(bug => {
        bug.id === bugId && (bug.status = newStatus);
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