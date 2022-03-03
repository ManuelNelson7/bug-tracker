import { toggleSize, addClick } from "./higherOrderFunctions.js";

let statusBar = true;

const resizeSidebar = () => {
    toggleSize('#sidebar');
    toggleSize('.sidebar-container');
    toggleSize('#logo-mobile');
    toggleSize('.switch-container');
    toggleSize('main');
    toggleSize('header');
    toggleSize('#header-container');
    
    if (statusBar) {
        document.getElementById('icon-resize').classList.remove('fa-chevron-left');
        document.getElementById('icon-resize').classList.add('fa-chevron-right');
        statusBar = !statusBar
    } else {
        document.getElementById('icon-resize').classList.remove('fa-chevron-right');
        document.getElementById('icon-resize').classList.add('fa-chevron-left');
        statusBar = !statusBar

    }
}

addClick('resize', resizeSidebar);
addClick('search-mobile', resizeSidebar);

if document.innerWidth < 780
document.innerWidth < 780 && resizeSidebar();