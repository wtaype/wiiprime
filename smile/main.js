import $ from 'jquery';
import { rutas } from './rutas.js';
import { wiSmart } from './widev.js';
import('./header.js');

// VELOCIDAD INSTANTANEA ⚡⚡⚡
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'local', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); rutas.init();

wiSmart(() => import('./footer.js'), 'footer'); 
console.log('🚀 WEB CENTER GOOD ');