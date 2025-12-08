import $ from 'jquery';
import { wiFlag, infoCiudad, formatoHora, esNoche, wiCiudades } from './widev.js';

// 🔍 BUSCAR CIUDADES
export const whBuscar = (query) => {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  return Object.values(wiCiudades).flat()
    .filter(c => c.ciudad.toLowerCase().includes(q) || c.pais.toLowerCase().includes(q))
    .slice(0, 5);
};

// 🎨 CREAR MARCAS DEL RELOJ (REUTILIZABLE)
const crearMarcas = () => {
  let html = '';
  for (let i = 0; i < 60; i++) {
    const deg = i * 6;
    const cls = i % 5 === 0 ? 'wi_mark wi_mark_hr' : 'wi_mark wi_mark_min';
    const y = i % 5 === 0 ? -90 : -60;
    html += `<div class="${cls}" style="transform:rotate(${deg}deg) translateY(${y}px)"></div>`;
  }
  return html;
};

// 🕐 CREAR RELOJ PRINCIPAL (wi_main)
export const crearRelojMain = (datos) => {
  const { ciudad, zona, codigo, region, gmt, ip, dispositivo, pantalla } = datos;
  const info = infoCiudad(zona);
  if (!info) return '';

  const isDia = esNoche(info.hora);
  const cls = isDia ? 'es-dia' : 'es-noche';
  const icon = isDia ? 'fa-sun' : 'fa-moon';
  const estacion = info.estacion || 'Primavera';

  return `
<div class="wi_main">
  <div class="wi_card_main ${cls}" data-zona="${zona}">
    <div class="wi_main_cnt">
      <div class="wi_analogico">
        <div class="wi_reloj_face">
          <div class="wi_reloj_marks">${crearMarcas()}</div>
          <div class="wi_hand wi_hand_hr"></div>
          <div class="wi_hand wi_hand_min"></div>
          <div class="wi_hand wi_hand_sec"></div>
          <div class="wi_reloj_center"></div>
        </div>
      </div>
      <div class="wi_digital">
        <div class="wi_header_info">
          <img src="${wiFlag(codigo)}" class="wi_flag">
          <div class="wi_location">
            <h3 class="wi_ciudad">${ciudad}</h3>
            <p class="wi_pais">${codigo}</p>
          </div>
          <div class="wi_icon"><i class="fas ${icon}"></i></div>
        </div>
        <div class="wi_time">${formatoHora.convertir(info.hora)}</div>
        <div class="wi_fecha">${info.fecha}</div>
        <div class="wi_info">
          <div class="wi_info_item"><i class="fas fa-map-marker-alt"></i><span>${region || ciudad}</span></div>
          <div class="wi_info_item"><i class="fas fa-globe"></i><span>${gmt || info.gmt}</span></div>
          <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${estacion}</span></div>
        </div>
        <div class="wi_ip_info">
          <div class="wi_ip_item"><i class="fas fa-network-wired"></i><span>IP: ${ip || 'N/A'}</span></div>
          <div class="wi_ip_item"><i class="fas fa-desktop"></i><span>${dispositivo || 'Desconocido'}</span></div>
          <div class="wi_ip_item"><i class="fas fa-tv"></i><span>${pantalla || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// 🕐 CREAR RELOJ COMPACTO (wi_grid)
export const crearRelojCompact = (datos) => {
  const { id, ciudad, zona, codigo, pais } = datos;
  const info = infoCiudad(zona);
  if (!info) return '';

  const isDia = esNoche(info.hora);
  const cls = isDia ? 'es-dia' : 'es-noche';
  const icon = isDia ? 'fa-sun' : 'fa-moon';

  // Calcular diferencia horaria con Lima
  const limaInfo = infoCiudad('America/Lima');
  const extractGMT = (gmt) => parseInt(gmt.match(/GMT([+-]?\d+)/)?.[1] || 0);
  const diff = extractGMT(info.gmt) - extractGMT(limaInfo.gmt);
  const diffHtml = diff === 0 
    ? '<i class="fas fa-exchange-alt"></i> Misma hora'
    : diff > 0 
      ? `<i class="fa-solid fa-rotate-right"></i> +${diff}h`
      : `<i class="fa-solid fa-rotate-left"></i> ${diff}h`;

  return `
<div class="wi_card_compact ${cls}" data-id="${id}" data-zona="${zona}">
  <div class="wi_compact_hd">
    <div class="wi_compact_acts">
      <i class="fas fa-cloud nub"></i>
      <button class="ico" data-act="x"><i class="fas fa-trash"></i></button>
    </div>
  </div>
  <div class="wi_compact_cnt">
    <div class="wi_analogico_small">
      <div class="wi_reloj_face">
        <div class="wi_reloj_marks">${crearMarcas()}</div>
        <div class="wi_hand wi_hand_hr"></div>
        <div class="wi_hand wi_hand_min"></div>
        <div class="wi_hand wi_hand_sec"></div>
        <div class="wi_reloj_center"></div>
      </div>
    </div>
    <div class="wi_digital_compact">
      <div class="wi_header_info">
        <img src="${wiFlag(codigo)}" class="wi_flag">
        <div class="wi_location">
          <h3 class="wi_ciudad">${ciudad}</h3>
          <p class="wi_pais">${pais}</p>
        </div>
        <div class="wi_icon"><i class="fas ${icon}"></i></div>
      </div>
      <div class="wi_time">${formatoHora.convertir(info.hora)}</div>
      <div class="wi_fecha">${info.fecha}</div>
      <div class="wi_info">
        <div class="wi_info_item"><i class="fas fa-clock"></i><span class="wi_diferencia">${diffHtml}</span></div>
        <div class="wi_info_item"><i class="fas fa-globe"></i><span>${info.gmt}</span></div>
        <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${info.estacion}</span></div>
      </div>
    </div>
  </div>
</div>`;
};

// ⏰ ACTUALIZAR AGUJAS
const actualizarAgujas = ($card, hora24) => {
  const [h, m, s] = hora24.split(':').map(Number);
  $card.find('.wi_hand_sec').css('transform', `translateX(-50%) rotate(${s * 6}deg)`);
  $card.find('.wi_hand_min').css('transform', `translateX(-50%) rotate(${m * 6 + s * 0.1}deg)`);
  $card.find('.wi_hand_hr').css('transform', `translateX(-50%) rotate(${((h % 12) * 30) + m * 0.5}deg)`);
};

// 🔄 ACTUALIZAR TODOS LOS RELOJES
export const actualizarRelojes = () => {
  $('.wiHoras [data-zona]').each(function() {
    const zona = $(this).data('zona');
    const info = infoCiudad(zona);
    if (!info) return;

    const isDia = esNoche(info.hora);
    $(this).toggleClass('es-dia', isDia).toggleClass('es-noche', !isDia);
    $(this).find('.wi_icon i').attr('class', `fas ${isDia ? 'fa-sun' : 'fa-moon'}`);
    $(this).find('.wi_time').text(formatoHora.convertir(info.hora));
    $(this).find('.wi_fecha').text(info.fecha);
    
    actualizarAgujas($(this), info.hora);
  });
};

// 🔄 INICIAR LOOP
export const iniciarRelojes = () => setInterval(actualizarRelojes, 1000);