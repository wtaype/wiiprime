import $ from 'jquery';
import { rutas } from './rutas.js';
import { wiSmart, getls, Mensaje } from './widev.js'; 

// 🎯 REGISTRAR TODAS LAS RUTAS
const pages = ['hora', 'asia', 'europa', 'america', 'oceania', 'africa', 'labs'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./pages/${pg}.js`))); 

// 🔐 Ruta privada con guard inteligente
rutas.register('/smile', () => getls('wiSmile') ? (import('./smile/smile.js')) 
  : (import('./smile/descubre.js')));

// 🚀 Inicializar rutas PRIMERO (crítico para LCP)
rutas.init();

// ⚡ Cargar recursos secundarios en paralelo después del init
Promise.all([
  import('./header.js'),
  wiSmart({js: [() => import('./footer.js')]})
]);