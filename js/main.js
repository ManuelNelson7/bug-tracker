const projects = ['Bug Tracker', 'miTask', 'Backend'];
const bugs = [
    {
        name: "La aplicación no se conecta a una base de datos, por lo que tiene que ser hardcodeada",
        project: "Bug Tracker",
        status: "En proceso",
        due: "January 30, 2022",
        responsible: "Manuel Nelson",
        id: "874cf26e-bc44-5434-b106-42c2edc12356c"
    },
    {
        name: "La aplicación no es responsive",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "February 02, 2022",
        responsible: "Manuel Nelson",
        id: "874cf26e-bc44-5434-b106-42c2edc22356c"
    },
    {
        name: "Todavía no hay modals para agregar un bug, sacar cuanto antes el form del sidebar",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "February 12, 2022",
        responsible: "Manuel Nelson",
        id: "874cf26e-bc44-5434-b106-42c2edc32356c"
    },
    {
        name: "Crear layout y hardcodear, para probar UI",
        project: "Bug Tracker",
        status: "Resuelto",
        due: "February 10, 2022",
        responsible: "Manuel Nelson",
        id: "874cf26e-bc44-5434-b106-42c2edc52356c"
    },
    {
        name: "Entregar proyecto final",
        project: "miTask",
        status: "Urgente",
        due: "March 02, 2022",
        responsible: "Manuel Nelson",
        id: "874cf26e-bc44-5434-b106-42c2edc89356c"
    }
];

//LocalStorage

const fetchLocalBugs = () => {
    return JSON.parse(localStorage.getItem('bugs'));
}
let bugsLocalStorage = fetchLocalBugs();
let bugsToRender = [];



if (bugsLocalStorage && bugsLocalStorage.length > 0) {
    bugsToRender = bugsLocalStorage; //Si hay bugs en localStorage, asignarlos a bugsTorender
} else {
    bugsToRender = bugs; //Sino, bugsToRender es el array original.
};

console.log(bugsToRender);

const modalBug = document.getElementById('bug-modal');
const bugTable = document.getElementById('bug-table');

const today = new Date("February 9, 2022");
const seconds = 86400000;

//funciones
const filterBugs = (status) => {
    return bugsToRender.filter((bug) => bug.status === status);
}

const renderArray = (id, array) => {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).innerHTML = array.length;
}

const addClick = (id, func) => { //Ejecuta una función cuando el elemento es clickeado
    document.getElementById(id).addEventListener('click', func);
}

const openModal = (modal) => {
    document.getElementById(modal).classList.add('active');
}

// const deleteBug = () => {
//     const elements = document.querySelectorAll('#trash')
//     console.log(elements);
//     elements.forEach(element => console.log(elements.);
// }


const urgents = filterBugs('Urgente');
const closed = filterBugs('Resuelto');
const tomorrow = bugsToRender.filter((bug) => ((new Date(bug.due) - today) / seconds) == 1);
const sevenDays = bugsToRender.filter((bug) => ((new Date(bug.due) - today) / seconds) >= 7);


class Bug {
    constructor(id, name, project, status, due, responsible) {
        this.name = name;
        this.project = project;
        this.status = status;
        this.due = due;
        this.responsible = responsible;
        this.id = id;
    }

