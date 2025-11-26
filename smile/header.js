import $ from 'jquery';
import { auth, db } from '../firebase/init.js';
import { doc, getDoc} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getls, savels, removels, Mensaje } from './widev.js';
import { wiSmart } from './wii.js';
wiSmart({js: ['./wiauth.js']});
// import './wiauth.js';

export const header = (() => {
 // 🚀 CARGA INSTANTÁNEA
  (function () {
    let wi = getls('wiSmile'); wi ? personal(wi) : publico(); //Validando si tiene cache 
  })();

  function publico() {
    $('.wiauth').html(`<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>`);
  }
  
  function personal(wi) {
    Mensaje('Bienvenido '+wi.nombre);
    $('.wiauth').html(`
      <div class="sesion">
        <img src="${wi.imagen||'./smile.png'}" alt="${wi.nombre}"><span>${wi.nombre}</span>
      </div>
      <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
    `);
  }
  // ⚡ VALIDACIÓN FIREBASE
  onAuthStateChanged(auth, async user => {
    if (!user) return removels('wiSmile'), publico();

    let wi = getls('wiSmile');
    if (wi && wi.usuario === user.displayName) return;

    try {
      let snap = await getDoc(doc(db, 'smiles', user.displayName)); let widatos = snap.data();
      if (widatos) savels('wiSmile', widatos, 450), personal(widatos);
    } catch (e){console.error(e);}
  });

  // CERRAR SESIÓN
  $(document).on('click', '.bt_salir', async () => {
    await signOut(auth); removels('wiSmile'); publico();
  });

})();
 