import $ from 'jquery';
import { infoCiudad, wiFlag, esNoche } from '../widev.js';

let clockIntervals = [];

const crearMarcasReloj = () => {
  let html = '';
  for (let i = 0; i < 60; i++) {
    const angulo = i * 6;
    const esHora = i % 5 === 0;
    const clase = esHora ? 'wihora_mark wihora_mark_hour' : 'wihora_mark wihora_mark_minute';
    html += `<div class="${clase}" style="transform: rotate(${angulo}deg) translateY(-50px)"></div>`;
  }
  return html;
};

const actualizarReloj = (ciudad, $card) => {
  const data = infoCiudad(ciudad.zona);
  if (!data) return;
  
  const [h, m, s] = data.hora.split(':').map(Number);
  const esDia = esNoche(data.hora);
  
  $card.removeClass('es-dia es-noche').addClass(esDia ? 'es-dia' : 'es-noche');
  
  const anguloSegundo = s * 6;
  const anguloMinuto = m * 6 + s * 0.1;
  const anguloHora = (h % 12) * 30 + m * 0.5;
  
  $card.find('.wihora_hand_second').css('transform', `translateX(-50%) rotate(${anguloSegundo}deg)`);
  $card.find('.wihora_hand_minute').css('transform', `translateX(-50%) rotate(${anguloMinuto}deg)`);
  $card.find('.wihora_hand_hour').css('transform', `translateX(-50%) rotate(${anguloHora}deg)`);
  
  $card.find('.wihora_time').text(data.hora);
  $card.find('.wihora_fecha').text(data.fecha);
  $card.find('.wihora_gmt').text(data.gmt);
  $card.find('.wihora_estacion').text(data.estacion);
  $card.find('.wihora_icon i').attr('class', `fas ${esDia ? 'fa-sun' : 'fa-moon'}`);
};

export const render = async () => {
  const ciudades = [
    { ciudad: 'Lima', pais: 'Perú', zona: 'America/Lima', codigo: 'pe' },
    { ciudad: 'Tokio', pais: 'Japón', zona: 'Asia/Tokyo', codigo: 'jp' }
  ];
  
  const marcas = crearMarcasReloj();
  
  return `
    <div class="wihora">
      ${ciudades.map(c => `
        <div class="wihora_card" data-zona="${c.zona}">
          <div class="wihora_card_content">
            <div class="wihora_analogico">
              <div class="wihora_reloj_face">
                <div class="wihora_reloj_marks">${marcas}</div>
                <div class="wihora_hand wihora_hand_hour"></div>
                <div class="wihora_hand wihora_hand_minute"></div>
                <div class="wihora_hand wihora_hand_second"></div>
                <div class="wihora_reloj_center"></div>
              </div>
            </div>
            
            <div class="wihora_digital_section">
              <div class="wihora_header_info">
                <img src="${wiFlag(c.codigo)}" alt="${c.pais}" class="wihora_flag">
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
                  <i class="fas fa-globe"></i>
                  <span class="wihora_gmt">GMT</span>
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
  `;
};

export const init = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  
  const ciudades = [
    { zona: 'America/Lima' },
    { zona: 'Asia/Tokyo' }
  ];
  
  $('.wihora_card').each((idx, card) => {
    const $card = $(card);
    const ciudad = ciudades[idx];
    
    actualizarReloj(ciudad, $card);
    const interval = setInterval(() => actualizarReloj(ciudad, $card), 1000);
    clockIntervals.push(interval);
  });
};

export const cleanup = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
};