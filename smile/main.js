import $ from 'jquery';
import { rutas } from './rutas.js';
// import('./header.js');
import { wiSmart } from './wii.js';
wiSmart(() => import('@fortawesome/fontawesome-free/css/all.min.css'), 'Iconos');
wiSmart(() => import('./footer.js'), 'Footer', 500);

//  ⚡⚡⚡ GRACIAS DIOS POR TODO! 
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'local', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); rutas.init();
