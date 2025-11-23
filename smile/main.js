import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { wiTema, Notificacion } from './widev.js';
import { rutas } from './rutas.js';
import './header.js';
import './footer.js';


// =============================================
// CONFIGURACIÓN DEL rutas SPA
// =============================================

// ✅ REGISTRAR RUTAS CON LAZY LOADING
rutas.register('/hora', () => import('./pages/hora.js'));
rutas.register('/asia', () => import('./pages/asia.js'));
rutas.register('/europa', () => import('./pages/europa.js'));
rutas.register('/america', () => import('./pages/america.js'));
rutas.register('/oceania', () => import('./pages/oceania.js'));
rutas.register('/africa', () => import('./pages/africa.js'));


// =============================================
// INICIALIZACIÓN INMEDIATA
// =============================================

// Inicializar rutas inmediatamente (no esperar a document.ready)
rutas.init();

console.log('🚀 Sistema SPA inicializado');
console.log('📍 Rutas disponibles:', Object.keys(rutas.ruta));


 