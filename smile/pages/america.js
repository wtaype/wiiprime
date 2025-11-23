import $ from 'jquery';
import { wiCiudades, wiHoraCiudad, flagUrl, wiEsDia, wiBuscarCiudad, getls, savels } from '../widev.js';

let clockIntervals = [];
let clockFormat = getls('wiClockFormat') || '24';
let paginaActual = 1;
const ciudadesPorPagina = 9;
let ciudadesFiltradas = [...wiCiudades.america]; // 🔄 america
let limaHora = null;

const convertirA12h = (hora24) => {
  const [h, m, s] = hora24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${ampm}`;
};

const calcularDiferenciaHoraria = (horaActual) => {
  if (!limaHora) return '';
  const [hL, mL] = limaHora.split(':').map(Number);
  const [hA, mA] = horaActual.split(':').map(Number);
  const minutosLima = hL * 60 + mL;
  const minutosActual = hA * 60 + mA;
  let diferencia = minutosActual - minutosLima;
  if (diferencia > 720) diferencia -= 1440;
  if (diferencia < -720) diferencia += 1440;
  const horas = Math.floor(Math.abs(diferencia) / 60);
  const minutos = Math.abs(diferencia) % 60;
  if (diferencia === 0 && minutos === 0) return `<span class="wicont_diff misma-hora">Misma hora</span>`;
  else if (diferencia > 0) {
    const tiempoTexto = minutos > 0 ? `+${horas}h ${minutos}m` : `+${horas}h`;
    return `<span class="wicont_diff adelantado">Adelantado ${tiempoTexto}</span>`;
  } else {
    const tiempoTexto = minutos > 0 ? `-${horas}h ${minutos}m` : `-${horas}h`;
    return `<span class="wicont_diff atrasado">Atrasado ${tiempoTexto}</span>`;
  }
};

const actualizarReloj = (ciudad, $card) => {
  try {
    const data = wiHoraCiudad(ciudad.zona);
    if (!data) return;
    if (ciudad.ciudad === 'Lima') limaHora = data.hora;
    const hora = clockFormat === '12' ? convertirA12h(data.hora) : data.hora;
    const esDia = wiEsDia(data.hora);
    const diferencia = calcularDiferenciaHoraria(data.hora);
    const estado = esDia ? 'Día' : 'Noche';
    $card.find('.wicont_time').text(hora);
    $card.find('.wicont_fecha').text(data.fecha);
    $card.find('.wicont_gmt').text(data.gmt);
    $card.find('.wicont_estado').text(estado);
    $card.find('.wicont_diferencia').html(diferencia);
    $card.find('.wicont_icon i').attr('class', `fas ${esDia ? 'fa-sun' : 'fa-moon'}`);
  } catch (error) {
    console.error('Error actualizando reloj:', error);
  }
};

const inicializarLimaHora = () => {
  const limaData = wiHoraCiudad('America/Lima');
  if (limaData) limaHora = limaData.hora;
};

const renderCiudades = () => {
  const inicio = (paginaActual - 1) * ciudadesPorPagina;
  const fin = inicio + ciudadesPorPagina;
  const ciudadesPagina = ciudadesFiltradas.slice(inicio, fin);
  if (ciudadesPagina.length === 0) return `<div class="wicont_empty"><i class="fas fa-search"></i><p>No se encontraron ciudades</p></div>`;
  return ciudadesPagina.map(c => `
    <div class="wicont_card" data-zona="${c.zona}">
      <div class="wicont_card_header">
        <img src="${flagUrl(c.codigo)}" alt="${c.pais}" class="wicont_flag" />
        <div class="wicont_location">
          <h3 class="wicont_ciudad">${c.ciudad}</h3>
          <p class="wicont_pais">${c.pais}</p>
        </div>
        <div class="wicont_icon"><i class="fas fa-sun"></i></div>
      </div>
      <div class="wicont_time">00:00:00</div>
      <div class="wicont_fecha">Cargando...</div>
      <div class="wicont_info">
        <div class="wicont_info_item"><i class="fas fa-exchange-alt"></i><span class="wicont_diferencia"></span></div>
        <div class="wicont_info_item"><i class="fas fa-globe"></i><span class="wicont_gmt">GMT+00:00</span></div>
        <div class="wicont_info_item"><i class="fas fa-clock"></i><span class="wicont_estado">Día</span></div>
      </div>
    </div>
  `).join('');
};

const renderPaginacion = () => {
  const totalPaginas = Math.ceil(ciudadesFiltradas.length / ciudadesPorPagina);
  if (totalPaginas <= 1) return '';
  let paginas = '';
  const maxBotones = 5;
  let inicio = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
  let fin = Math.min(totalPaginas, inicio + maxBotones - 1);
  if (fin - inicio < maxBotones - 1) inicio = Math.max(1, fin - maxBotones + 1);
  for (let i = inicio; i <= fin; i++) paginas += `<button class="wipag_btn ${i === paginaActual ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
  return `<div class="wipaginacion"><button class="wipag_btn wipag_prev" ${paginaActual === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Anterior</button><div class="wipag_numeros">${paginas}</div><button class="wipag_btn wipag_next" ${paginaActual === totalPaginas ? 'disabled' : ''}>Siguiente <i class="fas fa-chevron-right"></i></button></div>`;
};

