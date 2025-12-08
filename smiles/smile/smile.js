import './smile.css';
import $ from 'jquery';
import { wiIp, savels, getls } from '../widev.js';

let gps = null; 
export const render = async () => {
  gps = getls('smileIP') || await new Promise(res => wiIp(dat => (savels('smileIP', dat), res(dat)))); //Datos IP
  
  console.log('🌍 IP:', gps?.ip);

  return `
    <div class="wtm_hd">
      <div class="hd_info">
        <h2 class="wtm_ttl">
          <i class="fas fa-smile-beam"></i> Bienvenidos
        </h2>
        <p class="wtm_sub">Disfruta de WiiPrime 😄</p>
      </div>
    </div>
    <div class="wtm_lay wtm_lay--center">
      <div class="smile_box">
        <i class="fas fa-grin-stars smile_icon"></i>
        <h3 class="smile_title">Tu panel de sonrisas está en construcción</h3>
        <p class="smile_text">
          Muy pronto verás aquí estadísticas, logros y más sorpresas.
        </p>
      </div>
    </div>
  `;
};

export const init = async () => {
  // Solo ejemplo ligero: pequeño efecto al cargar
  // $('.smile_box').hide().fadeIn(400);
  console.log('😊 Smile iniciado');
  
  $('.smile_text').click(function(){
    alert('¡Eres genial por descubrir esto! 😄');
  });
};

export const cleanup = () => {
  // No hay eventos globales, solo reseteamos estado por buena práctica
  gps = null; 
  console.log('😊 Smile limpiado');
};