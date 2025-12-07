import $ from 'jquery';
import { rutas } from './rutas.js';
import { wiSmart, getls, savels, removels, Mensaje } from './widev.js';
wiSmart({ js: [() => import('./wiauth.js')] });

export function personal(wi) {
  Mensaje?.('Bienvenido '+wi.nombre);
  $('.wiauth').html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${wi.imagen||'./smile.png'}" alt="${wi.nombre}"><span>${wi.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `);
  rutas.navigate('/smile');
} // Funcion para Auth personal 

export const header = (() => {
  let wi = getls('wiSmile'); wi ? cargandoPersonal(wi) : publico(); //Cache Primero

  function publico() {
    $('.wiauth').html(`<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>`);
  }

  async function cargandoPersonal(wi) {
    personal(wi);
//ACTUALIZAR CAMBIOS EN TIEMPO REAL
    const { auth, onAuthStateChanged } = await import('./wiauth.js');
    onAuthStateChanged(auth, user => {
      if (!user) return removels('wiSmile'), publico();
    });
  }
//CERRAR SESSIÓN
  $(document).on('click', '.bt_salir', async () => {
    const { auth, signOut } = await import('./wiauth.js');
    await signOut(auth); removels('wiSmile wiciudades wifechas'); publico(); rutas.navigate('/');
  }); 

})();

