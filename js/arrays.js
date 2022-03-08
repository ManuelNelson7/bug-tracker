import { renderArray } from "./higherOrderFunctions.js";
import { bugsToRender, today, seconds } from "./constants.js";

//-----Arrays-----
const filterBugs = (status) => {
    return bugsToRender.filter((bug) => bug.status === status);
};

export let closed = filterBugs('Resuelto');
export let urgents = filterBugs('Urgente');
export let tomorrow = bugsToRender.filter((bug) => ((new Date(bug.due) - today) / seconds) == 1);
export let sevenDays = bugsToRender.filter((bug) => ((new Date(bug.due) - today) / seconds) >= 7);


//-----Bugs count-----

//Counts the total bugs and renders the length
const fetchTotalBugs = () => {
    document.getElementById('open-bugs').innerHTML = bugsToRender.length;
    const abiertos = document.getElementById('abiertos');
    bugsToRender.length > 1 ? abiertos.innerHTML = 'Bugs abiertos' : abiertos.innerHTML = 'Bug abierto';
};

//Counts the closed bugs and renders the length
const fetchClosedBugs = () => {
    closed = filterBugs('Resuelto');
    renderArray('closed-bugs', closed);
    const resueltos = document.getElementById('resueltos');
    closed.length > 1 ? resueltos.innerHTML = 'Bugs resueltos' : resueltos.innerHTML = 'Bug resuelto';
};

//Counts the urgents bugs and renders the length
const fetchUrgentBugs = () => {
    urgents = filterBugs('Urgente');
    renderArray('urgent-bugs', urgents);
    const urgentes = document.getElementById('urgentes');
    urgents.length > 1 ? urgentes.innerHTML = 'Urgentes' : urgentes.innerHTML = 'Urgente';
};

//Contabiliza los bugs para manana
const fetchDueTomorrow = () => {
    renderArray('tomorrow-bugs', tomorrow);
}

//Contabiliza los bugs para dentro de 7 días
const fetchSevenDays = () => {
    renderArray('seven-bugs', sevenDays);
}

export const fetchResults = () => {
    fetchTotalBugs();
    fetchClosedBugs();
    fetchUrgentBugs();
    fetchDueTomorrow();
    fetchSevenDays();
};