export const render = async () => {
  inicializarLimaHora();
  return `<div class="wicontinente"><div class="wicont_header"><h1 class="wicont_title">🌎 América</h1><p class="wicont_subtitle">Explora las zonas horarias del nuevo mundo</p><div class="wicont_controls"><div class="wicont_search"><i class="fas fa-search wicont_search_icon"></i><input type="text" id="searchAmerica" placeholder="Buscar ciudad o país..." class="wisearch_input" /><span class="wicont_count">${ciudadesFiltradas.length} ciudades</span></div><div class="wibtn_group"><button class="wibtn wibtn_format ${clockFormat === '24' ? 'active' : ''}" data-format="24"><i class="fas fa-clock"></i> 24h</button><button class="wibtn wibtn_format ${clockFormat === '12' ? 'active' : ''}" data-format="12"><i class="far fa-clock"></i> 12h</button></div></div></div><div class="wicont_grid" id="americaGrid">${renderCiudades()}</div><div class="wicont_footer">${renderPaginacion()}</div></div>`;
};

export const init = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  inicializarLimaHora();
  const iniciarRelojes = () => {
    $('.wicont_card').each((_, card) => {
      const $card = $(card);
      const ciudad = ciudadesFiltradas.find(c => c.zona === $card.data('zona'));
      if (ciudad) {
        actualizarReloj(ciudad, $card);
        clockIntervals.push(setInterval(() => actualizarReloj(ciudad, $card), 1000));
      }
    });
  };
  iniciarRelojes();
  $('#searchAmerica').on('input', function() {
    const termino = $(this).val().trim();
    ciudadesFiltradas = termino ? wiBuscarCiudad(termino, 'america') : [...wiCiudades.america];
    paginaActual = 1;
    clockIntervals.forEach(clearInterval);
    clockIntervals = [];
    $('#americaGrid').html(renderCiudades());
    $('.wicont_count').text(`${ciudadesFiltradas.length} ciudades`);
    $('.wicont_footer').html(renderPaginacion());
    iniciarRelojes();
  });
  $('.wibtn_format').on('click', function() {
    const nuevoFormato = $(this).data('format');
    if (clockFormat !== nuevoFormato) {
      clockFormat = nuevoFormato;
      $('.wibtn_format').removeClass('active');
      $(this).addClass('active');
      savels('wiClockFormat', clockFormat, 720);
      $('.wicont_card').each((_, card) => {
        const $card = $(card);
        $card.find('.wicont_time').addClass('changing');
        setTimeout(() => $card.find('.wicont_time').removeClass('changing'), 400);
        const ciudad = ciudadesFiltradas.find(c => c.zona === $card.data('zona'));
        if (ciudad) actualizarReloj(ciudad, $card);
      });
    }
  });
  $(document).on('click', '.wipag_btn:not(.wipag_prev):not(.wipag_next)', function() {
    if (!$(this).hasClass('active')) {
      paginaActual = parseInt($(this).data('pagina'));
      clockIntervals.forEach(clearInterval);
      clockIntervals = [];
      $('#americaGrid').html(renderCiudades());
      $('.wicont_footer').html(renderPaginacion());
      iniciarRelojes();
      $('.wicont_grid').get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  $(document).on('click', '.wipag_prev', () => {
    if (paginaActual > 1) {
      paginaActual--;
      clockIntervals.forEach(clearInterval);
      clockIntervals = [];
      $('#americaGrid').html(renderCiudades());
      $('.wicont_footer').html(renderPaginacion());
      iniciarRelojes();
      $('.wicont_grid').get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  $(document).on('click', '.wipag_next', () => {
    const totalPaginas = Math.ceil(ciudadesFiltradas.length / ciudadesPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      clockIntervals.forEach(clearInterval);
      clockIntervals = [];
      $('#americaGrid').html(renderCiudades());
      $('.wicont_footer').html(renderPaginacion());
      iniciarRelojes();
      $('.wicont_grid').get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  console.log('🌎 Módulo de América inicializado');
};

export const cleanup = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
};