import $ from 'jquery';
import { wiFlag, infoCiudad, esNoche, wiCiudades } from './widev.js';

const marcasReloj = Array.from({length: 60}, (_, i) => {
  const ang = i * 6, cls = i % 5 === 0 ? 'wihora_mark wihora_mark_hour' : 'wihora_mark wihora_mark_minute';
  return `<div class="${cls}" style="transform:rotate(${ang}deg) translateY(-90px)"></div>`;
}).join('');

const difHora = (ciudad, dat) => {
  if (ciudad.ciudad === 'Lima') return '<i class="fas fa-map-marker-alt"></i> Tu Ciudad';
  const lima = infoCiudad('America/Lima');
  if (!lima?.gmt || !dat.gmt) return '';
  const extGMT = gmt => parseInt(gmt.match(/GMT([+-]?\d+)/)?.[1] || 0);
  const dif = extGMT(dat.gmt) - extGMT(lima.gmt);
  return dif === 0 ? '<i class="fas fa-exchange-alt"></i> Misma hora' 
    : `<i class="fa-solid fa-rotate-${dif > 0 ? 'right' : 'left'}"></i> ${dif > 0 ? '+' : ''}${dif}h`;
};

// FORMATO DE HORA V10.1
let formato24h = true;
const convertirHora = (hora24) => {
  if (formato24h) return hora24;
  const [h, m, s] = hora24.split(':');
  const hora = parseInt(h);
  const periodo = hora >= 12 ? 'PM' : 'AM';
  const hora12 = hora % 12 || 12;
  return `${hora12}:${m}:${s} ${periodo}`;
};

// BUSCAR CIUDADES V10.1
export const whBuscar = q => !q || q.length < 2 ? [] : 
  Object.values(wiCiudades).flat()
    .filter(c => c.ciudad.toLowerCase().includes(q.toLowerCase().trim()) || 
                 c.pais.toLowerCase().includes(q.toLowerCase().trim()))
    .slice(0, 5);

// INICIAR BUSCADOR V10.1
export const iniciarBuscador = () => {
  const $input = $('.whBuscar_input input');
  const $dropdown = $('.whDropdown');
  
  $input.on('input', function() {
    const resultados = whBuscar($(this).val());
    
    if (resultados.length === 0) {
      $dropdown.hide();
      return;
    }
    
    $dropdown.html(resultados.map(c => `
      <div class="whDropdown_item" data-zona="${c.zona}">
        <img src="${wiFlag(c.codigo)}" alt="${c.pais}" class="whDropdown_flag">
        <div class="whDropdown_info">
          <strong>${c.ciudad}</strong>
          <span>${c.pais}</span>
        </div>
      </div>
    `).join('')).show();
  });
  
  $(document).on('click', '.whDropdown_item', function() {
    const ciudad = Object.values(wiCiudades).flat().find(c => c.zona === $(this).data('zona'));
    if (ciudad) {
      $('.wi_grid').prepend(miReloj(ciudad));
      iniciarRelojes();
    }
    $dropdown.hide();
    $input.val('');
  });
  
  $(document).on('click', (e) => {
    if (!$(e.target).closest('.whBuscar_input').length) $dropdown.hide();
  });
};

// RELOJ ANALOGICO V10.1
export const relojAnalogico = zona => {
  const dat = infoCiudad(zona);
  if (!dat) return '';
  const [h, m, s] = dat.hora.split(':').map(Number);
  const ang = { seg: s * 6, min: m * 6 + s * 0.1, hor: (h % 12) * 30 + m * 0.5 };
  return `<div class="wihora_analogico"><div class="wihora_reloj_face"><div class="wihora_reloj_marks">${marcasReloj}</div>${
    ['hour','minute','second'].map((t, i) => 
      `<div class="wihora_hand wihora_hand_${t}" style="transform:translateX(-50%) rotate(${Object.values(ang)[i]}deg)"></div>`
    ).join('')}<div class="wihora_reloj_center"></div></div></div>`;
};

// RELOJ DIGITAL V10.1
export const relojDigital = zona => {
  const dat = infoCiudad(zona);
  return dat?.hora ? convertirHora(dat.hora) : '00:00:00';
};

// FECHA EN TEXTO V10.1
export const fechaTexto = zona => {
  const dat = infoCiudad(zona);
  return dat?.fecha || 'Fecha no disponible';
};

// DATOS RELOJES AGREGADOS V10.1
export const datosRelojes = ciudad => {
  const dat = infoCiudad(ciudad.zona);
  if (!dat) return '';
  const dia = esNoche(dat.hora);
  return `
    <img src="${wiFlag(ciudad.codigo)}" alt="${ciudad.pais}" class="wihora_flag">
    <div class="wihora_location">
      <h3 class="wihora_ciudad">${ciudad.ciudad}</h3>
      <p class="wihora_pais">${ciudad.pais}</p>
    </div>
    <div class="wihora_icon">
      <i class="fas fa-${dia ? 'sun' : 'moon'}"></i>
    </div>`;
};

