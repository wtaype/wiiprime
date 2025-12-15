import $ from 'jquery';
import { db } from '../../firebase/init.js';
import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { savels, getls, wiDate } from '../widev.js';

const fechabd = wiDate(Timestamp);
const col = 'publico', idd = 'labs';

export const render = () => `
  <div class="wilabs">
    <h3 id="tit">📅 wiDate</h3>
    <input id="dia" type="date">
    <input id="esc" type="datetime-local">
    <button id="btn">💾</button>
    <div id="res"></div>
    <div id="out"></div>
  </div>
`;

export const init = () => {
  $('#btn').click(async () => {
    await setDoc(doc(db, col, idd), {
      nombre: 'Wilder',
      descripcion: $('#tit').text(),
      creacion: serverTimestamp(),
      dia: fechabd.save($('#dia').val()),
      escogido: fechabd.save($('#esc').val())
    }, { merge: true });
    localStorage.removeItem(`${col}_${idd}`);
    $('#res').text('✅ Guardado');
  });
  
  (async () => {
    const key = `${col}_${idd}`;
    let dat = getls(key);
    
    if (!dat) {
      $('#res').text('🔥 Firebase');
      dat = (await getDoc(doc(db, col, idd))).data();
      if (dat) {
        savels(key, {
          ...dat,
          creacion: dat.creacion?.seconds,
          dia: dat.dia?.seconds,
          escogido: dat.escogido?.seconds
        });
      }
    } else {
      $('#res').text('📦 Caché');
    }

    if (dat) {
      $('#out').html(`
        👤 ${dat.nombre} | 📝 ${dat.descripcion}<br><br>
        🔥 Creación: ${fechabd.get(dat.creacion)}<br>
        📅 Día: ${fechabd.get(dat.dia)} <input type="date" value="${fechabd.get(dat.dia, 'iso')}"><br>
        ⏰ Escogido: ${fechabd.get(dat.escogido)} <input type="datetime-local" value="${fechabd.get(dat.escogido, 'full')}">
      `);
    }
  })();
};

export const cleanup = () => $('#btn').off('click');