import $ from 'jquery';
import { wiCiudades, infoCiudad, wiFlag, esNoche, buscarCiudad } from '../widev.js';

let clockIntervals = [];
let animationFrames = new Map();
let paginaActual = 1;
const ciudadesPorPagina = 9;
let ciudadesFiltradas = [...wiCiudades.africa];

// ✅ Diferencia horaria
const calcularDiferenciaHoraria = (ciudad) => {
  const limaData = infoCiudad('America/Lima');
  const ciudadData = infoCiudad(ciudad.zona);
  
  if (!limaData?.gmt || !ciudadData?.gmt) return '';
  
  const extractGMT = (gmt) => parseInt(gmt.match(/GMT([+-]?\d+)/)?.[1] || 0);
  const diferencia = extractGMT(ciudadData.gmt) - extractGMT(limaData.gmt);
  
  if (diferencia === 0) return `<i class="fas fa-exchange-alt"></i> Misma hora`;
  return diferencia > 0 
    ? `<i class="fa-solid fa-rotate-right"></i> +${diferencia}h`
    : `<i class="fa-solid fa-rotate-left"></i> ${diferencia}h`;
};

// ✅ Crear marcas del reloj (compactas)
const crearMarcasReloj = () => {
  let html = '';
  for (let i = 0; i < 60; i++) {
    const angulo = i * 6;
    const clase = i % 5 === 0 ? 'wihora_mark wihora_mark_hour' : 'wihora_mark wihora_mark_minute';
    html += `<div class="${clase}" style="transform: rotate(${angulo}deg) translateY(-60px)"></div>`;
  }
  return html;
};

// ✅ Actualizar manecillas
const actualizarManecillas = ($card, hora, minuto, segundo) => {
  const cardId = $card.data('zona');
  
  if (animationFrames.has(cardId)) {
    cancelAnimationFrame(animationFrames.get(cardId));
  }
  
  const animar = () => {
    const anguloSegundo = segundo * 6;
    const anguloMinuto = minuto * 6 + segundo * 0.1;
    const anguloHora = (hora % 12) * 30 + minuto * 0.5;
    
    $card.find('.wihora_hand_second').css('transform', `translateX(-50%) rotate(${anguloSegundo}deg)`);
    $card.find('.wihora_hand_minute').css('transform', `translateX(-50%) rotate(${anguloMinuto}deg)`);
    $card.find('.wihora_hand_hour').css('transform', `translateX(-50%) rotate(${anguloHora}deg)`);
  };
  
  const frameId = requestAnimationFrame(animar);
  animationFrames.set(cardId, frameId);
};

// ✅ Actualizar reloj
const actualizarReloj = (ciudad, $card) => {
  try {
    const data = infoCiudad(ciudad.zona);
    if (!data) return;
    
    const [h, m, s] = data.hora.split(':').map(Number);
    const esDia = esNoche(data.hora);
    const diferencia = calcularDiferenciaHoraria(ciudad);
    
    // ✅ Aplicar clase día/noche
    $card.removeClass('es-dia es-noche').addClass(esDia ? 'es-dia' : 'es-noche');
    
    actualizarManecillas($card, h, m, s);
    
    $card.find('.wihora_time').text(data.hora);
    $card.find('.wihora_fecha').text(data.fecha);
    $card.find('.wihora_gmt').text(data.gmt);
    $card.find('.wihora_diferencia').html(diferencia);
    $card.find('.wihora_estacion').text(data.estacion);
    $card.find('.wihora_icon i').attr('class', `fas ${esDia ? 'fa-sun' : 'fa-moon'}`);
  } catch (error) {
    console.error('❌ Error actualizando reloj:', error);
  }
};

