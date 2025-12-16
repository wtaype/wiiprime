import $ from 'jquery';
import { smile } from './smile.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase/init.js';
import { collection, query, where, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot, Timestamp, serverTimestamp } from 'firebase/firestore';
import { getls, savels, removels, Notificacion, abrirModal, wiDate, cerrarTodos, Mensaje } from '../widev.js';
import { wiSpin } from './devmeses.js';

let calendar = null;
let notas = [];
let fechadb = wiDate(Timestamp);
const categorias = { 'Notas': '#FFC400', 'cumpleaños': '#FFD54F', 'trabajo': '#0EBEFF', 'otro': '#3F51B5' };

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
      headerToolbar: {left: 'prev,next', center: 'title',  right: 'today'},
      buttonText: {today: 'Hoy'},
      height: 'auto',
      dateClick: (info) => modalNotas(info.dateStr)

    });calendar.render();
  }
  cargarNotas(); // Cargar notas

};

// 📅 MODAL NOTAS
const modalNotas = (fecha = null, notaId = null, soloVer = false) => {
  const nota = notaId ? notas.find(nt => nt.id === notaId) : null;
  const esEdicion = !!nota && !soloVer;
  const fechabd = nota ? fechadb.get(nota.fechaCreado, 'full') : (fecha ? `${fecha}T${new Date().toTimeString().slice(0, 5)}` : fechadb.get(Timestamp.now(), 'full'));
  
  const html = `<div id="mdNota" class="wiModal">
    <div class="modalBody">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <div class="modal_hd">
        <h3><i class="fas fa-${soloVer ? 'eye' : esEdicion ? 'edit' : 'sticky-note'}"></i> ${soloVer ? 'Ver' : esEdicion ? 'Editar' : 'Nueva'} Nota</h3>
      </div>
      <div class="modal_body">
        <div class="form_grp">
          <label><i class="fas fa-heading"></i> Título *</label>
          <input type="text" class="md-titulo" value="${nota?.titulo || ''}" placeholder="Título de la nota" ${soloVer ? 'disabled' : 'required'}>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea class="md-descripcion" placeholder="Descripción opcional" rows="3" ${soloVer ? 'disabled' : ''}>${nota?.descripcion || ''}</textarea>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-calendar"></i> Fecha *</label>
          <input type="datetime-local" class="md-fecha" value="${fechabd}" ${soloVer ? 'disabled' : 'required'}>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-tag"></i> Categoría *</label>
          <div class="cat_grid ${soloVer ? 'disabled' : ''}">
            ${Object.entries(categorias).map(([cat, color], ind) => `
              <label class="cat_opt ${(nota?.categoria === cat || (!nota && ind === 0)) ? 'active' : ''}">
                <input type="radio" name="categoria" value="${cat}" ${(nota?.categoria === cat || (!nota && ind === 0)) ? 'checked' : ''} ${soloVer ? 'disabled' : ''}>
                <span class="cat_ico" style="background:${color}"></span>
                <span class="cat_txt">${cat}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="modal_ftr">
        ${soloVer ? 
          `<button class="btn_pri wm_editar_modal" data-id="${notaId}"><i class="fas fa-edit"></i> Editar</button>` :
          `<button class="btn_pri wm_guardar" data-id="${notaId || ''}">${esEdicion ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-plus"></i> Guardar'}</button>`
        }
      </div>
    </div>
  </div>`;
  
  $('#mdNota').remove(); $('body').append(html); abrirModal('mdNota');
  if (!soloVer) $('#mdNota .md-titulo').focus();
  
  if (!soloVer) {
    $('#mdNota .cat_opt').on('click', function() {
      $('#mdNota .cat_opt').removeClass('active').find('input').prop('checked', false);
      $(this).addClass('active').find('input').prop('checked', true);
    });
  }
  
  $('#mdNota .wm_editar_modal').on('click', function(){
    cerrarTodos(); modalNotas(null, $(this).data('id'));
  });
};

// VER Y EDITAR NOTAS
$(document).on('click', '.wm_btn_ver', function(){
  modalNotas(null, $(this).data('id'), true);
});

$(document).on('click', '.wm_btn_editar', function(){
  modalNotas(null, $(this).data('id'));
});

// PARA GUARDAR NOTA 
$(document).on('click', '.wm_guardar', async function(){
  const titulo = $('#mdNota .md-titulo').val().trim();
  const descripcion = $('#mdNota .md-descripcion').val().trim();
  const fecha = $('#mdNota .md-fecha').val();
  const categoria = $('#mdNota input[name="categoria"]:checked').val();
  const id = $(this).data('id');

  if (!titulo || !fecha || !categoria) return Notificacion('Completa los campos requeridos');
  
  try {
    wiSpin(this, true);
    const datos = {titulo, descripcion, categoria, fechaCreado: fechadb.save(fecha), usuario:smile.usuario, email:smile.email};
    
    id ? await updateDoc(doc(db, 'wiNotas', id), {...datos, actualizadoEn: serverTimestamp()}) : 
    await setDoc(doc(db, 'wiNotas', `nota_${Date.now()}`), {...datos, creadoEn: serverTimestamp()});
    
    removels('wiNotas'); Notificacion(`Nota ${id ? 'actualizada' : 'guardada'} correctamente`, 'success');
  } catch (e) { console.error(e); Notificacion('Error al guardar'); }
  finally { cerrarTodos(); wiSpin(this, false); }
});

// CARGAR LAS NOTAS
const cargarNotas = () => {
  const cache = getls('wiNotas');
  if (cache) { notas = cache; renderNotas(); mostrarPuntos(); }
  
  onSnapshot(query(collection(db, 'wiNotas'), where('email', '==', smile.email)), (snap) => {
    notas = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((nx, pv) => 
      new Date(fechadb.get(nx.fechaCreado, 'full')) - new Date(fechadb.get(pv.fechaCreado, 'full')));
    savels('wiNotas', notas);
    renderNotas(); mostrarPuntos();
  },(e) => { console.error(e); Notificacion('Cargando desde caché'); });
};

// MOSTRAR PUNTOS EN EL CALENDARIO
const mostrarPuntos = () => {
  if (!calendar || !notas.length) return; // Verificar calendario y notas
  calendar.removeAllEvents(); // Limpiar eventos previos
  
  notas.forEach(nt => {
    calendar.addEvent({
      id: nt.id,
      title: '',
      start: fechadb.get(nt.fechaCreado, 'full'),
      backgroundColor: categorias[nt.categoria],
      borderColor: categorias[nt.categoria],
      extendedProps: {
        descripcion: nt.descripcion,
        categoria: nt.categoria
      }
    });
  });
  calendar.on('eventClick', (info) => {modalNotas(null, info.event.id); });
};

const renderNotas = () => {
  if (!notas.length) return $('.wm_contenido').html('<div class="wm_empty"><i class="fas fa-calendar-times"></i><p>No hay notas</p></div>');
  
  $('.wm_contenido').html(`<div class="wm_tabla_container"><table class="wm_tabla">
    <thead><tr>${['#', 'Fecha', 'Descripción', 'Categoría', 'Acciones'].map(enc => `<th>${enc}</th>`).join('')}</tr></thead>
    <tbody>${notas.map((nt, nm) => `<tr data-id="${nt.id}">
      <td data-label="#">${nm + 1}</td>
      <td data-label="Fecha">${fechadb.get(nt.fechaCreado)}</td>
      <td data-label="Descripción"><div class="wm_desc_corta">${nt.titulo}${nt.descripcion ? `<br><small>${nt.descripcion}</small>` : ''}</div></td>
      <td data-label="Categoría"><span class="wm_cat_badge" style="background:${categorias[nt.categoria]}">${nt.categoria}</span></td>
      <td data-label="Acciones"><div class="wm_acciones">
        ${[{cls:'ver',ico:'eye',txt:'Ver'},{cls:'editar',ico:'edit',txt:'Editar'},{cls:'eliminar',ico:'trash-alt',txt:'Eliminar'}].map(btn => 
          `<button class="wm_btn_accion wm_btn_${btn.cls}" data-id="${nt.id}" title="${btn.txt}"><i class="fas fa-${btn.ico}"></i></button>`
        ).join('')}
      </div></td>
    </tr>`).join('')}</tbody>
  </table></div>`);
};

// AGREGAR NOTA
$(document).on('click', '.btnNuevaNota', () => modalNotas());

// ELIMINAR NOTA
$(document).on('click', '.wm_btn_eliminar', async function(){
  if (!confirm('¿Eliminar nota?')) return;
  const id = $(this).data('id');
  try {
    await deleteDoc(doc(db, 'wiNotas', id));
    calendar?.getEventById(id)?.remove();
    removels('wiNotas'); Notificacion('Nota eliminada', 'success');
  } catch (e) {console.error(e); Notificacion('Error al eliminar'); }
});


export const cleanup = () => {
  calendar?.destroy();
  calendar = null;
  $(document).off('click', '.wm_btn_ver .wm_btn_editar .wm_guardar .btnNuevaNota .wm_btn_eliminar .wm_editar_modal');
  $('#mdNota').remove();
  notas = [];
};