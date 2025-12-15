import $ from 'jquery';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase/init.js';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot, Timestamp, serverTimestamp } from 'firebase/firestore';
import { getls, savels, Notificacion, abrirModal, wiDate } from '../widev.js';
import { wiSpin } from './devmeses.js';

let calendar = null;
let notas = [];
let fechadb = wiDate(Timestamp);
const categorias = { 'cumpleaños': '#FF5C69', 'trabajo': '#0EBEFF', 'personal': '#29C72E', 'otros': '#ffa726' };

// 🚀 MÓDULO PRINCIPAL
export const wiMeses = () => {
  $('.wiMeses').html(`
 <div class="wmPrincipal">
    <div class="wm_card glass-card">
      <div class="wm_header">
        <h3><i class="fas fa-calendar-alt"></i> Calendario</h3>
        <button class="btn btnNuevaNota"><i class="fas fa-plus"></i> Nueva Nota</button>
      </div>
      <div id="calendar"></div>
    </div>
  </div>
  <div class="wmNotas">
    <div class="wm_card glass-card">
      <div class="wm_header"><h3><i class="fas fa-sticky-note"></i> Mis Notas</h3></div>
      <div class="wm_contenido"></div>
    </div>
  </div>  
  `);

  // 📅 INICIAR CALENDARIO
  if ($('#calendar').length && !calendar) {
    calendar = new Calendar($('#calendar')[0], {
      plugins: [dayGridPlugin, interactionPlugin],
      locale: esLocale,
      firstDay: 1,
      initialView: 'dayGridMonth',
      headerToolbar: {left: 'prev,next', center: '',  right: 'today'},
      buttonText: {today: 'Hoy'},
      height: 'auto',
      dateClick: (info) => modalNotas(info.dateStr)

    });calendar.render();
  }

// 📅 MODAL NOTAS
// 📅 MODAL NOTAS
const modalNotas = (fecha = null) => {
  const dt = wiDate(Timestamp);
  const fechabd = fecha ? `${fecha}T${new Date().toTimeString().split(' ')[0].substring(0, 5)}` : dt.get(Timestamp.now(), 'full');
  
  const html = `<div id="mdNota" class="wiModal">
    <div class="modalBody">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <div class="modal_hd">
        <h3><i class="fas fa-sticky-note"></i> Nueva Nota</h3>
      </div>
      <div class="modal_body">
        <div class="form_grp">
          <label><i class="fas fa-heading"></i> Título *</label>
          <input type="text" class="md-titulo" placeholder="Título de la nota" required>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea class="md-descripcion" placeholder="Descripción opcional" rows="3"></textarea>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-calendar"></i> Fecha Seleccionada *</label>
          <input type="datetime-local" class="md-fecha" value="${fechabd}" required>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-tag"></i> Categoría *</label>
          <div class="cat_grid">
            ${Object.entries(categorias).map(([cat, color], index) => `
              <label class="cat_opt ${index === 0 ? 'active' : ''}">
                <input type="radio" name="categoria" value="${cat}" ${index === 0 ? 'checked' : ''}>
                <span class="cat_ico" style="background:${color}"></span>
                <span class="cat_txt">${cat}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="modal_ftr">
        <button class="btn_sec wm_cerrar"><i class="fas fa-times"></i> Cancelar</button>
        <button class="btn_pri wm_guardar"><i class="fas fa-save"></i> Guardar</button>
      </div>
    </div>
  </div>`;
  
  $('#mdNota').remove(); $('body').append(html); abrirModal('mdNota'); //Limpiar y agregar modal
  setTimeout(() => $('#mdNota .md-titulo').focus(), 100); //Auto focus
  
  $('#mdNota .cat_opt').on('click', function() {
    $('#mdNota .cat_opt').removeClass('active').find('input').prop('checked', false);
    $(this).addClass('active').find('input').prop('checked', true);
  }); // Selección de categoría
  $('#mdNota .wm_cerrar, #mdNota .modalX').on('click', () => {$(this).remove()}); //Eliminar modal
  
  $('#mdNota .wm_guardar').on('click', guardarNotas); //Guardar notas
  
};

const guardarNotas = async () => {
  const titulo = $('#mdNota .md-titulo').val().trim();
  const descripcion = $('#mdNota .md-descripcion').val().trim();
  const fecha = $('#mdNota .md-fecha').val();
  const categoria = $('#mdNota input[name="categoria"]:checked').val();
  
  if (!titulo || !fecha || !categoria) return Notificacion('error', 'Completa los campos requeridos');
  
  try {
    wiSpin(this, true);
    await setDoc(doc(db, 'wifechas', `nota_${Date.now()}`), {
      titulo,
      descripcion,
      categoria,
      fechaCreado: fechadb.save(fecha),
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp()
    });
    
    localStorage.removeItem('wiFechas');
    Notificacion('success', 'Nota guardada correctamente');
    $('#mdNota').fadeOut(300, function() { $(this).remove(); });
  } catch (error) { console.error('Error:', error); Notificacion('error', 'Error al guardar'); }
  finally {wiSpin(this, false);}
};



};


// LIMPIEZA DEL CALENDARIOS
export const cleanup = () => {
  if (calendar) {
    calendar.destroy();
    calendar = null;
  }
  $(document).off('.wm');
  notas = [];
};