import './smile.css';
import $ from 'jquery';
import { wiIp, savels, getls } from '../widev.js';
import { modTiempos } from './wifechas.js';
import { modCalendario } from './wicalendar.js';
import { wiUpdate } from './wiupdate.js';

let ui={geo:null};

export const render=async()=>{
  ui.geo=getls('smileIP')||await new Promise(r=>wiIp(d=>(savels('smileIP',d,24),r(d))));
  return `<div class="wtm_hd"><div class="hd_info"><h2 class="wtm_ttl"><i class="fas fa-clock"></i> Mi Dashboard</h2><p class="wtm_sub">Zonas horarias y calendario</p></div>
  <button class="btn wi-sync" data-act="sync"><i class="fas fa-sync"></i> Actualizar</button></div>
  <div class="wtm_lay"><div id="zonaTiempo"></div><div id="zonaCalendario"></div></div>`;
};

export const init=async()=>{
  await Promise.all([modTiempos.init('#zonaTiempo',ui.geo),modCalendario.init('#zonaCalendario')]);
  $(document)
    .on('click.sm','[data-act="sync"]',function(){wiUpdate.smartSync(this,()=>Promise.all([modTiempos.actualizar(),modCalendario.actualizar()]));})
    .on('keydown.sm',e=>{if(e.key==='Escape'){$('.wiModal').removeClass('active');$('body').removeClass('modal-open');}})
    .on('click.sm','.wiModal',function(e){if(e.target===this){$(this).removeClass('active');$('body').removeClass('modal-open');}});
};

export const destroy=()=>{modTiempos.destroy();modCalendario.destroy();$(document).off('.sm');};