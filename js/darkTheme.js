import {addClick, addDark, removeDark} from './higherOrderFunctions.js';

let theme = JSON.parse(localStorage.getItem('theme'));

window.addEventListener('DOMContentLoaded', e => {
    getTheme();
    console.log(theme);
});


const getTheme = () => {
    if (theme == false) {
        document.body.classList.add('dark');
        let dates = document.querySelectorAll('.date');
        let responsibles = document.querySelectorAll('.responsable');
        dates.forEach(date => { date.classList.add('dark') })
        responsibles.forEach(responsible => { responsible.classList.add('dark') })
        document.querySelector('header').classList.add('dark');
        addDark('sidebar');
        addDark('open-btn')
        addDark('title');
        addDark('thead');
        addDark('bug-table');
        addDark('resize');

    } else {
        document.body.classList.remove('dark');
        let dates = document.querySelectorAll('.date');
        let responsibles = document.querySelectorAll('.responsable');
        dates.forEach(date => { date.classList.remove('dark') })
        responsibles.forEach(responsible => { responsible.classList.remove('dark') })
        document.querySelector('header').classList.remove('dark');
        removeDark('sidebar');
        removeDark('open-btn');
        removeDark('title');
        removeDark('thead');
        removeDark('bug-table');
        removeDark('resize');
    }
};

const checkbox = document.getElementById('switch-theme').value;

addClick('switch-theme', () => {
    theme = !theme;
    localStorage.setItem('theme', theme);
    getTheme();
});