import $ from 'jquery';
import { wiHoras } from './wihoras.js';
import { wiMeses } from './wimeses.js'; 
import { wiSpin } from '../widev.js';

export const actualizado = async () => {
  // Botón actualizar
    $(document).on('click', '.wfresh', async function() {
      wiSpin(this, true, 'Actualizando', 500); 
      await Promise.all([wiHoras(), wiMeses()]);
  
    });
}