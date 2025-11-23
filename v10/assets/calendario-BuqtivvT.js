import"./main-CBy4Jd8h.js";import"./vendor-B2AETYxa.js";import"./firebase-oQ0U6Yya.js";const t=async()=>{const o=new Date;return`
    <div class="wicalendar">
      <div class="wicalendar_header">
        <h2>${["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][o.getMonth()]} ${o.getFullYear()}</h2>
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
  `},n=()=>{console.log("📅 Módulo de Calendario inicializado")},c=()=>{};export{c as cleanup,n as init,t as render};
