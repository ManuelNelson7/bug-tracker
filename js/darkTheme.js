let theme = JSON.parse(localStorage.getItem('theme'));

window.addEventListener('DOMContentLoaded', e => {
    getTheme();
});

//Adds the class 'dark' to a node (by id)
export const addDark = (query) => {
    document.querySelector(query).classList.add('dark');
};

//Removes the class 'dark' to a node (by id)
export const removeDark = (query) => {
    document.querySelector(query).classList.remove('dark')
};


export const getTheme = () => {
    if (theme == false) {
        let dates = document.querySelectorAll('.date');
        let responsibles = document.querySelectorAll('.responsable');
        dates.forEach(date => { date.classList.add('dark') })
        responsibles.forEach(responsible => { responsible.classList.add('dark') })
        document.querySelector('header').classList.add('dark');
        addDark('body');
        addDark('header');
        addDark('#sidebar');
        addDark('#open-btn')
        addDark('#title');
        addDark('#thead');
        addDark('#bug-table');
        addDark('#resize');
        addDark('.slider');
        addDark('.loading-container');

    } else {
        let dates = document.querySelectorAll('.date');
        let responsibles = document.querySelectorAll('.responsable');
        dates.forEach(date => { date.classList.remove('dark') })
        responsibles.forEach(responsible => { responsible.classList.remove('dark') })
        removeDark('body');
        removeDark('header');
        removeDark('#sidebar');
        removeDark('#open-btn')
        removeDark('#title');
        removeDark('#thead');
        removeDark('#bug-table');
        removeDark('#resize');
        removeDark('.slider');
        removeDark('.loading-container');
    }
};

document.getElementById('switch-theme').addEventListener('click', () => {
    theme = !theme;
    localStorage.setItem('theme', theme);
    getTheme();
});