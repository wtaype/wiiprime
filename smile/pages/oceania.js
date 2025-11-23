import $ from 'jquery';

// =============================================
// MÓDULO DE CRONÓMETRO
// =============================================

export const render = async () => {
  return `
    <div class="wistopwatch">
      <div class="wistopwatch_header">
        <h2>Cronómetro</h2>
        <p class="wistopwatch_subtitle">Cronómetro próximamente disponible</p>
      </div>
      
      <div class="wistopwatch_placeholder">
        <i class="fas fa-stopwatch" style="font-size: 8vw; color: var(--mco); opacity: 0.3;"></i>
        <p style="font-size: var(--fz_c6); color: var(--tx); margin-top: 2vh;">
          Esta sección está en desarrollo
        </p>
        <p style="font-size: var(--fz_c2); color: var(--tx); opacity: 0.7; margin-top: 1vh;">
          Pronto podrás usar un cronómetro con vueltas y temporizador
        </p>
      </div>
    </div>
  `;
};

export const init = () => {
  console.log('⏱️ Módulo de  inicializado');
};

export const cleanup = () => {
  // Limpiar si es necesario
};