    editName(newName) {
        this.name = newName;
    }
    editStatus(newStatus) {
        this.status = newStatus;
    }
    editDue(newDue) {
        this.due = newDue;
    }
    editResponsible(newResponsible) {
        this.responsible = newResponsible;
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
    projects.forEach((project) => {
        projectList.innerHTML += `<li id="${project}" class="project-item-list">${project}</li>`;
        projectOptions.innerHTML += `<option value="${project}">${project}</option>`
    })
};

// Fetch de los bugs para mostrarlos en la tabla
const fetchBugs = () => {
    bugTable.innerHTML = '';

    bugsToRender.forEach((bug) => {
        bugTable.innerHTML += `<tr>
        <td class="bug-name"><input class="name-input" placeholder="${bug.name}" ></td>
        <td class="status">
            <div onclick='editStatus("${bug.id}")' class="estado ${bug.status}">${bug.status}</div>
        </td>
        <td class="date">${new Date(bug.due).toLocaleDateString()}</td>
        <td class="responsable">${bug.responsible}</td>
        <td id="trash" onclick="deleteBug()"><i class="fas fa-trash"></i></td>
        </tr>
        `
    })
    fetchResults();
};
addClick('all-projects', fetchBugs)

// Fetch de todos los datos apenas se carga el body
const fetchData = () => {
    fetchBugs();
    fetchProjects();
};
window.addEventListener('DOMContentLoaded', e => {
    fetchData();
})

// Añade un proyecto al array
const addProject = () => {
    let projectName = prompt('Nombre del proyecto');

    if (projectName) {
        projects.push(projectName);
        fetchProjects();
    } else {
        alert('Rellena todos los campos!')
    }
};

addClick('add-project', addProject);

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
        bugs.push(newBug);
        localStorage.setItem('bugs', JSON.stringify(bugs));
        document.getElementById('form-bug').reset();
        modalBug.classList.remove('active');
        fetchLocalBugs();
        fetchBugs();
        fetchResults();
    } else {
        alertBug.innerHTML = 'Por favor, rellena todos los campos'
    };
};

addClick('add-bug', addBug);

//Conteo de Bugs

//Contabiliza los bugs abiertos
const fetchTotalBugs = () => {
    document.getElementById('open-bugs').innerHTML = bugsToRender.length;
    const abiertos = document.getElementById('abiertos');
    bugsToRender.length > 1 ? abiertos.innerHTML = 'Bugs abiertos' : abiertos.innerHTML = 'Bug abierto';
};

//Contabiliza los bugs resueltos
const fetchClosedBugs = () => {
    renderArray('closed-bugs', closed);
    const resueltos = document.getElementById('resueltos');
    closed.length > 1 ? resueltos.innerHTML = 'Bugs resueltos' : resueltos.innerHTML = 'Bug resuelto';

};

//Contabiliza los bugs urgentes
const fetchUrgentBugs = () => {
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

const fetchResults = () => {
    fetchTotalBugs();
    fetchClosedBugs();
    fetchUrgentBugs();
    fetchDueTomorrow();
    fetchSevenDays();
}

//Filtrado de Bugs cuando doy click
const renderBugs = (array) => {
    bugTable.innerHTML = '';

    array.forEach((bug) => {
        bugTable.innerHTML += `<tr>
            <td class="bug-name">${bug.name}</td>
            <td class="status">
                <div class="estado ${bug.status}">${bug.status}</div>
            </td>
            <td class="date">${new Date(bug.due).toLocaleDateString()}</td>
            <td class="responsable">${bug.responsible}</td>
            </tr>
            `
    })
}

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
    elements.forEach(element => element.classList.toggle('project-selected'));

    const projectClicked = event.target.id;
    event.target.classList.add('project-selected')
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

}
document.getElementById('project-list').addEventListener('click', getProject);



//Abrir modal bug
const openModalBug = () => {
    modalBug.classList.add('active');
}
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

const toggleIcon = (icon, class1, class2) => {
    icon.classList.remove(class1);
    icon.classList.add(class2);
};

const sortDate = (orden) => {
    const sortedBugs = Object.assign([], bugsToRender);

    if (orden === 1) {
        const sortedBugs1 = sortedBugs.sort((a, b) => new Date(a.due).toLocaleDateString() - new Date(b.due).toLocaleDateString());
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

//Dependiendo el estado de sortBtn, filtra con los dos métodos y/o vuelve al default
sortBtn.onclick = () => {
    sortDate(statusDate);
};

//-------------------------------------------------------------

//Editando los bugs

//Editar status
const editStatus = (id) => {
    openModal('modal-status');
    let newStatus = document.getElementById('new-status').value;

    document.getElementById('')


    bugsToRender.forEach((bug) => {
        if (bug.id === id) {
            bug.status = newStatus;
        };
    })

    fetchBugs();
}