import { bugsToRender, bugTable } from "./constants.js";
import { assignBtns } from "./app.js";

//Filters the bugs according to status
export const filterBugs = (status) => {
    return bugsToRender.filter((bug) => bug.status === status);
};

//Renders the length of the array inside of an element by id
export const renderArray = (id, array) => {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).innerHTML = array.length;
};

//Runs a function when the element(id) is clicked
export const addClick = (id, func) => {
    document.getElementById(id).addEventListener('click', func);
};

//Makes a modal visible
export const openModal = (modal) => {
    document.getElementById(modal).classList.add('active');
};

//Removes the previous class and adds the next one to an icon
export const toggleIcon = (icon, class1, class2) => {
    icon.classList.remove(class1);
    icon.classList.add(class2);
};

//Adds the class 'dark' to a node (by id)
export const addDark = (id) => {
    document.getElementById(id).classList.add('dark');
};

//Removes the class 'dark' to a node (by id)
export const removeDark = (id) => {
    document.getElementById(id).classList.remove('dark')
};

//Toggles between the class "min-sidebar" in a node (by query selector)
export const toggleSize = (query) => {
    document.querySelector(query).classList.toggle('min-sidebar');
}

//Renders the bugs of an array inside of the table
export const renderBugs = (array) => {
    bugTable.innerHTML = '';

    array.forEach((bug) => {
        bugTable.innerHTML += `<tr>
        <td class="bug-name">${bug.name}</td>
        <td class="status">
            <div id="${bug.id}" class="estado ${bug.status}">${bug.status}</div>
        </td>
        <td class="date">${new Date(bug.due).toLocaleDateString()}</td>
        <td class="responsable">${bug.responsible}</td>
        <td class='trash' id="${bug.id}"><i class="fas fa-trash"></i></td>
        </tr>
        `
    })
    assignBtns();
};