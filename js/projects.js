import { projectsToRender } from "./constants";
import { addClick } from "./higherOrderFunctions";


// Renders the projects on the sidebar and forms
export const renderProjects = () => {
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


// Adds a project to the array and localStorage
const addProject = () => {
    const projectName = document.getElementById('new-project').value;

    if (projectName) {
        projectsToRender.push(projectName);
        localStorage.setItem('projects', JSON.stringify(projectsToRender));
        document.getElementById('modal-project').classList.remove('active');
        document.getElementById('form-projects').reset()
        renderProjects();
    } else {
        alert('Rellena todos los campos!')
    }
};

//Opens the modal to add a project
document.getElementById('plus').addEventListener('click', () => {
    openModal('modal-project')
    addClick('add-project', addProject)
});


//Filters the bug by project
const getProject = (event) => {
    const elements = document.querySelectorAll('.project-selected');
    elements.forEach(element => element.classList.remove('project-selected'));

    const projectClicked = event.target.id;
    event.target.classList.add('project-selected');
    const projectFiltered = bugsToRender.filter((bug) => bug.project === `${projectClicked}`);


    if (projectFiltered != "") {
        renderBugs(projectFiltered);
    } else {
        renderBugs(projectFiltered);
        getTheme();
        bugTable.innerHTML += `
        <h3 class="warning-h3">No se encontraron bugs en ese proyecto, ¿quieres 
            <span onclick="openModalBug()" class="warning-btn">añadir el primero?</span>
        </h3>
    `
    }

};


addClick('all-projects', fetchBugs)
addClick('project-list', getProject);

document.getElementById('form-projects').addEventListener("submit", (e) => {
    e.preventDefault()
})

document.getElementById('all-projects').addEventListener('click', () => {
    document.getElementById('all-projects').classList.toggle('project-selected')
});

