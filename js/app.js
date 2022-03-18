import { bugsToRender, projectsToRender, modalBug, bugTable, searchInput } from './constants.js';
import { renderBugs, addClick, toggleIcon, openModal } from './higherOrderFunctions.js'
import { urgents, closed, tomorrow, sevenDays } from './arrays.js'
import { fetchBugs } from './bugs.js';
import { addBug } from './bugs.js';

//Drag and drop
Sortable.create(bugTable, {
    animation: 200,
    draggable: "tr",
    chosenClass: "selected",
    dragClass: "dragged",
});

//Searchbar by bugName or bugResponsible
searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    let searchedBugs = bugsToRender.filter((bug) => bug.name.toLowerCase().includes(searchTerm) || bug.responsible.includes(searchTerm));
    renderBugs(searchedBugs);
});

//Gets the projects to render them in the sidebar
const fetchProjects = () => {
    const projectList = document.getElementById('project-list');
    const projectOptions = document.getElementById('projects-options');

    projectList.innerHTML = '';
    projectOptions.innerHTML = '';

    projectsToRender.forEach((project) => {
        projectList.innerHTML += `<li id="${project}" class="project-item-list">${project}</li>`;
        projectOptions.innerHTML += `<option value="${project}">${project}</option>`
    })
};

document.getElementById('form-projects').addEventListener("submit", (e) => {
    e.preventDefault()
});

document.getElementById('form-bug').addEventListener("submit", (e) => {
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


//Renders the bugs when I click on the result
addClick('results-total', fetchBugs);

const filterClosed = () => renderBugs(closed);
addClick('results-closed', filterClosed);

const filterUrgents = () => renderBugs(urgents)
addClick('results-urgent', filterUrgents);

const filterDueTomorrow = () => renderBugs(tomorrow)
addClick('results-tomorrow', filterDueTomorrow);

const filterSevenDays = () => renderBugs(sevenDays);
addClick('results-seven', filterSevenDays);

//Filters the bugs by project
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

//Opens the modal bug
const openModalBug = () => {
    modalBug.classList.add('active');
};

//Closes the modal bug
const closeBtns = document.querySelectorAll('.cancel-btn');
const modals = document.querySelectorAll('.modal');
closeBtns.forEach(btn => {
    btn.onclick = () => { modals.forEach(modal => { modal.classList.remove('active') }) };
});

//Sorts the bugs By date---------------------------------------------------
let sortBtn = document.getElementById('sort-date');
let statusDate = 1;

const sortDate = (order) => {
    const sortedBugs = Object.assign([], bugsToRender);

    if (order === 1) {
        const sortedBugs1 = sortedBugs.sort((a, b) => new Date(a.due) - new Date(b.due));
        renderBugs(sortedBugs1);
        statusDate = 2;
        toggleIcon(sortBtn, 'fa-sort', 'fa-sort-amount-down');
    } else if (order === 2) {
        const sortedBugs2 = sortedBugs.sort((a, b) => new Date(b.due) - new Date(a.due));
        renderBugs(sortedBugs2);
        statusDate = 3;
        toggleIcon(sortBtn, 'fa-sort-amount-down', 'fa-sort-amount-up');
    } else if (order === 3) {
        fetchBugs()
        statusDate = 1;
        toggleIcon(sortBtn, 'fa-sort-amount-up', 'fa-sort');
    }
};

sortBtn.onclick = () => {
    sortDate(statusDate);
};

//-------------------------------------------------------------

//Events
addClick('add-bug', addBug);
addClick('all-projects', fetchBugs)
addClick('project-list', getProject);
addClick('open-btn', openModalBug);
document.getElementById('all-projects').addEventListener('click', () => {
    document.getElementById('all-projects').classList.toggle('project-selected')
});

//Spinner simulator
const fetchData = () => {
    fetchBugs();
    fetchProjects();
};

const hideSpinner = () => {
    const spinner = document.querySelector('.loading-container');
    spinner.classList.add('loaded');
}

setTimeout(() => {
    fetchData()
}, 1000);

setTimeout(() => {
    hideSpinner()
}, 1000)


