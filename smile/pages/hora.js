import $ from 'jquery';
import { wiCiudades, infoCiudad, wiFlag, esNoche, Saludar } from '../widev.js';

let clockIntervals = [];
let animationFrames = new Map();

// ✅ Diferencia horaria compacta
const calcularDiferenciaHoraria = (ciudad) => {
  if (ciudad.ciudad === 'Lima') return `<i class="fas fa-map-marker-alt"></i> Tu Ciudad`;
  
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

// ✅ Crear marcas del reloj
const crearMarcasReloj = () => {
  let html = '';
  for (let i = 0; i < 60; i++) {
    const angulo = i * 6;
    const clase = i % 5 === 0 ? 'wihora_mark wihora_mark_hour' : 'wihora_mark wihora_mark_minute';
    html += `<div class="${clase}" style="transform: rotate(${angulo}deg) translateY(-90px)"></div>`;
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
    
    if (ciudad.ciudad === 'Lima') {
      $('.wihora_title').text(`${Saludar()} Gorila`);
    }
    
    const [h, m, s] = data.hora.split(':').map(Number);
    const esDia = esNoche(data.hora);
    const diferencia = calcularDiferenciaHoraria(ciudad);
    
    $card.removeClass('es-dia es-noche').addClass(esDia ? 'es-dia' : 'es-noche');
    actualizarManecillas($card, h, m, s);
    
    $card.find('.wihora_time').text(data.hora);
    $card.find('.wihora_fecha').text(data.fecha);
    $card.find('.wihora_gmt').text(data.gmt);
    $card.find('.wihora_estacion').text(data.estacion);
    $card.find('.wihora_diferencia').html(diferencia);
    $card.find('.wihora_icon i').attr('class', `fas ${esDia ? 'fa-sun' : 'fa-moon'}`);
  } catch (error) {
    console.error(`❌ Error en ${ciudad.ciudad}:`, error.message);
  }
};

export const render = async () => {
  const ciudades = wiCiudades.principales;
  const marcasReloj = crearMarcasReloj();
  
  return `
    <div class="wihora">
      <div class="wihora_header">
        <h1 class="wihora_title">${Saludar()} Gorila</h1>
        <div class="wihora_controls">
          <div class="wibtn_format">
            <i class="fas fa-clock"></i> Formato 24h
          </div>
        </div>
      </div>
      
      <div class="wihora_grid">
        ${ciudades.map(c => `
          <div class="wihora_card glass-card" data-zona="${c.zona}">
            <div class="wihora_card_content">
              <div class="wihora_analogico">
                <div class="wihora_reloj_face">
                  <div class="wihora_reloj_marks">${marcasReloj}</div>
                  <div class="wihora_hand wihora_hand_hour"></div>
                  <div class="wihora_hand wihora_hand_minute"></div>
                  <div class="wihora_hand wihora_hand_second"></div>
                  <div class="wihora_reloj_center"></div>
                </div>
              </div>
              
              <div class="wihora_digital_section">
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
        `).join('')}
      </div>
    </div>
  `;
};

export const init = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  
  $('.wihora_card').each((_, card) => {
    const $card = $(card);
    const zona = $card.data('zona');
    const ciudad = wiCiudades.principales.find(c => c.zona === zona);
    
    if (ciudad) {
      actualizarReloj(ciudad, $card);
      const interval = setInterval(() => actualizarReloj(ciudad, $card), 1000);
      clockIntervals.push(interval);
    }
  });
  
  console.log('🕐 Hora inicializado (24h)');
};

export const cleanup = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  animationFrames.forEach(id => cancelAnimationFrame(id));
  animationFrames.clear();
};