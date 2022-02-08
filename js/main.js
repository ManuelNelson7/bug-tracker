const projects = ['Bug Tracker', 'miTask'];
const bugs = [
    {
        name: "La aplicación no se conecta a una base de datos, por lo que tiene que ser hardcodeada",
        project: "Bug Tracker",
        status: "En proceso",
        due: "17/12/2021",
        responsible: "Manuel Nelson"
    },
    {
        name: "La aplicación no es responsive",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "2022-01-31",
        responsible: "Manuel Nelson"
    },
    {
        name: "Todavía no hay modals para agregar un bug, sacar cuanto antes el form del sidebar",
        project: "Bug Tracker",
        status: "Pendiente",
        due: "2022-01-31",
        responsible: "Manuel Nelson"
    },
    {
        name: "Crear layout y hardcodear, para probar UI",
        project: "Bug Tracker",
        status: "Resuelto",
        due: "2022-01-28",
        responsible: "Manuel Nelson"
    },
    {
        name: "Entregar proyecto final",
        project: "miTask",
        status: "Urgente",
        due: "2022-01-31",
        responsible: "Manuel Nelson"
    }
];
const closed = bugs.filter((bug) => bug.status === 'Resuelto');
const urgents = bugs.filter((bug) => bug.status === 'Urgente');

const modalBug = document.getElementById('bug-modal');

class Bug {
    constructor(name, project, status, due, responsible) {
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
    projects.forEach((project) => {
        projectList.innerHTML += `<li class="project-item-list">${project}</li>`;
        projectOptions.innerHTML += `<option value="${project}">${project}</option>`
    })
};

// Fetch de los bugs para mostrarlos en la tabla
const fetchBugs = () => {
    const bugTable = document.getElementById('bug-table');
    bugTable.innerHTML = '';

    bugs.forEach((bug) => {
        bugTable.innerHTML += `<tr>
        <td class="bug-name">${bug.name}</td>
        <td class="status">
            <div class="estado ${bug.status}">${bug.status}</div>
        </td>
        <td class="date">${bug.due}</td>
        <td class="responsable">${bug.responsible}</td>
        </tr>
        `
    })
    fetchResults();
};

// Fetch de todos los datos apenas se carga el body
const fetchData = () => {
    fetchBugs();
    fetchProjects();
};

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

// Crea un Bug
const addBug = () => {
    const bugName = document.getElementById('bug-name').value;
    const bugProject = document.getElementById('projects-options').value;
    const bugStatus = document.getElementById('status').value;
    const bugDue = new Date(document.getElementById('due').value);
    const bugResponsible = document.getElementById('responsible').value;
    const alertBug = document.getElementById('alertBug');

    //Si los campos están llenos, crea un nuevo Bug y lo añade al array
    if (bugName && bugProject && bugStatus && bugDue && bugResponsible) {
        const newBug = new Bug(bugName, bugProject, bugStatus, bugDue, bugResponsible);
        bugs.push(newBug);
        document.getElementById('form-bug').reset();
        cancelBug();
        fetchBugs();
        fetchResults();
    } else {
        alertBug.innerHTML = 'Por favor, rellena todos los campos'
    };

};

//Conteo de Bugs

//Contabiliza los bugs abiertos
const fetchTotalBugs = () => {
    document.getElementById('open-bugs').innerHTML = bugs.length;
    const abiertos = document.getElementById('abiertos');
    bugs.length > 1 ? abiertos.innerHTML = 'Bugs abiertos' : abiertos.innerHTML = 'Bug abierto';
};

//Contabiliza los bugs resueltos
const fetchClosedBugs = () => {
    document.getElementById('closed-bugs').innerHTML = "";
    document.getElementById('closed-bugs').innerHTML = closed.length;
    const resueltos = document.getElementById('resueltos');
    closed.length > 1 ? resueltos.innerHTML = 'Bugs resueltos' : resueltos.innerHTML = 'Bug resuelto';

};

//Contabiliza los bugs urgentes
const fetchUrgentBugs = () => {
    document.getElementById('urgent-bugs').innerHTML = urgents.length;
    const urgentes = document.getElementById('urgentes');
    urgents.length > 1 ? urgentes.innerHTML = 'Urgentes' : urgentes.innerHTML = 'Urgente';
};

const fetchResults = () => {
    fetchTotalBugs();
    fetchClosedBugs();
    fetchUrgentBugs();
}

//Filtrado de Bugs cuando doy click
const filterBugs = (array) => {
    const bugTable = document.getElementById('bug-table');
    bugTable.innerHTML = '';

    array.forEach((bug) => {
        bugTable.innerHTML += `<tr>
            <td class="bug-name">${bug.name}</td>
            <td class="status">
                <div class="estado ${bug.status}">${bug.status}</div>
            </td>
            <td class="date">${bug.due}</td>
            <td class="responsable">${bug.responsible}</td>
            </tr>
            `
    })
}

const filterClosed = () => filterBugs(closed);
const filterUrgents = () => filterBugs(urgents)


//Abrir y cerrar modales
const openBug = () => {
    modalBug.classList.add('active');
}
const cancelBug = () => {
    modalBug.classList.remove('active');
}