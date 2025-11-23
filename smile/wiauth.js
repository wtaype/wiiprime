import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth, db } from '../firebase/init.js';
import './wimodal.js'; 

// Auth imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

// Firestore imports
import { getFirestore, setDoc, getDoc, deleteDoc, onSnapshot, 
  collection, doc, updateDoc, query, where, getDocs, serverTimestamp} from "firebase/firestore";

// widev imports
import { witip, Mensaje, Notificacion, fechaLocal, savels, getls, removels, calcularEdad, wiSpin } from './widev.js';

export function wiAuth(){

const showLogin = `
<div id="loginModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Login</h2>
      
      <form id="loginForm" class="dfd">
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Email o usuario" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-check">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Recordar mis datos</label>
        </div>
        <button type="button" id="Login" class="inactivo btn-auth">Iniciar Sesión</button>
      </form>
      
      <div class="auth-links">
        <span class="olvidastePass">¿Olvidaste tu contraseña?</span>
        <span class="crearCuenta">Crear cuenta</span>
      </div>
    </div>
  </div>
</div>`;

const showRegistro = `
<div id="registroModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Crear Cuenta</h2>
      
      <form id="registroForm" class="dfd">
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-envelope"></i>
            <input type="email" id="regEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user"></i>
            <input type="text" id="regUsuario" placeholder="Crear usuario" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regNombre" placeholder="Nombre" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regApellidos" placeholder="Apellidos" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword1" placeholder="Confirmar Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <button type="button" id="Registrar" class="inactivo btn-auth">Registrarme</button>
      </form>
      
      <div class="auth-links">
        <span class="conCuenta">Ya tengo cuenta</span>
      </div>
    </div>
  </div>
</div>`;

const showRestablecer = `
<div id="recuperarModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Restablecer Contraseña</h2>
      <form id="recuperarForm" class="dfd">
        <p class="auth-text">Ingresa tu Correo o usuario:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="recEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <p class="auth-text">Valida tu fecha de nacimiento:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-cake-candles"></i>
            <input type="date" id="recFechaNacimiento" placeholder="Fecha Nacimiento" class="datepicker" required>
          </div>
        </div>
        <button type="button" id="Recuperar" class="inactivo btn-auth">Restablecer Contraseña</button>
      </form>
      <div class="auth-links">
        <span class="volverLogin"><i class="fas fa-arrow-left"></i> Volver a Inicio</span>
      </div>
    </div>
  </div>
</div>`;


// PARA LOS EVENTOS 
$(function(){
  let midb = 'smiles';  //Para base de datos 
  let wiAuthIn = 'wiAuthIn';  //Para guardar auth en localstorage
  let rol = 'usuario' //Rol default


  // Navegación entre modales
  $(document).on('click', '.login', () => abrirModal('loginModal'));
  $(document).on('click', '.registrar', () => abrirModal('registroModal'));
  $('.crearCuenta').click(() => { abrirModal('registroModal'); cerrarModal('loginModal'); });
  $('.conCuenta').click(() => { abrirModal('loginModal'); cerrarModal('registroModal'); });
  $('.olvidastePass').click(() => { abrirModal('recuperarModal'); cerrarModal('loginModal'); });
  $('.volverLogin').click(() => { abrirModal('loginModal'); cerrarModal('recuperarModal'); });
  

  $('.togglePass').click(function() {
    const input = $(this).siblings('input');
    const isPassword = input.attr('type') === 'password';
    input.attr('type', isPassword ? 'text' : 'password');
    $(this).toggleClass('fa-eye fa-eye-slash');
  }); // Toggle password visibilidad

  $('.miauth input:not([type="checkbox"])').on('click', function() {
    witip(this, $(this).attr('placeholder'));
  }); //Tooltips validaciones 

  $('#regUsuario, #regEmail, #email, #recEmail').on('input', function() {
    $(this).val($(this).val().toLowerCase().trim());
  }); // Conversión a minúsculas

  [['#password','#Login'], ['#regPassword1','#Registrar'], ['#recEmail','#Recuperar']].forEach(([input, btn]) => {
    $(input).on('input keyup', e => {
      $(btn).removeClass('inactivo'); // 🌟 BRILLAR COMO EL SOL
      e.key === 'Enter' && ($(btn).click(), $(btn).addClass('inactivo')); // Click + Procesando
    });
  }); // Tecla Enter para login y registro

  const validacionesRegistro = {
      regEmail: [v => v.toLowerCase(), v => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) || 'Correo inválido'],
      regUsuario: [v => v.toLowerCase().replace(/[^a-z0-9_]/g, ''), v => v.length >= 4 || 'Usuario 4-20 caracteres'],
      regNombre: [v => v.trim(), v => v.length > 0 || 'Ingrese nombre'],
      regApellidos: [v => v.trim(), v => v.length > 0 || 'Ingrese apellidos'],
      regPassword: [v => v, v => v.length >= 6 || 'Mínimo 6 caracteres'],
      regPassword1: [v => v, v => v === $('#regPassword').val() || 'Contraseñas no coinciden']
  };
  $.each(validacionesRegistro, function(id, [tis, validado]) {
    $(`#${id}`).on('blur', function() {
      const vl = tis($(this).val());  $(this).val(vl);
      const result = validado(vl);
      if (result !== true) witip(this, result, 'error');
    });
  }); // Validaciones en tiempo real

  let usuarioListo = false;
  $('#regUsuario').on('blur focus', async function(){
    const usuarioVL = $(this).val();
    if(usuarioVL.length >= 3){
      try{
        const busq = await getDoc(doc(db, midb, usuarioVL));
      const existe = busq.exists();  usuarioListo = !existe; //Para validar
      const mensaje = `Usuario ${existe ? 'no disponible' : 'disponible ✅'}`;
      witip(this, mensaje, existe ? 'error' : 'success','top',7000);
      }catch(e){console.error(e)}
    }
  }); // Validaciones para el usuario disponible con firestore

  let emailListo = false;
  $('#regEmail').on('blur focus', async function(){
    const emailVL = $(this).val();
    if(emailVL.length >= 3){
      try{
        const busq = await getDocs(query(collection(db, midb), where('email', '==', emailVL)));
        const existe = !busq.empty; emailListo = !existe; //Para validar
        const mensaje = `Email ${existe ? 'no disponible' : 'disponible ✅'}`;
        witip(this, mensaje, existe ? 'error' : 'success','top',7000);
      }catch(e){console.error(e)}
    }
  }); // Validación para email disponible con firestore

$('#Registrar').click(async function(){
  wiSpin(this, true, 'Registrando');
  const todasValidaciones = [[usuarioListo, $('#regUsuario')[0], 'Usuario no disponible'], [emailListo, $('#regEmail')[0], 'Email no disponible'],
    ...Object.entries(validacionesRegistro).map(([id, [tis, validado]]) => {
      const campo = $(`#${id}`), vl = tis(campo.val()), result = validado(vl);
      return [result === true, campo[0], result !== true ? result : ''];
  })]; // Validando las entradas
  for (const [listo, campo, mensaje] of todasValidaciones) {
    if (!listo && mensaje && (wiSpin(this, false), witip(campo, mensaje, 'error'), campo.focus(), true)) return;
  } // Validando las entradas con mensaje para registrar

  try {
    //Trayendo valores listos y verificados
    const campos = ['regEmail', 'regUsuario', 'regNombre', 'regApellidos',  'regPassword'];
    const [email, usuario, nombre, apellidos, password] = campos.map(id=> $('#' + id).val().trim());
    
    // REGISTRANDO EN AUTH 
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await Promise.all([updateProfile(user, { displayName: usuario}), sendEmailVerification(user)]); 
    console.log('Registro completo en Auth ✅' + Date());
    
    // REGISTRANDO EN FIRESTORE 
    const wisave = doc(db, midb, usuario);
    await setDoc(wisave,{
      usuario,     
      email,         
      nombre,     
      apellidos,  
      rol,    
      creacion: serverTimestamp(),
      uid: user.uid
    });
    console.log('Registro completo en Firestore ✅' + Date());
    Mensaje('Registro completado! ✅');

  }catch(e){Mensaje({'auth/email-already-in-use': 'Email ya registrado', 'auth/weak-password': 'Contraseña muy débil'}[e.code] || e.message) || console.error(e);}
  finally{savels(wiAuthIn,'wIn',24);  cerrarModal('registroModal');wiSpin(this, false);}
});

// LOGIN CENTER APP 
$('#Login').click(async function() {
  wiSpin(this, true, 'Iniciando sessión');
  try {
    const [usuario, password] = ['#email', '#password'].map(id => $(id).val());
    const esEmail = usuario.includes('@');
    const busq = !esEmail ? await getDoc(doc(db, midb, usuario)) : null;
    if (!esEmail && !busq.exists()) throw new Error('Usuario no encontrado');
    const email = esEmail ? usuario : busq.data().email;
    await signInWithEmailAndPassword(auth, email, password);

    savels(wiAuthIn,'wIn',24); 
  } catch(e) {
    const err = {'auth/invalid-credential':'Contraseña incorrecta','auth/invalid-email':'Falta registrar Email','auth/missing-email':'Email o usuario no registrado'};
    Mensaje(err[e.code] || e.message, 'error'); console.error(e);
  } finally {cerrarModal('loginModal');wiSpin(this, false);}
});

// RECUPERAR CENTER APP 
$('#Recuperar').click(async function() {
  wiSpin(this, true, 'Restablecer Contraseña'); 
  
  try {
    const [campo, fecha] = ['#recEmail', '#recFechaNacimiento'].map(id => $(id).val());
    
    // Convertir + validar usuario
    const email = campo.includes('@') ? campo : await (async () => {
      const b = await getDoc(doc(db, midb, campo));
      return b.exists() ? b.data().email : null;
    })();
    if (!email) return Mensaje('Usuario no registrado', 'error');
    
    // Buscar + validar email
    const busq = await getDocs(query(collection(db, midb), where('email', '==', email)));
    if (busq.empty) return Mensaje('Email incorrecto o no existe', 'error');
    
    // Validar fecha
    const fechabd = busq.docs[0].data().fechaNacimiento.toDate().toISOString().split('T')[0];
    if (fechabd !== fecha) return Mensaje('Fecha de nacimiento incorrecta', 'error');
    
    // Enviar
    await sendPasswordResetEmail(auth, email);
    Mensaje('Se envió correo para restablecer su contraseña, revisa en principal o spam ✅', 'success');
    
  }catch(e){console.error(e);}finally {wiSpin(this, false);}
});

}); // FUNCTIONS LISTO $(FUNCTION(){}) [END]
$('body').append(showLogin + showRegistro + showRestablecer); //Actualizando en body 

} wiAuth();
 