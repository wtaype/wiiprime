import $ from 'jquery';
import { wiFlag, infoCiudad, esNoche, wiCiudades } from '../widev.js';

// DIFERENCIAS DE HORAS V10.1
export function difHora(ciudad, dat, zonaReferencia = null) {
  const refZona = zonaReferencia || ciudad.zona;
  const referencia = infoCiudad(refZona);
  if (ciudad.zona === refZona) return '<i class="fas fa-map-marker-alt"></i> Tu Ciudad';
  if (!referencia?.gmt || !dat.gmt) return '';
  const extGMT = gmt => parseInt(gmt.match(/GMT([+-]?\d+)/)?.[1] || 0);
  const dif = extGMT(dat.gmt) - extGMT(referencia.gmt);
  return dif === 0 ? '<i class="fas fa-exchange-alt"></i> Misma hora'
    : `<i class="fa-solid fa-rotate-${dif > 0 ? 'right' : 'left'}"></i> ${dif > 0 ? '+' : ''}${dif}h`;
}

// FORMATO DE HORAS V10.1
let formato24h = true;
export function formatoHoras() {
  $('.whFormato .btn').on('click', function() {
    formato24h = $(this).hasClass('formato24');
    $('.whFormato .btn').removeClass('active').end().addClass('active');
    $('.wihora_card').each((_, el) => {
      const zona = $(el).data('zona');
      const dat = infoCiudad(zona);
      if (dat) $(el).find('.wihora_time').text(convertirHora(dat.hora));
    });
  });
}
export function convertirHora(hora24) {
  if (formato24h) return hora24;
  const [h, m, s] = hora24.split(':');
  const hora = parseInt(h);
  const periodo = hora >= 12 ? 'PM' : 'AM';
  const hora12 = hora % 12 || 12;
  return `${hora12}:${m}:${s} ${periodo}`;
}

// RELOJ ANALOGICO V10.1
export function relojAnalogico(zona) {
  const dat = infoCiudad(zona);
  if (!dat) return '';
  const marcasReloj = Array.from({length: 60}, (_, i) => {
    const ang = i * 6, cls = i % 5 === 0 ? 'wihora_mark wihora_mark_hour' : 'wihora_mark wihora_mark_minute';
    return `<div class="${cls}" style="transform:rotate(${ang}deg) translateY(-90px)"></div>`;
  }).join('');
  const [h, m, s] = dat.hora.split(':').map(Number);
  const ang = { seg: s * 6, min: m * 6 + s * 0.1, hor: (h % 12) * 30 + m * 0.5 };
  return `<div class="wihora_analogico"><div class="wihora_reloj_face"><div class="wihora_reloj_marks">${marcasReloj}</div>${
    ['hour','minute','second'].map((t, i) =>
      `<div class="wihora_hand wihora_hand_${t}" style="transform:translateX(-50%) rotate(${Object.values(ang)[i]}deg)"></div>`
    ).join('')}<div class="wihora_reloj_center"></div></div></div>`;
} 

// RELOJ DIGITAL V10.1
export function relojDigital(zona) {
  const dat = infoCiudad(zona);
  return dat?.hora ? convertirHora(dat.hora) : '00:00:00';
} 

// FECHAS EN TEXTOS V10.1
export function fechaTexto(zona) {
  const dat = infoCiudad(zona);
  return dat?.fecha || 'Fecha no disponible';
} 

// INFO PAISES V10.1
export function infoPaises(ciudad) {
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
} 

// INFO DATOS V10.2
export function infoDatos(ciudad, zonaReferencia = null) {
  const dat = infoCiudad(ciudad.zona);
  if (!dat) return '';
  return `
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${difHora(ciudad, dat, zonaReferencia)}</span>
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
}

// VISTAS DE LISTA/GRID V10.1
export function mdVistas() {
  $('.whVistas .btn').on('click', function() {
    $('.whVistas .btn').removeClass('active');
    $(this).addClass('active');
    $('.wi_grid').toggleClass('whLista', $(this).hasClass('vistaLista'));
  });
} 

// INICIAR RELOJES V10.1
let intervals = [];
export function iniciarRelojes() {
  intervals.forEach(clearInterval);
  intervals = [];
  $('.wihora_card').each((_, card) => {
    const $card = $(card);
    const zona = $card.data('zona');
    actualizarManecillas($card, zona);
    intervals.push(setInterval(() => actualizarManecillas($card, zona), 1000));
  });
} 

// ACTUALIZAR MANECILLAS V10.1
export function actualizarManecillas($card, zona) {
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
} 

// BUSCADOR DE CIUDADES V10.2
export function iniciarBuscador() {
  const $input = $('.whBuscar_input input'), $dropdown = $('.whDropdown');
  $input.on('input', function() {
    const qy = $(this).val();
    if (!qy || qy.length < 2) return $dropdown.hide();
    const resultados = Object.values(wiCiudades).flat().filter(cd => [cd.ciudad, cd.pais].some(v => v.toLowerCase().includes(qy.toLowerCase().trim()))).slice(0, 5);
    if (!resultados.length) return $dropdown.hide();
    $dropdown.html(resultados.map(cd => `<div class="whDropdown_item" data-ciudad='${JSON.stringify(cd)}'><img src="${wiFlag(cd.codigo)}" alt="${cd.pais}" class="whDropdown_flag"><div class="whDropdown_info"><strong>${cd.ciudad}</strong><span>${cd.pais}</span></div></div>`).join('')).show();
  });
  $(document).on('click', '.whDropdown_item', function() {
    $(this).trigger('agregar-ciudad', [JSON.parse($(this).attr('data-ciudad'))]);
    $dropdown.hide(), $input.val('');
  }).on('click', e => !$(e.target).closest('.whBuscar_input').length && $dropdown.hide());
}