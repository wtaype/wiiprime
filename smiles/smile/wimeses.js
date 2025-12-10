import $ from 'jquery';
import { smile } from './smile.js';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { getls, savels, Notificacion, wiSpin, getbd, savebd } from '../widev.js';
import { 
  renderTabla,
  abrirModalVer,
  abrirModalEditar,
  obtenerDatos,
  validarDatos,
  ordenarNotas
} from './devmeses.js';

// COLORES DE CATEGORÍAS V8.1
const categoriasColores = {
  cumpleanos: '#FF5C69',
  trabajo: '#0EBEFF',
  personal: '#29C72E',
  otros: '#ffa726'
};

// FORMATO DE FECHAS V8.1
export const wiDate = {
  toISO: (timestamp) => {
    if (!timestamp) return new Date().toISOString().split('T')[0];
    const d = timestamp.toDate?.() || new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },
  toTimestamp: (dateString) => savebd(dateString, Timestamp),
  toLocal: (timestamp) => getbd(timestamp),
  ahora: () => Timestamp.now()
};

let notas = [];
let calendar = null;

// HTML BASE V8.1
const htmlBase = (data) => `
  <div class="wmPrincipal">
    <div class="wm_card glass-card">
      <div class="wm_header">
        <h3><i class="fas fa-calendar-alt"></i> Calendario</h3>
        <button class="btn btnNuevaNota">
          <i class="fas fa-plus"></i> Nueva Nota
        </button>
      </div>
      <div id="calendar"></div>
    </div>
  </div>
  <div class="wmNotas">
    <div class="wm_card glass-card">
      <div class="wm_header">
        <h3><i class="fas fa-sticky-note"></i> Mis Notas</h3>
      </div>
      <div class="wm_contenido">${renderTabla(data, categoriasColores)}</div>
    </div>
  </div>
`;

// CARGAR DATOS V8.1
async function cargarNotas() {
  const cached = getls('wiMeses');
  if (cached) return cached;
  
  const snap = await getDocs(query(collection(db, 'wiMeses'), where('email', '==', smile.email)));
  const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const ordenados = ordenarNotas(data);
  savels('wiMeses', ordenados, 24);
  return ordenados;
}

// CONVERTIR NOTA A EVENTO V8.1
const notaAEvento = (nota) => ({
  id: nota.id,
  title: nota.titulo,
  start: nota.fechaCreado.toDate?.() || new Date(nota.fechaCreado),
  backgroundColor: categoriasColores[nota.categoria],
  borderColor: categoriasColores[nota.categoria],
  extendedProps: { nota }
});

// INICIAR CALENDARIO V8.1
function iniciarCalendario() {
  if (!$('#calendar').length || calendar) return;
  
  calendar = new Calendar($('#calendar')[0], {
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    firstDay: 1,
    initialView: 'dayGridMonth',
    headerToolbar: { left: 'prev,next', center: 'title', right: 'today' },
    buttonText: { today: 'Hoy' },
    height: 'auto',
    displayEventTime: false,
    dateClick: (info) => abrirModalEditar(categoriasColores, info.dateStr),
    eventClick: (info) => abrirModalEditar(categoriasColores, null, info.event.extendedProps.nota),
    eventContent: (arg) => ({ 
      html: `<div class="wm-evento-punto" style="background-color: ${arg.event.backgroundColor};"></div>` 
    }),
    events: notas.map(notaAEvento)
  });
  
  calendar.render();
}

// ACTUALIZAR EVENTOS V8.1
const actualizarEventos = () => {
  if (!calendar) return;
  calendar.removeAllEvents();
  calendar.addEventSource(notas.map(notaAEvento));
};

// ACTUALIZAR VISTA V8.1
const actualizarVista = () => {
  $('.wm_contenido').html(renderTabla(notas, categoriasColores));
  actualizarEventos();
};

// GUARDAR NOTA V8.1
async function guardarNota($btn) {
  const datos = obtenerDatos();
  const validacion = validarDatos(datos);
  
  if (!validacion.valido) return Notificacion(validacion.mensaje, 'warning');

  wiSpin($btn, true);

  try {
    const notaExistente = notas.find(n => n.id === datos.id);
    
    const notaData = {
      id: datos.id,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      categoria: datos.categoria,
      hora: datos.hora,
      fechaCreado: wiDate.toTimestamp(datos.fecha),
      usuario: smile.usuario,
      email: smile.email,
      creadoEn: notaExistente?.creadoEn || serverTimestamp(),
      actualizadoEn: serverTimestamp()
    };

    await setDoc(doc(db, 'wiMeses', datos.id), notaData);

    notas = notaExistente
      ? notas.map(n => n.id === datos.id ? notaData : n)
      : [notaData, ...notas];

    notas = ordenarNotas(notas);
    savels('wiMeses', notas, 24);

    actualizarVista();
    wiSpin($btn, false);
    $('#mdNota').remove();
    $('body').removeClass('modal-open');
    Notificacion(notaExistente ? 'Nota actualizada' : 'Nota creada', 'success');

  } catch (error) {
    wiSpin($btn, false);
    console.error('Error al guardar:', error);
    Notificacion('Error al guardar la nota', 'error');
  }
}

// ELIMINAR NOTA V8.1
async function eliminarNota($btn) {
  if (!confirm('¿Estás seguro de eliminar esta nota?')) return;

  const id = $btn.data('id');
  wiSpin($btn, true);

  try {
    await deleteDoc(doc(db, 'wiMeses', id));

    notas = notas.filter(n => n.id !== id);
    savels('wiMeses', notas, 24);

    $btn.closest('tr').fadeOut(300, function() {
      $(this).remove();
      if (!notas.length) actualizarVista();
    });

    actualizarEventos();
    Notificacion('Nota eliminada', 'success');

  } catch (error) {
    wiSpin($btn, false);
    console.error('Error al eliminar:', error);
    Notificacion('Error al eliminar la nota', 'error');
  }
}

// MÓDULO PRINCIPAL V8.1
export const wiMeses = async () => {
  notas = await cargarNotas();
  
  $('.wiMeses').html(htmlBase(notas));
  iniciarCalendario();

  $(document)
    .off('.wm')
    .on('click.wm', '.btnNuevaNota', () => abrirModalEditar(categoriasColores))
    .on('click.wm', '.wm_btn_ver', function() {
      const nota = notas.find(n => n.id === $(this).data('id'));
      if (nota) abrirModalVer(nota, categoriasColores);
    })
    .on('click.wm', '.wm_btn_editar', function() {
      const nota = notas.find(n => n.id === $(this).data('id'));
      if (nota) abrirModalEditar(categoriasColores, null, nota);
    })
    .on('click.wm', '.wm_guardar', function() {
      guardarNota($(this));
    })
    .on('click.wm', '.wm_btn_eliminar', function() {
      eliminarNota($(this));
    });
};

// CLEANUP V8.1
export const cleanup = () => {
  if (calendar) { calendar.destroy(); calendar = null; }
  $(document).off('.wm');
  $('body').removeClass('modal-open');
  console.log('🗓️ wiMeses limpiado');
};