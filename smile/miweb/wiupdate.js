import $ from 'jquery';
import { wiSpin, Notificacion } from '../widev.js';

export const wiUpdate={
  // Botón smart: spinner + deshabilitar + promesa + feedback
  smartSync(btn, task){wiSpin(btn,true,'Actualizando'); return Promise.resolve().then(task)
    .then(()=>{wiSpin(btn,false,'Actualizar'); Notificacion('Sincronizado','success');})
    .catch(e=>{wiSpin(btn,false,'Actualizar'); Notificacion(e?.message||'Error al sincronizar','error');});}
};