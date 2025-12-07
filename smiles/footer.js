import $ from 'jquery';
import { wiSmart } from './widev.js';
import { auth } from '../firebase/init.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {app, lanzamiento, autor, link, version} from './wii.js';

export { auth, onAuthStateChanged, signOut };
export { footer };

function footer(){
  const ahora = new Date();
  return `
  <footer class="foo wb txc psa">
    <span>Creado con <i class="fas fa-heart"></i> by <a class="ftx lkme" href="${link}" target="_blank">${autor}</a></span>
    <span>${lanzamiento} - <span class="wty">${ahora.getFullYear()}</span>
    <span>| <a href="/terminos.html" target="_blank" rel="noopener noreferrer">Privicidad y Términos</a></span>
    <span class="abw"> | ${app} ${version} | actualizado:</span>
    <span class="wtu">${ahora.toLocaleString()}</span>
  </footer>
  `;
}; $('body').append(footer());  //Actualizar 

const mstyles = `
:root{--bgim:url("https://d35aaqx5ub95lt.cloudfront.net/images/star-pattern.svg")}.wicontainer{background: var(--bgim),linear-gradient(to bottom,var(--bg),var(--wb));}
`;$('head').append(`<style>${mstyles}</style> `);

// CARGA INTELIGENTE DE LOS CDNS 
wiSmart({
  css: [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css',
  ]
}); 