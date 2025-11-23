import $ from 'jquery';
import { wiCiudades, wiHoraCiudad, flagUrl, wiEsDia, savels, getls, Saludar } from '../widev.js';

let clockIntervals = [];
let clockFormat = getls('wiClockFormat') || '24'; // ✅ Default 24h
let limaHora = null; // Hora de Lima de referencia

const calcularDiferenciaHoraria = (horaActual) => {
  if (!limaHora) return '';
  
  const [hL, mL] = limaHora.split(':').map(Number);
  const [hA, mA] = horaActual.split(':').map(Number);
  
  const minutosLima = hL * 60 + mL;
  const minutosActual = hA * 60 + mA;
  
  let diferencia = minutosActual - minutosLima;
  
  // Ajustar para cambios de día
  if (diferencia > 720) diferencia -= 1440;
  if (diferencia < -720) diferencia += 1440;
  
  const horas = Math.floor(Math.abs(diferencia) / 60);
  const minutos = Math.abs(diferencia) % 60;
  
  // 🚀 Nuevo formato más eficiente
  if (diferencia === 0 && minutos === 0) {
    return `<span class="misma-hora">Misma hora</span>`;
  } else if (diferencia > 0) {
    const tiempoTexto = minutos > 0 ? `+${horas}h ${minutos}m` : `+${horas}h`;
    return `<span class="adelantado">Adelantado ${tiempoTexto}</span>`;
  } else {
    const tiempoTexto = minutos > 0 ? `-${horas}h ${minutos}m` : `-${horas}h`;
    return `<span class="atrasado">Atrasado ${tiempoTexto}</span>`;
  }
};

const convertirA12h = (hora24) => {
  const [h, m, s] = hora24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${ampm}`;
};

const actualizarReloj = (ciudad, $card) => {
  try {
    const data = wiHoraCiudad(ciudad.zona);
    if (!data) return;
    
    // 🚀 Guardar hora de Lima como referencia
    if (ciudad.ciudad === 'Lima') {
      limaHora = data.hora;
      // 🦍 Actualizar saludo dinámicamente con "Gorila"
      const saludo = Saludar(data.hora);
      $('.wihora_title').html(`${saludo} Gorila`);
    }
    
    // ✅ Mostrar hora según formato seleccionado
    const hora = clockFormat === '12' ? convertirA12h(data.hora) : data.hora;
    
    const esDia = wiEsDia(data.hora);
    const diferencia = ciudad.ciudad !== 'Lima' ? calcularDiferenciaHoraria(data.hora) : '';
    
    $card.find('.wihora_time').text(hora);
    $card.find('.wihora_fecha').text(data.fecha);
    $card.find('.wihora_gmt').text(data.gmt);
    $card.find('.wihora_estacion').text(data.estacion);
    $card.find('.wihora_diferencia').html(diferencia);
    $card.find('.wihora_icon i').attr('class', `fas ${esDia ? 'fa-sun' : 'fa-moon'}`);
  } catch (error) {
    console.error('Error actualizando reloj:', error);
  }
};

export const render = async () => {
  const ciudades = wiCiudades.principales;
  
  // 🦍 Obtener saludo inicial con "Gorila"
  const limaData = wiHoraCiudad('America/Lima');
  const saludoInicial = limaData ? Saludar(limaData.hora) : '¡Hola!';
  
  return `
    <div class="wihora">
      <div class="wihora_header">
        <h1 class="wihora_title">${saludoInicial} <span class="wihora_subtitle">Gorila</span></h1>
        <div class="wihora_controls">
          <button class="wibtn wibtn_format ${clockFormat === '24' ? 'active' : ''}" data-format="24">
            <i class="fas fa-clock"></i> 24h
          </button>
          <button class="wibtn wibtn_format ${clockFormat === '12' ? 'active' : ''}" data-format="12">
            <i class="far fa-clock"></i> 12h
          </button>
        </div>
      </div>
      
      <div class="wihora_grid">
        ${ciudades.map(c => `
          <div class="wihora_card" data-zona="${c.zona}">
            <div class="wihora_card_header">
              <img src="${flagUrl(c.codigo)}" alt="${c.pais}" class="wihora_flag" />
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
                <i class="fas fa-exchange-alt"></i>
                <span class="wihora_diferencia"></span>
              </div>
              <div class="wihora_info_item">
                <i class="fas fa-globe"></i>
                <span class="wihora_gmt">GMT+00:00</span>
              </div>
              <div class="wihora_info_item">
                <i class="fas fa-leaf"></i>
                <span class="wihora_estacion">Primavera</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

export const init = () => {
  // Limpiar intervalos anteriores
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
  
  // Inicializar relojes
  $('.wihora_card').each((_, card) => {
    const $card = $(card);
    const zona = $card.data('zona');
    const ciudad = wiCiudades.principales.find(c => c.zona === zona);
    
    if (ciudad) {
      // Actualizar inmediatamente
      actualizarReloj(ciudad, $card);
      
      // Actualizar cada segundo
      const interval = setInterval(() => actualizarReloj(ciudad, $card), 1000);
      clockIntervals.push(interval);
    }
  });
  
  // ✅ Evento para cambiar formato 24h/12h
  $('.wibtn_format').off('click').on('click', function() {
    const nuevoFormato = $(this).data('format');
    
    // Solo actualizar si cambió el formato
    if (clockFormat !== nuevoFormato) {
      clockFormat = nuevoFormato;
      
      // Actualizar clases activas
      $('.wibtn_format').removeClass('active');
      $(this).addClass('active');
      
      // Guardar preferencia
      savels('wiClockFormat', clockFormat, 720);
      
      // ✅ Actualizar todos los relojes inmediatamente con animación
      $('.wihora_card').each((_, card) => {
        const $card = $(card);
        const $time = $card.find('.wihora_time');
        
        // Animación de cambio
        $time.addClass('changing');
        setTimeout(() => $time.removeClass('changing'), 400);
        
        const zona = $card.data('zona');
        const ciudad = wiCiudades.principales.find(c => c.zona === zona);
        if (ciudad) actualizarReloj(ciudad, $card);
      });
      
      console.log(`🔄 Formato cambiado a ${clockFormat}h`);
    }
  });
  
  console.log(`🕐 Módulo de Hora inicializado (modo ${clockFormat}h)`);
};

export const cleanup = () => {
  clockIntervals.forEach(clearInterval);
  clockIntervals = [];
};