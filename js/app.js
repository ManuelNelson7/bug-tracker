import { bugsToRender, projectsToRender, modalBug, bugTable, searchInput } from './constants.js';
import { renderBugs, addClick, toggleIcon, openModal } from './higherOrderFunctions.js'
import { urgents, closed, tomorrow, sevenDays, fetchTotalBugs, fetchClosedBugs, fetchUrgentBugs, fetchDueTomorrow, fetchSevenDays } from './arrays.js'
import { fetchBugs } from './functions.js';
import { getTheme } from './darkTheme.js';

//Drag and drop
Sortable.create(bugTable, {
    animation: 200,
    draggable: "tr",
    chosenClass: "selected",
    dragClass: "dragged",
});

//funciones
searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    let searchedBugs = bugsToRender.filter((bug) => bug.name.toLowerCase().includes(searchTerm) || bug.responsible.includes(searchTerm));
    renderBugs(searchedBugs);
});


class Bug {
    constructor(id, name, project, status, due, responsible) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.status = status;
        this.due = due;
        this.responsible = responsible;
    }
};

// Fetch de los proyectos para mostrarlos en el sidebar
const fetchProjects = () => {
    const projectList = document.getElementById('project-list');
    const projectOptions = document.getElementById('projects-options');

    //Vacía las listas para no repetirse en caso de ser llamado de nuevo
    projectList.innerHTML = '';
    projectOptions.innerHTML = '';

    //Por cada elemento en projects, lo imprime en las listas
    projectsToRender.forEach((project) => {
        projectList.innerHTML += `<li id="${project}" class="project-item-list">${project}</li>`;
        projectOptions.innerHTML += `<option value="${project}">${project}</option>`
    })
};

addClick('all-projects', fetchBugs)

// Fetch de todos los datos apenas se carga el body
const fetchData = () => {
    fetchBugs();
    fetchProjects();
};

document.getElementById('form-projects').addEventListener("submit", (e) => {
    e.preventDefault()
})

// Añade un proyecto al array
const addProject = () => {
    const projectName = document.getElementById('new-project').value;

    if (projectName) {
        projectsToRender.push(projectName);
        localStorage.setItem('projects', JSON.stringify(projectsToRender));
        document.getElementById('modal-project').classList.remove('active');
        document.getElementById('form-projects').reset()
        fetchProjects();
    } else {
        alert('Rellena todos los campos!')
    }
};

document.getElementById('plus').addEventListener('click', () => {
    openModal('modal-project')
    addClick('add-project', addProject)
});


// Crea un Bug
const addBug = () => {
    const bugId = chance.guid();
    const bugName = document.getElementById('bug-name').value;
    const bugProject = document.getElementById('projects-options').value;
    const bugStatus = document.getElementById('status').value;
    const bugDue = new Date(document.getElementById('due').value);
    const bugResponsible = document.getElementById('responsible').value;
    const alertBug = document.getElementById('alertBug');

    //Si los campos están llenos, crea un nuevo Bug y lo añade al array
    if (bugName && bugProject && bugStatus && bugDue && bugResponsible) {
        const newBug = new Bug(bugId, bugName, bugProject, bugStatus, bugDue, bugResponsible);
        bugsToRender.push(newBug);
        localStorage.setItem('bugs', JSON.stringify(bugsToRender));
        document.getElementById('form-bug').reset();
        modalBug.classList.remove('active');
        fetchBugs();
        fetchResults();
    } else {
        alertBug.innerHTML = 'Por favor, rellena todos los campos'
    };
};

addClick('add-bug', addBug);


export const fetchResults = () => {
    fetchTotalBugs();
    fetchClosedBugs();
    fetchUrgentBugs();
    fetchDueTomorrow();
    fetchSevenDays();
};

//Filtrar bugs resueltos onclick
addClick('results-total', fetchBugs);

const filterClosed = () => renderBugs(closed);
addClick('results-closed', filterClosed);


const filterUrgents = () => renderBugs(urgents)
addClick('results-urgent', filterUrgents);

const filterDueTomorrow = () => renderBugs(tomorrow)
addClick('results-tomorrow', filterDueTomorrow);

const filterSevenDays = () => renderBugs(sevenDays);
addClick('results-seven', filterSevenDays);

//Filtra los bugs por proyecto
const getProject = (event) => {
    const elements = document.querySelectorAll('.project-selected');
    elements.forEach(element => element.classList.remove('project-selected'));

    const projectClicked = event.target.id;
    event.target.classList.add('project-selected');
    const projectFiltered = bugsToRender.filter((bug) => bug.project === `${projectClicked}`);
    const filterByProject = () => renderBugs(projectFiltered);

    if (projectFiltered != "") {
        filterByProject();
    } else {
        filterByProject();
        bugTable.innerHTML += `
        <h3 class="warning-h3">No se encontraron bugs en ese proyecto, ¿quieres 
            <span onclick="openModalBug()" class="warning-btn">añadir el primero?</span>
        </h3>
    `
    }

};

addClick('project-list', getProject);

document.getElementById('all-projects').addEventListener('click', () => {
    document.getElementById('all-projects').classList.toggle('project-selected')
});

//Abrir modal bug
const openModalBug = () => {
    modalBug.classList.add('active');
};
addClick('open-btn', openModalBug);

//Cerrar modal bug
const closeBtns = document.querySelectorAll('.cancel-btn');
const modals = document.querySelectorAll('.modal');
closeBtns.forEach(btn => {
    btn.onclick = () => { modals.forEach(modal => { modal.classList.remove('active') }) };
});

//Sort por fecha---------------------------------------------------
let sortBtn = document.getElementById('sort-date');
let statusDate = 1;

//Ordenar bugs por fecha (menor a mayor)

const sortDate = (orden) => {
    const sortedBugs = Object.assign([], bugsToRender);

    if (orden === 1) {
        const sortedBugs1 = sortedBugs.sort((a, b) => new Date(a.due) - new Date(b.due));
        renderBugs(sortedBugs1);
        statusDate = 2;
        toggleIcon(sortBtn, 'fa-sort', 'fa-sort-amount-down');
    } else if (orden === 2) {
        const sortedBugs2 = sortedBugs.sort((a, b) => new Date(b.due) - new Date(a.due));
        renderBugs(sortedBugs2);
        statusDate = 3;
        toggleIcon(sortBtn, 'fa-sort-amount-down', 'fa-sort-amount-up');
    } else if (orden === 3) {
        fetchBugs()
        statusDate = 1;
        toggleIcon(sortBtn, 'fa-sort-amount-up', 'fa-sort');
    }
};

//Ordenar bugs por defecto (Éste no funciona, no recarga con el array original)
const sortDateOriginal = () => {
    fetchBugs();
    statusDate = 3;
};

//Dependiendo el estado de sortBtn, filtra con los dos métodos y/o vuelve al default
sortBtn.onclick = () => {
    sortDate(statusDate);
};

//-------------------------------------------------------------

window.addEventListener('DOMContentLoaded', e => {
    fetchData();
});
