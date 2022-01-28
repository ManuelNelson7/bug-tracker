const projects = ['Bug Tracker', 'miTask'];
const bugs = [
    {
        name: "La aplicación no se conecta a una base de datos, por lo que tiene que ser hardcodeada",
        project: "Bug Tracker",
        status: "En proceso",
        due: "2022-01-30",
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
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        projectList.innerHTML += `<li class="project-item-list">${project}</li>`;
        projectOptions.innerHTML += `<option value="${project}">${project}</option>`
    }
};

// Fetch de los bugs para mostrarlos en la tabla
const fetchBugs = () => {
    const bugTable = document.getElementById('bug-table');
    bugTable.innerHTML = '';

    for (let i = 0; i < bugs.length; i++) {
        const bug = bugs[i];
        bugTable.innerHTML += `<tr>
            <td class="bug-name">${bug.name}</td>
            <td class="status">
                <div class="estado ${bug.status}">${bug.status}</div>
            </td>
            <td class="date">${bug.due}</td>
            <td class="responsable">${bug.responsible}</td>
        </tr>
        `
    }

    fetchTotalBugs();
};

// Fetch de todos los datos apenas se carga el body
const fetchData = () => {
    fetchBugs();
    fetchProjects();
};

// Añade un proyecto al array
// Lo ideal es que despliegue un modal, pero no sé hacerlo aún
const addProject = () => {
    let projectName = prompt('Nombre del proyecto');
    projects.push(projectName);
    console.log(projects);
    fetchProjects();
};

// Crea un Bug
const addBug = () => {
    const bugName = document.getElementById('bug-name').value;
    const bugProject = document.getElementById('projects-options').value;
    const bugStatus = document.getElementById('status').value;
    const bugDue = document.getElementById('due').value;
    const bugResponsible = document.getElementById('responsible').value;

    //Si los campos están llenos, crea un nuevo Bug y lo añade al array
    if (bugName && bugProject && bugStatus && bugDue && bugResponsible) {
        const newBug = new Bug(bugName, bugProject, bugStatus, bugDue, bugResponsible);
        bugs.push(newBug);
        document.getElementById('form-bug').reset();
    } else {
        alert('Rellena todos los campos!')
    };

    fetchBugs();
};

//Conteo de Bugs

//Contabiliza los bugs abiertos
const fetchTotalBugs = () => {
    document.getElementById('open-bugs').innerHTML = `<span id="open-bugs">${bugs.length}</span>`
    const abiertos = document.getElementById('abiertos')
    bugs.length > 1 ? abiertos.innerHTML = 'Bugs abiertos' : abiertos.innerHTML = 'Bug abierto'
};

// Todavía no sé cómo filtrar el resto de bugs (resueltos, urgentes, con fecha, etc)
