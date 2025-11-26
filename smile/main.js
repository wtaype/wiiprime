import $ from 'jquery';
import { rutas } from './rutas.js';
import('./header.js');
import { wiSmart } from './wii.js';

//  ⚡⚡⚡ GRACIAS DIOS POR TODO! 
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'local', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); rutas.init();

// ⚡ CARGA INTELIGENTE
wiSmart({
  css: [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css',
  ],
  js: ['./footer.js']
});