// ✅ Renderizar ciudades
const renderCiudades = () => {
  const inicio = (paginaActual - 1) * ciudadesPorPagina;
  const fin = inicio + ciudadesPorPagina;
  const ciudadesPagina = ciudadesFiltradas.slice(inicio, fin);
  const marcasReloj = crearMarcasReloj();
  
  if (ciudadesPagina.length === 0) {
    return `<div class="wicont_empty">
      <i class="fas fa-search"></i>
      <p>No se encontraron ciudades</p>
    </div>`;
  }
  
  return ciudadesPagina.map(c => `
    <div class="wihora_card wicont_card_compact" data-zona="${c.zona}">
      <div class="wihora_card_content wicont_compact_content">
        <div class="wihora_analogico wicont_analogico_small">
          <div class="wihora_reloj_face">
            <div class="wihora_reloj_marks">${marcasReloj}</div>
            <div class="wihora_hand wihora_hand_hour"></div>
            <div class="wihora_hand wihora_hand_minute"></div>
            <div class="wihora_hand wihora_hand_second"></div>
            <div class="wihora_reloj_center"></div>
          </div>
        </div>
        
        <div class="wihora_digital_section wicont_digital_compact">
          <div class="wihora_header_info">
            <img src="${wiFlag(c.codigo)}" alt="${c.pais}" class="wihora_flag" />
            <div class="wihora_location">
              <h3 class="wihora_ciudad">${c.ciudad}</h3>
              <p class="wihora_pais">${c.pais}</p>
            </div>
            <div class="wihora_icon">
              <i class="fas fa-sun"></i>
            </div>
          </div>
          
          <div class="wihora_time">00:00:00</div>
          <div class="wihora_fecha">Cargando...</div>
          
          <div class="wihora_info">
            <div class="wihora_info_item">
              <i class="fas fa-clock"></i>
              <span class="wihora_diferencia"></span>
            </div>
            <div class="wihora_info_item">
              <i class="fas fa-globe"></i>
              <span class="wihora_gmt">GMT+0</span>
            </div>
            <div class="wihora_info_item">
              <i class="fas fa-leaf"></i>
              <span class="wihora_estacion">Primavera</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// ✅ Renderizar paginación
const renderPaginacion = () => {
  const totalPaginas = Math.ceil(ciudadesFiltradas.length / ciudadesPorPagina);
  if (totalPaginas <= 1) return '';
  
  let paginas = '';
  const maxBotones = 5;
  let inicio = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
  let fin = Math.min(totalPaginas, inicio + maxBotones - 1);
  
  if (fin - inicio < maxBotones - 1) inicio = Math.max(1, fin - maxBotones + 1);
  
  for (let i = inicio; i <= fin; i++) {
    paginas += `<button class="wipag_btn ${i === paginaActual ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
  }
  
  return `
    <div class="wipaginacion">
      <button class="wipag_btn wipag_prev" ${paginaActual === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i> Anterior
      </button>
      <div class="wipag_numeros">${paginas}</div>
      <button class="wipag_btn wipag_next" ${paginaActual === totalPaginas ? 'disabled' : ''}>
        Siguiente <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
};

export const render = async () => {
  return `
    <div class="wicontinente">
      <div class="wicont_header">
        <h1 class="wicont_title">🌏 África</h1>
        <p class="wicont_subtitle">Explora las zonas horarias del continente más grande</p>
        
        <div class="wicont_controls">
          <div class="wicont_search">
            <i class="fas fa-search wicont_search_icon"></i>
            <input type="text" id="searchAfrica" placeholder="Buscar ciudad o país..." class="wisearch_input" />
            <span class="wicont_count">${ciudadesFiltradas.length} ciudades</span>
          </div>
        </div>
      </div>
      
      <div class="wicont_grid" id="africaGrid">
        ${renderCiudades()}
      </div>
      
      <div class="wicont_footer">
        ${renderPaginacion()}
      </div>
    </div>
  `;
};

export const init = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  animationFrames.forEach(id => cancelAnimationFrame(id));
  animationFrames.clear();
  
  const iniciarRelojes = () => {
    $('.wicont_card_compact').each((_, card) => {
      const $card = $(card);
      const zona = $card.data('zona');
      const ciudad = ciudadesFiltradas.find(c => c.zona === zona);
      
      if (ciudad) {
        actualizarReloj(ciudad, $card);
        const interval = setInterval(() => actualizarReloj(ciudad, $card), 1000);
        clockIntervals.push(interval);
      }
    });
  };
  
  iniciarRelojes();
  
  // 🔍 Búsqueda
  $('#searchAfrica').on('input', function() {
    const termino = $(this).val().trim();
    ciudadesFiltradas = termino ? buscarCiudad(termino, 'africa') : [...wiCiudades.africa];
    paginaActual = 1;
    
    clockIntervals.forEach(clearInterval);
    clockIntervals = [];
    animationFrames.forEach(id => cancelAnimationFrame(id));
    animationFrames.clear();
    
    $('#africaGrid').html(renderCiudades());
    $('.wicont_count').text(`${ciudadesFiltradas.length} ciudades`);
    $('.wicont_footer').html(renderPaginacion());
    iniciarRelojes();
  });
  
  // 📄 Paginación
  $(document).on('click', '.wipag_btn:not(.wipag_prev):not(.wipag_next)', function() {
    if (!$(this).hasClass('active')) {
      paginaActual = parseInt($(this).data('pagina'));
      clockIntervals.forEach(clearInterval);
      clockIntervals = [];
      animationFrames.forEach(id => cancelAnimationFrame(id));
      animationFrames.clear();
      $('#africaGrid').html(renderCiudades());
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
      animationFrames.forEach(id => cancelAnimationFrame(id));
      animationFrames.clear();
      $('#africaGrid').html(renderCiudades());
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
      animationFrames.forEach(id => cancelAnimationFrame(id));
      animationFrames.clear();
      $('#africaGrid').html(renderCiudades());
      $('.wicont_footer').html(renderPaginacion());
      iniciarRelojes();
      $('.wicont_grid').get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  console.log('🌏 Africa inicializado con relojes analógicos');
};

export const cleanup = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  animationFrames.forEach(id => cancelAnimationFrame(id));
  animationFrames.clear();
};