import $ from 'jquery';
import { crearRelojMain, crearRelojCompact, whBuscar, iniciarRelojes, actualizarRelojes } from '../widevs.js';
import { getls, savels, wiIp, formatoHora, Notificacion, wiFlag } from '../widev.js';
import { smile } from './smile.js';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';

export const wiHoras = async () => {
  const gps = getls('smileIP') || await new Promise(res => wiIp(d => (savels('smileIP', d), res(d))));

  $('.wiHoras').html(`
    <div class="whPrincipal"></div>
    <div class="whHeader">
      <div class="whBuscar_input">
        <input type="text" placeholder="Buscar ciudad o país...">
        <div class="whDropdown"></div>
      </div>
      <div class="whControles">
        <div class="whFormato">
          <button class="btn formato12 ${formatoHora.es12h() ? 'active' : ''}">12h</button>
          <button class="btn formato24 ${formatoHora.es24h() ? 'active' : ''}">24h</button>
        </div>
        <div class="whVistas">
          <button class="btn vistaGrid active"><i class="fas fa-th"></i></button>
          <button class="btn vistaLista"><i class="fas fa-list"></i></button>
        </div>
      </div>
    </div>
    <div class="whGrids"><div class="wi_grid"></div></div>
  `);

  // Reloj principal
  $('.whPrincipal').html(crearRelojMain({
    ciudad: gps.city,
    zona: gps.timezone,
    codigo: gps.country,
    region: gps.region,
    gmt: `GMT${gps.utcOffset >= 0 ? '+' : ''}${gps.utcOffset}`,
    ip: gps.ip,
    dispositivo: `${gps.device} • ${gps.browser}`,
    pantalla: gps.screen
  }));

  // Cargar relojes guardados
  const querySnapshot = await getDocs(collection(db, 'wiHoras'));
  const relojes = querySnapshot.docs.map(doc => doc.data()).sort((a, b) => a.orden - b.orden);
  relojes.forEach(r => $('.wi_grid').append(crearRelojCompact(r)));

  iniciarRelojes();

  // Buscador
  $('.whBuscar_input input').on('input', function() {
    const resultados = whBuscar($(this).val());
    const $dropdown = $('.whDropdown');
    
    resultados.length > 0 
      ? $dropdown.html(resultados.map(c => 
          `<div class="whDropdown_item" data-ciudad='${JSON.stringify(c)}'>
            <img src="${wiFlag(c.codigo)}"><span>${c.ciudad}, ${c.pais}</span>
          </div>`
        ).join('')).addClass('show')
      : $dropdown.removeClass('show');
  });

  // Agregar ciudad
  $(document).on('click', '.whDropdown_item', async function() {
    const ciudad = JSON.parse($(this).attr('data-ciudad'));
    const existe = relojes.some(r => r.zona === ciudad.zona);
    
    if (existe) {
      Notificacion('Ya tienes esta ciudad agregada', 'error', 2000);
      return;
    }

    const id = `${ciudad.codigo}_${Date.now()}`;
    const maxOrden = Math.max(...relojes.map(r => r.orden || 0), -1) + 1;

    await setDoc(doc(db, 'wiHoras', id), {
      id, ...ciudad, grid: 2, orden: maxOrden, alias: null, color: '#4A90E2',
      creadoEn: Timestamp.now(), actualizadoEn: Timestamp.now(),
      usuario: smile.usuario, email: smile.email
    });

    $('.wi_grid').append(crearRelojCompact({ ...ciudad, id }));
    $('.whBuscar_input input').val('');
    $('.whDropdown').removeClass('show');
    Notificacion('Ciudad agregada correctamente', 'success', 2000);
  });

  // Eliminar
  $(document).on('click', '.ico[data-act="x"]', async function() {
    const $card = $(this).closest('.wi_card_compact');
    const id = $card.data('id');
    
    await deleteDoc(doc(db, 'wiHoras', id));
    $card.fadeOut(300, () => $card.remove());
    Notificacion('Ciudad eliminada', 'success', 2000);
  });

  // Formato 12h/24h
  $('.whFormato .btn').on('click', function() {
    if (formatoHora.cambiar($(this).hasClass('formato12') ? '12' : '24')) {
      $('.whFormato .btn').removeClass('active');
      $(this).addClass('active');
      actualizarRelojes();
    }
  });

  // Vista Grid/Lista
  $('.whVistas .btn').on('click', function() {
    $('.whVistas .btn').removeClass('active');
    $(this).addClass('active');
    $('.wi_grid').toggleClass('whLista', $(this).hasClass('vistaLista'));
  });

  $(document).on('click', e => !$(e.target).closest('.whBuscar_input').length && $('.whDropdown').removeClass('show'));
};