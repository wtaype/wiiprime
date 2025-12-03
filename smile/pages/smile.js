import $ from 'jquery';
import './smile.css';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { wiIp, wiFlag, infoCiudad, buscarCiudad, getls, savels, Mensaje, Notificacion, wiSpin, abrirModal, cerrarModal, esNoche } from '../widev.js';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, Timestamp } from 'firebase/firestore';

// === 🎯 ESTADO GLOBAL ===
const ui = {
  cdd: getls('wiciudades') || [],
  nts: getls('wifechas') || [],
  cal: null,
  nub: { cdd: new Set(), nts: new Set() }
};

// === 🔧 HELPERS COMPACTOS ===
const fmt = d => `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
const hor = (tz) => new Intl.DateTimeFormat('es-ES',{ timeZone: tz, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).format(new Date());
const idTs = (pfx='reg') => `${pfx}_${Date.now()}`;
const colCat = cat => ({cumpleanos:'#FF5C69',trabajo:'#0EBEFF',personal:'#29C72E',otros:'#ffa726'}[cat]||'#ffa726');
const icoC = cat => ({cumpleanos:'🎂',trabajo:'💼',personal:'👤',otros:'🎉'}[cat]||'📝');


// === 📦 RENDERIZADORES ===
const renderHeader = () => `
  <div class="wtm_hd">
    <div class="hd_info">
      <h2 class="wtm_ttl"><i class="fas fa-clock"></i> WITIME DASHBOARD</h2>
      <p class="wtm_sub">Gestiona zonas horarias y notas sincronizadas</p>
    </div>
    <button class="btn" data-act="actualizar"><i class="fas fa-sync"></i> Actualizar</button>
  </div>`;

const renderClock = (geo) => {
  const flag = wiFlag((geo?.country || 'PE').slice(0,2)), tz = geo?.timezone || 'America/Lima';
  const inf = infoCiudad(tz);
  const isDia = esNoche(inf?.hora?.split(':')[0] || '12');
  return `
  <section class="wtm_clk ${isDia?'es-dia':'es-noche'}">
    <div class="clk_cnt">
      <div class="analog">
        <div class="face">
          <div class="center"></div>
          ${[...Array(12)].map((_,i)=>`<span class="num_mk" style="transform:rotate(${i*30}deg)"><span style="transform:rotate(${-i*30}deg)">${i||12}</span></span>`).join('')}
          ${[...Array(60)].map((_,i)=>`<span class="mk ${i%5?'mn':'hr'}" style="transform:rotate(${i*6}deg)"></span>`).join('')}
          <span id="hHr" class="hand hr"></span><span id="hMn" class="hand mn"></span><span id="hSc" class="hand sc"></span>
        </div>
      </div>
      <div class="digital">
        <div class="loc">
          <img class="flag" src="${flag}" alt="">
          <div><div class="city">${geo?.city||'Lima'}</div><div class="pais">${geo?.country||'Perú'}</div></div>
          <div class="wihora_icon"><i class="fas fa-${isDia?'sun':'moon'}"></i></div>
        </div>
        <div id="dTime" class="time" data-tz="${tz}">${inf?.hora||'--:--:--'}</div>
        <div id="dDate" class="date">${inf?.fecha||fmt(new Date())}</div>
        <div class="info">
          <div class="inf"><i class="fas fa-globe"></i><span>${inf?.gmt||'GMT-5'}</span></div>
          <div class="inf"><i class="fas fa-leaf"></i><span>${inf?.estacion||'Verano'}</span></div>
          <div class="inf"><i class="fas fa-clock"></i><span>${inf?.cambioHorario?'DST':'STD'}</span></div>
        </div>
      </div>
    </div>
  </section>`;
};

const renderCities = () => `
  <section class="wtm_zns">
    <div class="sec_hd">
      <h3><i class="fas fa-globe-americas"></i> MIS ZONAS HORARIAS</h3>
      <button class="ico" data-act="ciudad-buscar" title="Buscar ciudad"><i class="fas fa-search"></i></button>
    </div>
    <div class="srch" style="display:none">
      <i class="fas fa-search"></i>
      <input id="srCity" type="text" placeholder="Buscar ciudad (mín. 3 letras)..." maxlength="50">
    </div>
    <div id="srList" class="srlist" style="display:none"></div>
    <div id="cityList" class="city_list">
      ${ui.cdd.length ? ui.cdd.map(cityItem).join('') : empty('No hay ciudades guardadas')}
    </div>
  </section>`;

const cityItem = c => {
  const enNube = ui.nub.cdd.has(c.id);
  const inf = infoCiudad(c.zona);
  const isDia = esNoche(inf?.hora?.split(':')[0] || '12');
  return `
  <div class="city_itm" data-id="${c.id}">
    <div class="infoL">
      <img class="flag" src="${wiFlag(c.codigo)}" alt="${c.codigo}">
      <div class="txt">
        <div class="cty">${c.ciudad}</div>
        <div class="pais">${c.pais}</div>
      </div>
      <div class="city_time_wrapper">
        <div class="city_icon"><i class="fas fa-${isDia?'sun':'moon'}"></i></div>
        <div class="ctm" data-tz="${c.zona}">${hor(c.zona)}</div>
        <div class="city_date">${fmt(new Date())}</div>
      </div>
    </div>
    <div class="acts">
      ${enNube ? '<i class="fas fa-cloud nub" title="Guardado en nube"></i>' : '<i class="far fa-cloud nub off" title="No guardado en nube"></i>'}
      <button class="ico ico-save" data-act="ciudad-guardar" title="Guardar en nube"><i class="fas fa-save"></i></button>
      <button class="ico ico-delete" data-act="ciudad-eliminar" title="Eliminar"><i class="fas fa-trash"></i></button>
    </div>
  </div>`;
};

const renderCalendar = () => `
  <section class="wtm_cal">
    <div class="sec_hd">
      <h3><i class="fas fa-calendar-alt"></i> CALENDARIO</h3>
    </div>
    <div id="calendar"></div>
  </section>`;

const renderNotes = () => `
  <section class="wtm_nts">
    <div class="sec_hd">
      <h3><i class="fas fa-sticky-note"></i> LISTA DE NOTAS</h3>
      <button class="ico" data-act="nota-buscar" title="Buscar nota"><i class="fas fa-search"></i></button>
    </div>
    <div class="srch" style="display:none">
      <i class="fas fa-search"></i>
      <input id="srNote" type="text" placeholder="Buscar nota (mín. 3 letras)..." maxlength="100">
    </div>
    <div id="noteList" class="note_list">
      ${ui.nts.length ? ui.nts.sort((a,b)=>b.creadoEn.seconds-a.creadoEn.seconds).map(noteItem).join('') : empty('No hay notas')}
    </div>
  </section>`;

const noteItem = n => {
  const enNube = ui.nub.nts.has(n.id);
  return `
  <div class="note_itm ${n.categoria}" data-id="${n.id}">
    <div class="nt_hd">
      <div class="ttl">${icoC(n.categoria)} ${n.titulo}</div>
      <div class="acts">
        ${enNube ? '<i class="fas fa-cloud nub" title="Guardado en nube"></i>' : '<i class="far fa-cloud nub off" title="No guardado en nube"></i>'}
        <button class="ico ico-edit" data-act="nota-editar" title="Editar"><i class="fas fa-edit"></i></button>
        <button class="ico ico-save" data-act="nota-guardar" title="Guardar en nube"><i class="fas fa-save"></i></button>
        <button class="ico ico-delete" data-act="nota-eliminar" title="Eliminar"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="nt_meta">
      <i class="fas fa-calendar"></i> ${fmt(n.creadoEn.toDate?.() || new Date(n.creadoEn))} 
      ${n.hora?`<i class="fas fa-clock"></i> ${n.hora}`:''}
    </div>
    ${n.descripcion? `<div class="nt_desc">${n.descripcion}</div>` : ''}
    <div class="nt_foot"><span class="nt_cat">${n.categoria}</span></div>
  </div>`;
};

const empty = txt => `<div class="empty"><i class="far fa-folder-open"></i><p>${txt}</p></div>`;

// === 🎨 MODAL NOTA ===
const renderModalNota = (fecha = null, nota = null) => `
  <div id="mdNota" class="wiModal">
    <div class="modalBody">
      <button class="modalX" data-act="modal-cerrar"><i class="fas fa-times"></i></button>
      <div class="modal_hd">
        <h3><i class="fas fa-sticky-note"></i> ${nota ? 'Editar Nota' : 'Nueva Nota'}</h3>
      </div>
      <div class="modal_body">
        <div class="form_grp">
          <label><i class="fas fa-heading"></i> Título *</label>
          <input type="text" id="inpTitulo" placeholder="Ej: Reunión importante" maxlength="100" value="${nota?.titulo||''}" required>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea id="inpDesc" placeholder="Detalles adicionales (máx. 200 caracteres)" maxlength="200" rows="3">${nota?.descripcion||''}</textarea>
          <span class="char_count"><span id="charCount">0</span>/200</span>
        </div>
        <div class="form_row">
          <div class="form_grp">
            <label><i class="fas fa-calendar"></i> Fecha *</label>
            <input type="date" id="inpFecha" value="${fecha||new Date().toISOString().split('T')[0]}" required>
          </div>
          <div class="form_grp">
            <label><i class="fas fa-clock"></i> Hora</label>
            <input type="time" id="inpHora" value="${nota?.hora||''}">
          </div>
        </div>
        <div class="form_grp">
          <label><i class="fas fa-tag"></i> Categoría *</label>
          <div class="cat_grid">
            ${['cumpleanos','trabajo','personal','otros'].map(c=>`
              <label class="cat_opt ${nota?.categoria===c||(!nota&&c==='otros')?'active':''}" data-cat="${c}">
                <input type="radio" name="categoria" value="${c}" ${nota?.categoria===c||(!nota&&c==='otros')?'checked':''}>
                <span class="cat_ico" style="background:${colCat(c)}">${icoC(c)}</span>
                <span class="cat_txt">${c.charAt(0).toUpperCase()+c.slice(1)}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="modal_ftr">
        <button class="btn_sec" data-act="modal-cerrar"><i class="fas fa-times"></i> Cancelar</button>
        <button class="btn_pri" data-act="nota-${nota?'actualizar':'crear'}" data-id="${nota?.id||''}"><i class="fas fa-save"></i> ${nota?'Actualizar':'Guardar'}</button>
      </div>
    </div>
  </div>`;

// === 🎨 RENDER PRINCIPAL ===
export const render = async () => {
  const geo = getls('smileIP') || await new Promise(res => wiIp(d=>{ savels('smileIP', d, 24); res(d); }));
  return `
    ${renderHeader()}
    <div class="wtm_lay">
      <div class="left">${renderClock(geo)}${renderCities()}</div>
      <div class="right">${renderCalendar()}${renderNotes()}</div>
    </div>
  `;
};

// === ⚡ INIT ===
export const init = async () => {
  await cargarNube();
  
  // Timer global
  const updateTimes = () => {
    const now = new Date(), h = now.getHours()%12, m = now.getMinutes(), s = now.getSeconds();
    $('#hHr').css('transform', `rotate(${h*30 + m*0.5}deg)`);
    $('#hMn').css('transform', `rotate(${m*6 + s*0.1}deg)`);
    $('#hSc').css('transform', `rotate(${s*6}deg)`);
    
    const tzMain = $('#dTime').data('tz');
    if(tzMain) {
      $('#dTime').text(hor(tzMain));
      $('#dDate').text(fmt(new Date()));
    }
    
    $('.ctm[data-tz]').each(function(){
      const tz = $(this).data('tz');
      $(this).text(hor(tz));
      $(this).siblings('.city_date').text(fmt(new Date()));
      
      const inf = infoCiudad(tz);
      const isDia = esNoche(inf?.hora?.split(':')[0] || '12');
      $(this).siblings('.city_icon').html(`<i class="fas fa-${isDia?'sun':'moon'}"></i>`);
    });
  };
  updateTimes();
  const tmr = setInterval(updateTimes, 1000);

  // FullCalendar
  ui.cal = new Calendar($('#calendar')[0], {
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    firstDay: 1,
    initialView: 'dayGridMonth',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth' },
    buttonText: { today: 'Hoy', month: 'Mes' },
    titleFormat: { year: 'numeric', month: 'long' },
    dayHeaderFormat: { weekday: 'short' },
    events: ui.nts.map(n => ({
      id: n.id,
      title: n.titulo,
      start: n.creadoEn.toDate?.() || new Date(n.creadoEn),
      backgroundColor: colCat(n.categoria),
      borderColor: colCat(n.categoria),
      textColor: '#fff'
    })),
    dateClick: ({dateStr}) => abrirModalNota(dateStr),
    eventClick: ({event}) => {
      const nota = ui.nts.find(n => n.id === event.id);
      if (nota) abrirModalNota(null, nota);
    },
    eventContent: (arg) => ({
      html: `<div class="fc_evt_cnt">${icoC(ui.nts.find(n=>n.id===arg.event.id)?.categoria)} ${arg.event.title}</div>`
    })
  });
  ui.cal.render();

  // Contador chars
  $(document).on('input', '#inpDesc', function(){
    $('#charCount').text(this.value.length);
  });

  // Selección categoría
  $(document).on('click', '.cat_opt', function(){
    $('.cat_opt').removeClass('active');
    $(this).addClass('active').find('input').prop('checked', true);
  });

  // Delegación eventos
  $(document).on('click', '[data-act]', async function(){
    const act = $(this).data('act');
    const $itm = $(this).closest('.city_itm, .note_itm');
    const id = $itm.data('id');
    
    if (act==='actualizar') {
      wiSpin(this, true);
      await cargarNube();
      wiSpin(this, false);
      Mensaje('Datos actualizados desde la nube', 'success');
      
    } else if (act==='ciudad-buscar') {
      $('.wtm_zns .srch').slideToggle(200);
      $('#srCity').focus();
      
    } else if (act==='ciudad-guardar') {
      if(!id) return;
      wiSpin(this, true);
      await guardarCiudad(id);
      wiSpin(this, false);
      
    } else if (act==='ciudad-eliminar') {
      if(!id || !confirm('¿Eliminar esta ciudad?')) return;
      ui.cdd = ui.cdd.filter(c=>c.id!==id);
      ui.nub.cdd.delete(id);
      savels('wiciudades', ui.cdd, 24);
      $itm.fadeOut(300, ()=>$itm.remove());
      Notificacion('Ciudad eliminada', 'success');
      
    } else if (act==='nota-buscar') {
      $('.wtm_nts .srch').slideToggle(200);
      $('#srNote').focus();
      
    } else if (act==='nota-editar') {
      const nota = ui.nts.find(n => n.id === id);
      if(nota) abrirModalNota(null, nota);
      
    } else if (act==='nota-guardar') {
      if(!id) return;
      wiSpin(this, true);
      await guardarNota(id);
      wiSpin(this, false);
      
    } else if (act==='nota-eliminar') {
      if(!id || !confirm('¿Eliminar esta nota?')) return;
      ui.nts = ui.nts.filter(n=>n.id!==id);
      ui.nub.nts.delete(id);
      savels('wifechas', ui.nts, 24);
      $itm.fadeOut(300, ()=>$itm.remove());
      ui.cal.getEventById(id)?.remove();
      Notificacion('Nota eliminada', 'success');
      
    } else if (act==='modal-cerrar') {
      cerrarModal('mdNota');
      
    } else if (act==='nota-crear' || act==='nota-actualizar') {
      const esActualizar = act === 'nota-actualizar';
      const idNota = esActualizar ? $(this).data('id') : idTs();
      
      const titulo = $('#inpTitulo').val().trim();
      const descripcion = $('#inpDesc').val().trim();
      const fecha = $('#inpFecha').val();
      const hora = $('#inpHora').val();
      const categoria = $('input[name="categoria"]:checked').val();
      
      if(!titulo || titulo.length < 3) return Notificacion('El título debe tener al menos 3 caracteres', 'warning');
      if(!fecha) return Notificacion('Selecciona una fecha', 'warning');
      
      const nota = {
        id: idNota,
        titulo: titulo.substring(0,100),
        descripcion: descripcion.substring(0,200),
        categoria,
        hora,
        creadoEn: esActualizar ? ui.nts.find(n=>n.id===idNota).creadoEn : Timestamp.now(),
        actualizadoEn: Timestamp.now()
      };
      
      if(esActualizar) {
        const idx = ui.nts.findIndex(n => n.id === idNota);
        ui.nts[idx] = nota;
        ui.cal.getEventById(idNota)?.remove();
      } else {
        ui.nts.push(nota);
      }
      
      savels('wifechas', ui.nts, 24);
      $('#noteList').html(ui.nts.sort((a,b)=>b.creadoEn.seconds-a.creadoEn.seconds).map(noteItem).join(''));
      
      ui.cal.addEvent({
        id: nota.id,
        title: nota.titulo,
        start: nota.creadoEn.toDate(),
        backgroundColor: colCat(nota.categoria),
        borderColor: colCat(nota.categoria),
        textColor: '#fff'
      });
      
      cerrarModal('mdNota');
      Notificacion(esActualizar ? 'Nota actualizada' : 'Nota creada', 'success');
    }
  });

  // Buscar ciudades
  let tSearch;
  $(document).on('input', '#srCity', function(){
    clearTimeout(tSearch);
    const q = this.value.trim();
    
    if (q.length < 3) {
      $('#srList').hide().empty();
      return;
    }
    
    tSearch = setTimeout(() => {
      const res = buscarCiudad(q);
      $('#srList').html(res.slice(0,8).map(c=>
        `<div class="sr_itm" data-c='${JSON.stringify(c)}'>
          <img src="${wiFlag(c.codigo)}" class="flag_sm"> ${c.ciudad}, ${c.pais}
        </div>`
      ).join('')).slideDown(200);
    }, 300);
  });

  // Seleccionar ciudad
  $(document).on('click', '.sr_itm', function(){
    const c = JSON.parse($(this).attr('data-c'));
    if (ui.cdd.some(x=>x.ciudad===c.ciudad && x.pais===c.pais)) {
      return Notificacion('Ciudad ya agregada', 'warning');
    }
    
    const item = { 
      id: idTs(`${c.codigo}_${c.ciudad}`), 
      ...c, 
      creadoEn: Timestamp.now(), 
      actualizadoEn: Timestamp.now() 
    };
    ui.cdd.push(item);
    savels('wiciudades', ui.cdd, 24);
    $('#cityList').html(ui.cdd.map(cityItem).join(''));
    $('#srCity').val('');
    $('#srList').slideUp(200, ()=>$('#srList').empty());
    $('.wtm_zns .srch').slideUp(200);
    Mensaje('Ciudad agregada. Presiona 💾 para guardar en la nube', 'success');
  });

  // Buscar notas
  $(document).on('input', '#srNote', function(){
    const q = this.value.trim().toLowerCase();
    
    if (q.length < 3) {
      $('#noteList').html(ui.nts.sort((a,b)=>b.creadoEn.seconds-a.creadoEn.seconds).map(noteItem).join(''));
      return;
    }
    
    const filtered = ui.nts.filter(n => 
      n.titulo.toLowerCase().includes(q) || 
      n.descripcion?.toLowerCase().includes(q)
    );
    
    $('#noteList').html(filtered.length ? filtered.map(noteItem).join('') : empty('No se encontraron notas'));
  });

  return () => clearInterval(tmr);
};

// === 📝 ABRIR MODAL NOTA ===
function abrirModalNota(fecha = null, nota = null) {
  $('body').append(renderModalNota(fecha, nota));
  abrirModal('mdNota');
  $('#inpTitulo').focus();
  $('#charCount').text($('#inpDesc').val().length);
}

// === 💾 GUARDAR INDIVIDUAL ===
async function guardarCiudad(id) {
  try {
    const ciudad = ui.cdd.find(c => c.id === id);
    if (!ciudad) throw new Error('Ciudad no encontrada');
    
    await setDoc(doc(db, 'wiciudades', id), ciudad);
    ui.nub.cdd.add(id);
    $(`[data-id="${id}"] .nub`).removeClass('far off').addClass('fas').attr('title', 'Guardado en nube');
    Notificacion('Ciudad guardada en la nube', 'success');
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al guardar en nube', 'error');
  }
}

async function guardarNota(id) {
  try {
    const nota = ui.nts.find(n => n.id === id);
    if (!nota) throw new Error('Nota no encontrada');
    
    await setDoc(doc(db, 'wifechas', id), nota);
    ui.nub.nts.add(id);
    $(`[data-id="${id}"] .nub`).removeClass('far off').addClass('fas').attr('title', 'Guardado en nube');
    Notificacion('Nota guardada en la nube', 'success');
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al guardar en nube', 'error');
  }
}

// === 🔄 CARGAR NUBE ===
async function cargarNube(){
  try {
    const [cSnap, nSnap] = await Promise.all([
      getDocs(collection(db,'wiciudades')),
      getDocs(collection(db,'wifechas'))
    ]);
    
    ui.cdd = cSnap.docs.map(d=>d.data());
    ui.nts = nSnap.docs.map(d=>d.data());
    
    ui.nub.cdd.clear();
    ui.nub.nts.clear();
    cSnap.docs.forEach(d => ui.nub.cdd.add(d.id));
    nSnap.docs.forEach(d => ui.nub.nts.add(d.id));
    
    savels('wiciudades', ui.cdd, 24);
    savels('wifechas', ui.nts, 24);
    
    $('#cityList').html(ui.cdd.length ? ui.cdd.map(cityItem).join('') : empty('No hay ciudades'));
    $('#noteList').html(ui.nts.length ? ui.nts.sort((a,b)=>b.creadoEn.seconds-a.creadoEn.seconds).map(noteItem).join('') : empty('No hay notas'));
    
    if(ui.cal) {
      ui.cal.removeAllEvents();
      ui.nts.forEach(n => {
        ui.cal.addEvent({
          id: n.id,
          title: n.titulo,
          start: n.creadoEn.toDate?.() || new Date(n.creadoEn),
          backgroundColor: colCat(n.categoria),
          borderColor: colCat(n.categoria),
          textColor: '#fff'
        });
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al cargar datos de la nube', 'error');
  }
}