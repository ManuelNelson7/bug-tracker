export const projects = ['Bug Tracker', 'miTask', 'Backend'];

const fetchOrLocal = async () => {
    const res = await fetch('/bugsDefault.json')
    const data = await res.json()
    return JSON.parse(localStorage.getItem('bugs')) || data;
}

<<<<<<< HEAD

//LocalStorage
export const bugsToRender = await fetchOrLocal()
console.log(bugsToRender)
=======
//LocalStorage
export const bugsToRender = await fetchOrLocal()
>>>>>>> ba3bdf98bcd05124173bfa7b025dbdbc6d4d2c4a
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
