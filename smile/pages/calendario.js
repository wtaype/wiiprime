import $ from 'jquery';

// =============================================
// MÓDULO DE CALENDARIO
// =============================================

export const render = async () => {
  const now = new Date();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  return `
    <div class="wicalendar">
      <div class="wicalendar_header">
        <h2>${monthNames[now.getMonth()]} ${now.getFullYear()}</h2>
        <p class="wicalendar_subtitle">Calendario próximamente disponible</p>
      </div>
      
      <div class="wicalendar_placeholder">
        <i class="fas fa-calendar-alt" style="font-size: 8vw; color: var(--mco); opacity: 0.3;"></i>
        <p style="font-size: var(--fz_c6); color: var(--tx); margin-top: 2vh;">
          Esta sección está en desarrollo
        </p>
        <p style="font-size: var(--fz_c2); color: var(--tx); opacity: 0.7; margin-top: 1vh;">
          Pronto podrás ver un calendario completo con eventos y recordatorios
        </p>
      </div>
    </div>
  `;
};

export const init = () => {
  console.log('📅 Módulo de Calendario inicializado');
};

export const cleanup = () => {
  // Limpiar si es necesario
};
