import $ from 'jquery';
import { wiSmart } from './wii.js'; 
wiSmart({js: [() => import('./wiauth.js')]});
import { getls, savels, removels, Mensaje } from './widev.js';

export function personal(wi) {
  Mensaje?.('Bienvenido '+wi.nombre);
  $('.wiauth').html(`
    <div class="sesion">
      <img src="${wi.imagen||'./smile.png'}" alt="${wi.nombre}"><span>${wi.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `);
} // Funcion para Auth personal 

export const header = (() => {
  let wi = getls('wiSmile'); wi ? cargandoPersonal(wi) : publico(); //Cache Primero

  function publico() {
    $('.wiauth').html(`<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>`);
  }

  async function cargandoPersonal(wi) {
    personal(wi);
    const [{ auth }, { onAuthStateChanged, signOut }] = await Promise.all([import('../firebase/init.js'), import('firebase/auth')]);
    onAuthStateChanged(auth, user => {if (!user) return removels('wiSmile'), publico();}); //Detecta si hay auth

    $(document).on('click', '.bt_salir', async () => {await signOut(auth); removels('wiSmile'); publico();});
  }
})();