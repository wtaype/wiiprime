import $ from 'jquery';
import { smile } from './smile.js';
import { getls, savels, wiIp, wiCiudades, infoCiudad, Notificacion, wiSpin } from '../widev.js';
import { iniciarBuscador, iniciarRelojes, formatoHoras, mdVistas, relojAnalogico, relojDigital, fechaTexto, infoPaises, infoDatos } from '../widevs.js';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const wiHoras = async () => {
  //[START] RELOJ PRINCIPAL DEL USUARIO V10.1
  const gps = getls('smileIP') || await new Promise(res => wiIp(d => (savels('smileIP', d), res(d))));
  const ciudadPrincipal = {
    ciudad: gps.region,
    pais: gps.country,
    zona: gps.timezone,
    codigo: gps.country
  };

  const miPrincipal = (ciudad, ip = null) => {
    const dat = infoCiudad(ciudad.zona);
    if (!dat) return '';
    const baseInfo = infoDatos(ciudad);
    const infoIP = ip ? `
      <div class="wihora_info">
        <div class="wihora_info_item">
          <i class="fa-solid fa-house"></i>
          <span>${ip.city}, ${ip.country}</span>
        </div>
        <div class="wihora_info_item">
          <i class="fas fa-globe-americas"></i>
          <span>IP: ${ip.ip}</span>
        </div>
        <div class="wihora_info_item">
          <i class="fa-solid fa-globe"></i>
          <span>${ip.browser}</span>
        </div>
      </div>` : '';
    
    return `
      <div class="whPrincipal">
        <div class="wihora_card wihora_principal glass-card" data-zona="${ciudad.zona}">
          <div class="wihora_card_content">
            ${relojAnalogico(ciudad.zona)}
            <div class="wihora_digital_section">
              <div class="wihora_header_info">${infoPaises(ciudad)}</div>
              <div class="wihora_time">${relojDigital(ciudad.zona)}</div>
              <div class="wihora_fecha">${fechaTexto(ciudad.zona)}</div>
              ${baseInfo + infoIP}
            </div>
          </div>
        </div>
      </div>
      <div class="whHeader">
        <div class="whBuscar_input">
          <input type="text" placeholder="Buscar ciudad o país...">
          <div class="whDropdown"></div>
        </div>
        <div class="whControles">
          <div class="whFormato">
            <button class="btn formato12">12h</button>
            <button class="btn formato24 active">24h</button>
          </div>
          <div class="whVistas">
            <button class="btn vistaGrid"><i class="fas fa-th"></i></button>
            <button class="btn vistaLista active"><i class="fas fa-list"></i></button>
          </div>
        </div>
      </div>`;
  };
  //[END] RELOJ PRINCIPAL DEL USUARIO V10.1

  //[START] NUEVOS RELOJES DEL USUARIO V10.1
  const dbEstados = (ciudad) => `
    <div class="wihora_estados">
    <button class="wihora_delete" data-id="${ciudad.id || ''}" data-zona="${ciudad.zona}">
    <i class="fas fa-trash-alt"></i>
    </button>
    <button class="wihora_cloud" data-id="${ciudad.id || ''}" data-zona="${ciudad.zona}">
      <i class="fas fa-cloud${ciudad.id ? '-upload-alt' : ''}"></i>
    </button>
    </div>`;

  const miReloj = (ciudad, zonaRef) => `
    <div class="wihora_card glass-card" data-zona="${ciudad.zona}" data-id="${ciudad.id || ''}" style="order:${ciudad.orden || 0}">
      ${dbEstados(ciudad)}
      <div class="wihora_card_content">
        ${relojAnalogico(ciudad.zona)}
        <div class="wihora_digital_section">
          <div class="wihora_header_info">${infoPaises(ciudad)}</div>
          <div class="wihora_time">${relojDigital(ciudad.zona)}</div>
          <div class="wihora_fecha">${fechaTexto(ciudad.zona)}</div>
          ${infoDatos(ciudad, zonaRef)}
        </div>
      </div>
    </div>`;

  const cached = getls('wiHoras'); // Cache Primero 
  const relojes = cached || await getDocs(collection(db, 'wiHoras')).then(snap => {
    const data = snap.docs.map(doc => doc.data()).sort((a, b) => a.orden - b.orden);
    savels('wiHoras', data, 450); return data;
  });

  $('.wiHoras').html(`
    ${miPrincipal(ciudadPrincipal, gps)}
    <div class="whGrids"><div class="wi_grid whLista">${relojes.map(ciudad => miReloj(ciudad, gps.timezone)).join('')}</div></div>
  `);

  //[START] ACTUALIZACION Y EVENTOS DE FIREBASE
  // Agregar desde buscador
  $(document).on('agregar-ciudad', '.whDropdown_item', function(e, ciudad) {
    const nuevoReloj = miReloj({ ...ciudad, id: null, orden: 0 }, gps.timezone);
    $('.wi_grid').prepend(nuevoReloj);
    iniciarRelojes();
  });

  // Guardar en Firebase
  $(document).on('click', '.wihora_cloud', async function() {
    const $btn = $(this), id = $btn.data('id');
    if (id) return Notificacion('Ya está guardado en la nube', 'info');
    
    wiSpin($btn, true);
    const zona = $btn.data('zona');
    const ciudad = Object.values(wiCiudades).flat().find(c => c.zona === zona);
    if (!ciudad) return wiSpin($btn, false), Notificacion('Ciudad no encontrada', 'error');
    
    const nuevoId = `${ciudad.codigo}_${Date.now()}`;
    await setDoc(doc(db, 'wiHoras', nuevoId), {
      id: nuevoId,
      pais: ciudad.pais,
      ciudad: ciudad.ciudad,
      codigo: ciudad.codigo,
      zona: ciudad.zona,
      orden: $('.wihora_card').length - 1,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
      usuario: smile.usuario,
      email: smile.email
    });
    
    $btn.attr('data-id', nuevoId).find('i').removeClass('fa-cloud').addClass('fa-cloud-upload-alt');
    $btn.closest('.wihora_card').attr('data-id', nuevoId);
    wiSpin($btn, false);
    savels('wiHoras', null);
    Notificacion('Guardado en la nube', 'success');
  });

  // Eliminar de Firebase
  $(document).on('click', '.wihora_delete', async function() {
    if (!confirm('¿Eliminar este reloj?')) return;
    
    const $btn = $(this), $card = $btn.closest('.wihora_card'), id = $btn.data('id');
    wiSpin($btn, true);
    
    $card.fadeOut(300, async () => {
      if (id) await deleteDoc(doc(db, 'wiHoras', id)), savels('wiHoras', null);
      $card.remove();
      wiSpin($btn, false);
      Notificacion('Reloj eliminado', 'success');
    });
  });
  //[END] ACTUALIZACION Y EVENTOS DE FIREBASE
  //[END] NUEVOS RELOJES DEL USUARIO V10.1

  iniciarBuscador(), iniciarRelojes(), formatoHoras(), mdVistas();  // INICIAR FUNCIONES
};

export const cleanup = () => {};