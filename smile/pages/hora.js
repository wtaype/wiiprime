import $ from 'jquery';
import { savels, getls, Notificacion } from '../widev.js';

// =============================================
// MÓDULO DE HORA - RELOJ DIGITAL
// =============================================

let clockConfig = {
  format: getls('clockFormat') || '24',
  showDate: getls('clockShowDate') || false,
  size: getls('clockSize') || 12
};

let clockInterval = null;

// Función para actualizar el reloj
const updateClock = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  let displayHours = hours;
  let ampm = '';
  
  if (clockConfig.format === '12') {
    ampm = hours >= 12 ? 'PM' : 'AM';
    displayHours = hours % 12 || 12;
    $('#clockAmPm').text(ampm).show();
  } else {
    $('#clockAmPm').hide();
  }
  
  const timeString = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  $('#clockTime').text(timeString);
  
  if (clockConfig.showDate) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('es-ES', options);
    const capitalizedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    $('#clockDate').text(capitalizedDate).show();
  } else {
    $('#clockDate').hide();
  }
};

// Renderizar contenido HTML
export const render = async () => {
  return `
    <!-- RELOJ DIGITAL -->
    <div class="wiclock">
      <div class="wiclock_time" id="clockTime">21:05:58</div>
      <div class="wiclock_date" id="clockDate" style="display: none;">Miércoles, 20 de Noviembre de 2025</div>
      <div class="wiclock_ampm" id="clockAmPm" style="display: none;">PM</div>
    </div>

    <!-- FOOTER DE PERSONALIZACIÓN -->
    <footer class="wifooter">
      <div class="wifooter_section">
        <label class="wilabel">Formato:</label>
        <div class="wibtn_group">
          <button class="wibtn wibtn_format ${clockConfig.format === '24' ? 'active' : ''}" data-format="24">24h</button>
          <button class="wibtn wibtn_format ${clockConfig.format === '12' ? 'active' : ''}" data-format="12">12h</button>
        </div>
      </div>

      <div class="wifooter_section">
        <label class="wilabel">
          <input type="checkbox" id="toggleDate" class="witoggle" ${clockConfig.showDate ? 'checked' : ''} />
          <span>Mostrar Fecha</span>
        </label>
      </div>

      <div class="wifooter_section">
        <label class="wilabel">Tamaño:</label>
        <input type="range" id="clockSize" class="wirange" min="8" max="20" value="${clockConfig.size}" step="0.5" />
        <span class="wirange_value" id="sizeValue">${clockConfig.size}vw</span>
      </div>
    </footer>
  `;
};

// Inicializar eventos y lógica
export const init = () => {
  // Restaurar tamaño
  $('#clockTime').css('font-size', `${clockConfig.size}vw`);
  
  // Actualizar reloj inmediatamente
  updateClock();
  
  // Limpiar intervalo anterior si existe
  if (clockInterval) {
    clearInterval(clockInterval);
  }
  
  // Actualizar cada segundo
  clockInterval = setInterval(updateClock, 1000);
  
  // Eventos de controles
  $('.wibtn_format').off('click').on('click', function() {
    const format = $(this).data('format');
    clockConfig.format = format;
    $('.wibtn_format').removeClass('active');
    $(this).addClass('active');
    savels('clockFormat', format, 720);
    updateClock();
    Notificacion(`Formato cambiado a ${format}h`, 'success', 1500);
  });
  
  $('#toggleDate').off('change').on('change', function() {
    clockConfig.showDate = $(this).is(':checked');
    savels('clockShowDate', clockConfig.showDate, 720);
    updateClock();
    const msg = clockConfig.showDate ? 'Fecha visible' : 'Fecha oculta';
    Notificacion(msg, 'success', 1500);
  });
  
  $('#clockSize').off('input').on('input', function() {
    const size = $(this).val();
    clockConfig.size = size;
    $('#clockTime').css('font-size', `${size}vw`);
    $('#sizeValue').text(`${size}vw`);
    savels('clockSize', size, 720);
  });
  
  console.log('🕐 Módulo de  inicializado');
};

// Limpiar al salir del módulo
export const cleanup = () => {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }
};
