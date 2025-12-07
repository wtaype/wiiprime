import $ from 'jquery';
import { rutas } from './rutas.js';
import { wiSmart, getls, Mensaje } from './widev.js'; 

// 🎯 REGISTRAR TODAS LAS RUTAS (públicas + privada)
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); 

// 🔐 Ruta privada con guard inteligente
rutas.register('/smile', () => getls('wiSmile') ? (import('./smile/smile.js')) 
  : (import('./smile/descubre.js')));

import('./header.js'); // ⚡ Cargar header DESPUÉS del registro
rutas.init(); // 🚀 Inicializar UNA SOLA VEZ

wiSmart({js: [() => import('./footer.js')]});