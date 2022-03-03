export const projects = ['Bug Tracker', 'miTask', 'Backend'];
export const bugs = [
    {
        id: "2b37c8b2-c128-547b-a51b-b32be2a7958a",
        name: "La aplicación no se conecta a una base de datos, por lo que tiene que ser hardcodeada",
        project: "Bug Tracker",
        status: "En proceso",
        due: "January 30, 2022",
        responsible: "Manuel Nelson"
    },
    {
        id: "4b37c8b2-c128-547b-a51b-b33be2a7958a",
        name: "La aplicación no es responsive",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "February 02, 2022",
        responsible: "Manuel Nelson"
    },
    {
        id: "2637c8b2-c128-547b-a51b-b35be2a7958a",
        name: "Todavía no hay modals para agregar un bug, sacar cuanto antes el form del sidebar",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "February 12, 2022",
        responsible: "Manuel Nelson"
    },
    {
        id: "2b37c8b2-c128-547b-a51b-b336e2a7958a",
        name: "Crear layout y hardcodear, para probar UI",
        project: "Bug Tracker",
        status: "Resuelto",
        due: "February 10, 2022",
        responsible: "Manuel Nelson"
    },
    {
        id: "2b37c8b2-c128-547b-251b-b33be2a7958a",
        name: "Entregar proyecto final",
        project: "miTask",
        status: "Urgente",
        due: "March 02, 2022",
        responsible: "Manuel Nelson"
    }
];

//LocalStorage
export const bugsToRender = JSON.parse(localStorage.getItem('bugs')) || bugs;
export const projectsToRender = JSON.parse(localStorage.getItem('projects')) || projects;


//Nodes and constants
export const modalBug = document.getElementById('bug-modal');
export const bugTable = document.getElementById('bug-table');
export const searchInput = document.querySelector("[data-search]");
export const today = new Date("March 01, 2022");
export const seconds = 86400000;