// DATOS RELOJ PRINCIPAL V10.1
export const datosPrincipal = ciudad => {
  const dat = infoCiudad(ciudad.zona);
  if (!dat) return '';
  const dia = esNoche(dat.hora);
  return `
    <img src="${wiFlag(ciudad.codigo)}" alt="${ciudad.pais}" class="wihora_flag">
    <div class="wihora_location">
      <h3 class="wihora_ciudad">${ciudad.ciudad}</h3>
      <p class="wihora_pais">${ciudad.pais}</p>
    </div>
    <div class="wihora_icon">
      <i class="fas fa-${dia ? 'sun' : 'moon'}"></i>
    </div>`;
};

// INFO ZONA V10.1
export const infoZona = ciudad => {
  const dat = infoCiudad(ciudad.zona);
  if (!dat) return '';
  return `
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${difHora(ciudad, dat)}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-globe"></i>
        <span class="wihora_gmt">${dat.gmt}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-leaf"></i>
        <span class="wihora_estacion">${dat.estacion}</span>
      </div>
    </div>`;
};

// INFO PRINCIPAL V10.1
export const infoPrincipal = (ciudad, ip = null) => {
  const dat = infoCiudad(ciudad.zona);
  if (!dat) return '';
  
  const baseInfo = `
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${difHora(ciudad, dat)}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-globe"></i>
        <span class="wihora_gmt">${dat.gmt}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-leaf"></i>
        <span class="wihora_estacion">${dat.estacion}</span>
      </div>
    </div>`;
  
  const infoIP = ip ? `
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-globe-americas"></i>
        <span>${ip.city}, ${ip.country}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-desktop"></i>
        <span>${ip.device}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-chrome"></i>
        <span>${ip.browser}</span>
      </div>
    </div>` : '';
  
  return baseInfo + infoIP;
};

// RELOJES AGREGADOS V10.1
export const miReloj = ciudad => `
  <div class="wihora_card glass-card" data-zona="${ciudad.zona}">
    <div class="wihora_card_content">
      ${relojAnalogico(ciudad.zona)}
      <div class="wihora_digital_section">
        <div class="wihora_header_info">${datosRelojes(ciudad)}</div>
        <div class="wihora_time">${relojDigital(ciudad.zona)}</div>
        <div class="wihora_fecha">${fechaTexto(ciudad.zona)}</div>
        ${infoZona(ciudad)}
      </div>
    </div>
  </div>`;

// RELOJ PRINCIPAL V10.1
export const miPrincipal = (ciudad, ip = null) => `
  <div class="wihora_card wihora_principal glass-card" data-zona="${ciudad.zona}">
    <div class="wihora_card_content">
      ${relojAnalogico(ciudad.zona)}
      <div class="wihora_digital_section">
        <div class="wihora_header_info">${datosPrincipal(ciudad)}</div>
        <div class="wihora_time">${relojDigital(ciudad.zona)}</div>
        <div class="wihora_fecha">${fechaTexto(ciudad.zona)}</div>
        ${infoPrincipal(ciudad, ip)}
      </div>
    </div>
  </div>`;

// FORMATO DE HORA V10.1
export const formatoHoras = () => {
  $('.whFormato .btn').on('click', function() {
    formato24h = $(this).hasClass('formato24');
    $('.whFormato .btn').removeClass('active');
    $(this).addClass('active');
    
    $('.wihora_card').each(function() {
      const zona = $(this).data('zona');
      const dat = infoCiudad(zona);
      if (dat) $(this).find('.wihora_time').text(convertirHora(dat.hora));
    });
  });
};

export const mdVistas = () => {
  $('.whVistas .btn').on('click', function() {
    $('.whVistas .btn').removeClass('active');
    $(this).addClass('active');
    $('.wi_grid').toggleClass('whLista', $(this).hasClass('vistaLista'));
  });
};


// INICIAR RELOJES V10.1
let intervals = [];
export const iniciarRelojes = () => {
  intervals.forEach(clearInterval);
  intervals = [];
  $('.wihora_card').each((_, card) => {
    const $card = $(card);
    const zona = $card.data('zona');
    actualizarManecillas($card, zona);
    intervals.push(setInterval(() => actualizarManecillas($card, zona), 1000));
  });
};

// ACTUALIZAR MANECILLAS V10.1
export const actualizarManecillas = ($card, zona) => {
  const dat = infoCiudad(zona);
  if (!dat) return;
  const [h, m, s] = dat.hora.split(':').map(Number);
  const dia = esNoche(dat.hora);
  const ang = { seg: s * 6, min: m * 6 + s * 0.1, hor: (h % 12) * 30 + m * 0.5 };
  
  $card.removeClass('es-dia es-noche').addClass(dia ? 'es-dia' : 'es-noche');
  ['second','minute','hour'].forEach((t, i) => 
    $card.find(`.wihora_hand_${t}`).css('transform', `translateX(-50%) rotate(${Object.values(ang)[i]}deg)`)
  );
  $card.find('.wihora_time').text(convertirHora(dat.hora));
  $card.find('.wihora_fecha').text(dat.fecha);
  $card.find('.wihora_icon i').attr('class', `fas fa-${dia ? 'sun' : 'moon'}`);
};