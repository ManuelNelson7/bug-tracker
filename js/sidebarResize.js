import { toggleSize, addClick } from "./higherOrderFunctions.js";
import { searchInput } from "./constants.js";

let statusBar = true;

//Toggles between the 2 sizes of the sidebar
const resizeSidebar = () => {
    toggleSize('#sidebar');
    toggleSize('.sidebar-container');
    toggleSize('#logo-mobile');
    toggleSize('.switch-container');
    toggleSize('main');
    toggleSize('header');
    toggleSize('#header-container');

    //Makes the arrow icon turn to left or right
    if (statusBar) {
        document.getElementById('icon-resize').classList.remove('fa-chevron-left');
        document.getElementById('icon-resize').classList.add('fa-chevron-right');
        statusBar = !statusBar
    } else {
        document.getElementById('icon-resize').classList.remove('fa-chevron-right');
        document.getElementById('icon-resize').classList.add('fa-chevron-left');
        statusBar = !statusBar

    }
};

addClick('resize', resizeSidebar);

// Resizes the sidebar to the original size and focus on the searchbar
// when the user clicks on the search icon
addClick('search-mobile', () => {
    resizeSidebar();
    searchInput.focus()
});