import $ from 'jquery';
import { rutas } from './rutas.js';
import { wiSmart, getls, Mensaje } from './widev.js'; 

// 🎯 REGISTRAR TODAS LAS RUTAS (públicas + privada)
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); 

// 🔐 Ruta privada con guard inteligente
rutas.register('/smile', () => getls('wiSmile') ? (import('./pages/smile.js')) 
  : (import('./pages/descubre.js')));

import('./header.js'); // ⚡ Cargar header DESPUÉS del registro
rutas.init(); // 🚀 Inicializar UNA SOLA VEZ

wiSmart({
  css: [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css',
  ],
  js: [() => import('./footer.js')]
}); // ⚡ Carga inteligente de recursos