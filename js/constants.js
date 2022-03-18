export const projects = ['Bug Tracker', 'miTask', 'Backend'];

const fetchOrLocal = async () => {
    const res = await fetch('/bugsDefault.json')
    const data = await res.json()
    return JSON.parse(localStorage.getItem('bugs')) || data;
}

//LocalStorage
export const bugsToRender = await fetchOrLocal()
export const projectsToRender = JSON.parse(localStorage.getItem('projects')) || projects;


//Nodes and constants
export const modalBug = document.getElementById('bug-modal');
export const bugTable = document.getElementById('bug-table');
export const searchInput = document.querySelector("[data-search]");
export const seconds = 86400000;

//Getting the actual date, stored in "today"
const dateNow = new Date();
export const newDate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
export const today = new Date(newDate);
