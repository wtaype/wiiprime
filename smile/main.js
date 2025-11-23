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
rutas.register('/calendario', () => import('./pages/calendario.js'));
rutas.register('/calculadora', () => import('./pages/calculadora.js'));
rutas.register('/cronometro', () => import('./pages/cronometro.js'));

// =============================================
// INICIALIZACIÓN INMEDIATA
// =============================================

// Inicializar rutas inmediatamente (no esperar a document.ready)
rutas.init();

console.log('🚀 Sistema SPA inicializado');
console.log('📍 Rutas disponibles:', Object.keys(rutas.ruta));



