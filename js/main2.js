/*Lista de errores:

-Cuando agrego un nuevo bug, no se actualizan los cuadrados donde están los resultados, aunque llame
    a las funciones que los contabilizan cuando se agrega un bug.

-Cuando clickeo un proyecto para filtrar en el sidebar, se le añade la clase "project-selected", no sé
    cómo hacer para que se le retire cuando presiono otro proyecto que no sea ese.

-Cuando ordeno los bugs por fecha de entrega, funciona correctamente en los dos primeros casos, pero no
    cuando debe volver al ordenado "por default", haciendo el fetchBugs();

-Cómo podría hacer para que me contabilice los resultados y me ordene por fecha según el proyecto que
    clickee? Por ahora puedo filtrar los bugs por proyecto correctamente, pero cuando presiono en los
    cuadrados de resultados o en el sort por fecha, me filtra el array de bugs generales.

-Intenté hacer el localStorage con stringify del array de bugs directamente, pero sigo sin entender
    cómo almacenar los bugs de a uno cuando ejecuto la función addBug();

*/
const projects = ['Bug Tracker', 'miTask', 'Backend'];
const bugs = [
    {
        name: "La aplicación no se conecta a una base de datos, por lo que tiene que ser hardcodeada",
        project: "Bug Tracker",
        status: "En proceso",
        due: "January 30, 2022",
        responsible: "Manuel Nelson"
    },
    {
        name: "La aplicación no es responsive",
        project: "Bug Tracker",
        status: "Pendiente",
        due: new Date("February 02, 2022"),
        responsible: "Manuel Nelson"
    },
    {
        name: "Todavía no hay modals para agregar un bug, sacar cuanto antes el form del sidebar",
        project: "Bug Tracker",
        status: "Pendiente",
        due: new Date("February 12, 2022"),
        responsible: "Manuel Nelson"
    },
    {
        name: "Crear layout y hardcodear, para probar UI",
        project: "Bug Tracker",
        status: "Resuelto",
        due: new Date("February 10, 2022"),
        responsible: "Manuel Nelson"
    },
    {
        name: "Entregar proyecto final",
        project: "miTask",
        status: "Urgente",
        due: new Date("March 02, 2022"),
        responsible: "Manuel Nelson"
    }
];

// const bugsInteractivo 

// funciones
const filtrarBugs = (parametro) => {
    return bugs.filter((bug) => bug.status === parametro);
}


// const bugsJSON = JSON.stringify(bugs);
let closed = bugs.filter((bug) => bug.status === 'Resuelto');
let urgents = bugs.filter((bug) => bug.status === 'Urgente');

const modalBug = document.getElementById('bug-modal');
const bugTable = document.getElementById('bug-table');

const today = new Date("February 9, 2022");
const seconds = 86400000;

const tomorrow = bugs.filter((bug) => ((bug.due - today) / seconds) == 1);

//Pruebas de localStorage
// const saveLocal = (key, value) => { localStorage.setItem(key, value) };
// saveLocal("localBugs", JSON.stringify(bugs));

class Bug {
    constructor(name, project, status, due, responsible) {
        this.name = name;
        this.project = project;
        this.status = status;
        this.due = due;
        this.responsible = responsible;
    }
};

//Pruebas de localStorage
// const savedBugs = JSON.parse(localStorage.getItem('localBugs'));
// savedBugs.forEach((object) => {
//     bugs.push(new Bug(object));
// })


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

    const bugsLocalStorage = JSON.parse(localStorage.getItem('bugs'));
    let bugsParaPintar = [];

    if (bugsLocalStorage && bugsLocalStorage.length > 0) {
        bugsParaPintar = bugsLocalStorage;
    } else {
        bugsParaPintar = bugs;
    }

    bugsParaPintar.forEach((bug) => {
        bugTable.innerHTML += `<tr>
        <td class="bug-name">${bug.name}</td>
        <td class="status">
            <div class="estado ${bug.status}">${bug.status}</div>
        </td>
        <td class="date">${new Date(bug.due).toLocaleString()}</td>
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

        localStorage.setItem('bugs', JSON.stringify(bugs));

        document.getElementById('form-bug').reset();
        modalBug.classList.remove('active');
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
    const listaFiltrada = filtrarBugs('Urgente');
    document.getElementById('urgent-bugs').innerHTML = listaFiltrada.length;
    const urgentes = document.getElementById('urgentes');
    listaFiltrada.length > 1 ? urgentes.innerHTML = 'Urgentes' : urgentes.innerHTML = 'Urgente';
};

//Contabiliza los bugs para manana
//Error en esta funcion: cada vez que se ejecuta, concatena el valor con los anteriores, no se renueva.
const fetchDueTomorrow = () => {
    document.getElementById('tomorrow-bugs').innerHTML = '';
    document.getElementById('tomorrow-bugs').innerHTML = tomorrow.length;
}

const fetchResults = () => {
    fetchTotalBugs();
    fetchClosedBugs();
    fetchUrgentBugs();
    fetchDueTomorrow();
}

//Filtrado de Bugs cuando doy click
const filterBugs = (array) => {
    bugTable.innerHTML = '';

    array.forEach((bug) => {
        bugTable.innerHTML += `<tr>
            <td class="bug-name">${bug.name}</td>
            <td class="status">
                <div class="estado ${bug.status}">${bug.status}</div>
            </td>
            <td class="date">${bug.due.toLocaleDateString()}</td>
            <td class="responsable">${bug.responsible}</td>
            </tr>
            `
    })
}

const filterClosed = () => filterBugs(closed);
const filterUrgents = () => filterBugs(urgents)
const filterDueTomorrow = () => filterBugs(tomorrow)

//Filtra los bugs por proyecto
const getProject = (event) => {
    const elements = document.querySelectorAll('.project-selected'); // Array
    elements.forEach(element => element.classList.toggle('project-selected'));

    const projectClicked = event.target.id;
    event.target.classList.add('project-selected')
    const projectFiltered = bugs.filter((bug) => bug.project === `${projectClicked}`);
    const filterByProject = () => filterBugs(projectFiltered);

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
let openBtn = document.getElementById('open-btn');
openBtn.onclick = () => { openModalBug() };

//Cerrar modal bug
let cancelBtn = document.getElementById('cancel-btn');
cancelBtn.onclick = () => { modalBug.classList.remove('active') };


//Sort por fecha---------------------------------------------------
let sortBtn = document.getElementById('sort-date');
let statusDate = 3;

//Ordenar bugs por fecha (menor a mayor)
const sortDate1 = () => {
    const sortedBugs1 = bugs.sort((a, b) => a.due - b.due);
    filterBugs(sortedBugs1);
    statusDate = 1;
}

//Ordenar bugs por fecha (mayor a menor)
const sortDate2 = () => {
    const sortedBugs2 = bugs.sort((a, b) => b.due - a.due);
    filterBugs(sortedBugs2);
    statusDate = 2;
}

//Ordenar bugs por defecto (Éste no funciona, no recarga con el array original)
const sortDateOriginal = () => {
    fetchBugs();
    statusDate = 3;
}

//Dependiendo el estado de sortBtn, filtra con los dos métodos y/o vuelve al default
sortBtn.onclick = () => {
    switch (statusDate) {
        case 1:
            sortDate2();
            break;
        case 2:
            sortDateOriginal();
            break;
        case 3:
            sortDate1();
            break;
    }
    console.log(statusDate);
};

//-------------------------------------------------------------