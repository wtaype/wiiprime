import $ from 'jquery';
import { abrirModal, cerrarTodos, getbd } from '../widev.js';

// FORMATEAR FECHA V8.1
const formatearFecha = (timestamp) => {
  if (!timestamp) return '';
  const d = timestamp.toDate?.() || new Date();
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

// FORMATEAR FECHA ISO V8.1
const formatearFechaISO = (timestamp) => {
  if (!timestamp) return new Date().toISOString().split('T')[0];
  const d = timestamp.toDate?.() || new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// RENDERIZAR TABLA DE NOTAS V8.1
export function renderTabla(notas, colores) {
  if (!notas.length) {
    return `
      <div class="wm_empty">
        <i class="far fa-folder-open"></i>
        <p>No hay notas todavía</p>
      </div>
    `;
  }

  return `
    <div class="wm_tabla_container">
      <table class="wm_tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>${renderFilas(notas, colores)}</tbody>
      </table>
    </div>
  `;
}

// RENDERIZAR FILAS DE LA TABLA V8.1
export function renderFilas(notas, colores) {
  return notas.map((nota, index) => `
    <tr data-id="${nota.id}">
      <td data-label="#">${index + 1}</td>
      <td data-label="Fecha">${formatearFecha(nota.fechaCreado)}</td>
      <td data-label="Descripción">
        <div class="wm_desc_corta" title="${nota.descripcion || ''}">
          ${nota.titulo}
          ${nota.descripcion ? `<br><small style="opacity: 0.7">${nota.descripcion}</small>` : ''}
        </div>
      </td>
      <td data-label="Categoría">
        <span class="wm_cat_badge" style="background: ${colores[nota.categoria]}">
          ${nota.categoria}
        </span>
      </td>
      <td data-label="Usuario">${nota.usuario || 'Anónimo'}</td>
      <td data-label="Acciones">
        <div class="wm_acciones">
          <button class="wm_btn_accion wm_btn_ver" data-id="${nota.id}" title="Ver">
            <i class="fas fa-eye"></i>
          </button>
          <button class="wm_btn_accion wm_btn_editar" data-id="${nota.id}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="wm_btn_accion wm_btn_eliminar" data-id="${nota.id}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// GENERAR GRID DE CATEGORÍAS V8.1
const categoriasGrid = (colores, seleccionada = 'otros', disabled = false) => 
  Object.entries(colores).map(([cat, color]) => `
    <label class="cat_opt ${seleccionada === cat ? 'active' : ''} ${disabled ? 'disabled' : ''}">
      <input 
        type="radio" 
        name="md-categoria" 
        value="${cat}" 
        ${seleccionada === cat ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      >
      <span class="cat_ico" style="background: ${color}"></span>
      <span class="cat_txt">${cat}</span>
    </label>
  `).join('');

// GENERAR MODAL BASE V8.1
const generarModal = (tipo, colores, nota = null, fecha = null) => {
  const esVer = tipo === 'ver';
  const fechaValor = fecha || (nota ? formatearFechaISO(nota.fechaCreado) : new Date().toISOString().split('T')[0]);
  const titulo = esVer ? 'Ver Nota' : (nota ? 'Editar Nota' : 'Nueva Nota');
  const icono = esVer ? 'eye' : 'sticky-note';
  
  return `
    <div id="mdNota" class="wiModal">
      <div class="modalBody">
        <button class="modalX" data-act="cerrar">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal_hd">
          <h3><i class="fas fa-${icono}"></i> ${titulo}</h3>
        </div>
        <div class="modal_body">
          <div class="form_grp">
            <label><i class="fas fa-heading"></i> Título ${esVer ? '' : '*'}</label>
            <input 
              type="text" 
              class="md-titulo" 
              placeholder="Título de la nota" 
              maxlength="100" 
              value="${nota?.titulo || ''}"
              ${esVer ? 'disabled' : 'required'}
            >
          </div>

          <div class="form_grp">
            <label><i class="fas fa-align-left"></i> Descripción</label>
            <textarea 
              class="md-descripcion" 
              placeholder="Descripción opcional" 
              maxlength="200" 
              rows="3"
              ${esVer ? 'disabled' : ''}
            >${nota?.descripcion || ''}</textarea>
            ${!esVer ? `<span class="char_count"><span class="md-count">${nota?.descripcion?.length || 0}</span>/200</span>` : ''}
          </div>

          <div class="form_row">
            <div class="form_grp">
              <label><i class="fas fa-calendar"></i> Fecha ${esVer ? '' : '*'}</label>
              <input 
                type="date" 
                class="md-fecha" 
                value="${fechaValor}"
                ${esVer ? 'disabled' : 'required'}
              >
            </div>
            <div class="form_grp">
              <label><i class="fas fa-clock"></i> Hora</label>
              <input 
                type="time" 
                class="md-hora" 
                value="${nota?.hora || '00:00'}"
                ${esVer ? 'disabled' : ''}
              >
            </div>
          </div>

          <div class="form_grp">
            <label><i class="fas fa-tag"></i> Categoría ${esVer ? '' : '*'}</label>
            <div class="cat_grid">
              ${categoriasGrid(colores, nota?.categoria || 'otros', esVer)}
            </div>
          </div>
        </div>

        <div class="modal_ftr">
          ${esVer 
            ? `<button class="btn_sec" data-act="cerrar" style="width: 100%"><i class="fas fa-times"></i> Cerrar</button>`
            : `<button class="btn_sec" data-act="cerrar"><i class="fas fa-times"></i> Cancelar</button>
               <button class="btn_pri wm_guardar" data-id="${nota?.id || ''}"><i class="fas fa-save"></i> Guardar</button>`
          }
        </div>
      </div>
    </div>
  `;
};

// ABRIR MODAL BASE V8.1
const abrirModalBase = (html, esEdicion = false) => {
  $('#mdNota').remove();
  $('body').append(html);
  abrirModal('mdNota');
  
  if (esEdicion) {
    setTimeout(() => $('#mdNota .md-titulo').focus(), 100);
    
    $('#mdNota .md-descripcion').on('input', function() {
      $('#mdNota .md-count').text(this.value.length);
    });
    
    $('#mdNota .cat_opt:not(.disabled)').on('click', function() {
      $('#mdNota .cat_opt').removeClass('active').find('input').prop('checked', false);
      $(this).addClass('active').find('input').prop('checked', true);
    });
  }
  
  $('#mdNota [data-act="cerrar"]').on('click', cerrarTodos);
};

// ABRIR MODAL VER V8.1
export const abrirModalVer = (nota, colores) => abrirModalBase(generarModal('ver', colores, nota), false);

// ABRIR MODAL EDITAR V8.1
export const abrirModalEditar = (colores, fecha = null, nota = null) => abrirModalBase(generarModal('editar', colores, nota, fecha), true);

// OBTENER DATOS DEL FORMULARIO V8.1
export const obtenerDatos = () => ({
  id: $('#mdNota .wm_guardar').data('id') || `nota_${Date.now()}`,
  titulo: $('#mdNota .md-titulo').val().trim(),
  descripcion: $('#mdNota .md-descripcion').val().trim(),
  fecha: $('#mdNota .md-fecha').val(),
  hora: $('#mdNota .md-hora').val() || '00:00',
  categoria: $('#mdNota input[name="md-categoria"]:checked').val()
});

// VALIDAR FORMULARIO V8.1
export const validarDatos = (datos) => {
  if (!datos.titulo || datos.titulo.length < 3) {
    return { valido: false, mensaje: 'El título debe tener al menos 3 caracteres' };
  }
  if (!datos.fecha) {
    return { valido: false, mensaje: 'Debes seleccionar una fecha' };
  }
  if (!datos.categoria) {
    return { valido: false, mensaje: 'Debes seleccionar una categoría' };
  }
  return { valido: true };
};

// ORDENAR NOTAS V8.1
export const ordenarNotas = (notas) => 
  notas.sort((a, b) => (b.actualizadoEn?.seconds || 0) - (a.actualizadoEn?.seconds || 0));