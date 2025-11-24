import $ from 'jquery';
import { wiTip, Notificacion, wicopy, wiIp, removels } from '../widev.js';

const crearCard = (titulo, items) => `
  <div class="test-section" style="margin-bottom:2rem;padding:1.5rem;background:var(--wb);border-radius:1.5vh;box-shadow:0 4px 16px rgba(0,0,0,.08);border:1px solid var(--bg5);">
    <h3 style="color:var(--tx);margin-bottom:1rem;font-size:var(--fz_m5);font-weight:700;">${titulo}</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
      ${items.map(([icon, label, id, color]) => `
        <div style="padding:1rem;background:var(--bg1);border-radius:1vh;border:1px solid var(--bg5);">
          <div style="font-size:var(--fz_m1);color:var(--txe);margin-bottom:.5rem;">${icon} ${label}</div>
          <div id="${id}" style="font-size:var(--fz_m4);font-weight:700;color:var(${color});">Cargando...</div>
        </div>
      `).join('')}
    </div>
  </div>
`;

export const render = async () => {
  const basica = [
    ['🌍', 'Ciudad', 'infoCiudad', '--mco'],
    ['📍', 'IP Pública', 'infoIp', '--mco'],
    ['💻', 'Navegador', 'infoBrowser', '--mco'],
    ['🖥️', 'Sistema Operativo', 'infoOs', '--mco'],
    ['📱', 'Dispositivo', 'infoDevice', '--mco'],
    ['🌐', 'Zona Horaria', 'infoTimezone', '--mco']
  ];

  const ubicacion = [
    ['🏙️', 'Ciudad', 'infoCity', '--success'],
    ['📍', 'Región', 'infoRegion', '--success'],
    ['🌎', 'País', 'infoCountry', '--success'],
    ['📮', 'Código Postal', 'infoPostal', '--success'],
    ['🗺️', 'Latitud', 'infoLat', '--success'],
    ['🗺️', 'Longitud', 'infoLng', '--success']
  ];

  const tecnico = [
    ['🖥️', 'Pantalla', 'infoScreen', '--info'],
    ['📐', 'Viewport', 'infoViewport', '--info'],
    ['🌐', 'Idioma', 'infoLanguage', '--info'],
    ['⏰', 'Hora Local', 'infoTime', '--info'],
    ['🌍', 'UTC Offset', 'infoUtc', '--info'],
    ['📡', 'Estado', 'infoOnline', '--info']
  ];

  const botones = [
    ['📋 Copiar IP', 'btnCopyIp', '--mco'],
    ['📍 Copiar Ciudad', 'btnCopyCiudad', '--success'],
    ['📊 Mostrar Todo', 'btnMostrarTodo', '--info'],
    ['🔄 Actualizar', 'btnLimpiarCache', '--warning']
  ];

  return `
    <div class="labs-container" style="padding:2rem;max-width:1000px;margin:0 auto;">
      <h2 style="color:var(--mco);margin-bottom:2rem;font-size:var(--fz_l2);font-weight:700;">🧪 wiIp() v10.1</h2>
      
      ${crearCard('Test 1: Información Básica', basica)}
      ${crearCard('Test 2: Ubicación Geográfica', ubicacion)}
      ${crearCard('Test 3: Datos Técnicos', tecnico)}
      
      <div class="test-section" style="margin-bottom:2rem;padding:1.5rem;background:var(--wb);border-radius:1.5vh;box-shadow:0 4px 16px rgba(0,0,0,.08);border:1px solid var(--bg5);">
        <h3 style="color:var(--tx);margin-bottom:1rem;font-size:var(--fz_m5);font-weight:700;">Test 4: Acciones</h3>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          ${botones.map(([txt, id, color]) => `
            <button id="${id}" style="padding:1.2vh 2vw;background:var(${color});color:var(--txa);border:none;border-radius:1vh;cursor:pointer;font-size:var(--fz_m3);font-weight:600;">
              ${txt}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="resultados" style="margin-top:2rem;padding:1.5rem;background:var(--bg1);border-radius:1.5vh;border-left:4px solid var(--mco);border:1px solid var(--bg5);">
        <h4 style="color:var(--mco);margin-bottom:1rem;font-size:var(--fz_m4);font-weight:700;">📊 JSON:</h4>
        <pre id="jsonData" style="font-family:var(--ff_R);font-size:var(--fz_m1);color:var(--tx);background:var(--wb);padding:1rem;border-radius:1vh;overflow-x:auto;"></pre>
      </div>
    </div>
  `;
};

export const init = async () => {
  wiIp(data => {
    // Básica
    $('#infoCiudad').text(`${data.city}, ${data.country}`);
    $('#infoIp').text(data.ip);
    $('#infoBrowser').text(data.browser);
    $('#infoOs').text(data.os);
    $('#infoDevice').text(data.device);
    $('#infoTimezone').text(data.timezone);

    // Ubicación
    $('#infoCity').text(data.city);
    $('#infoRegion').text(data.region);
    $('#infoCountry').text(data.country);
    $('#infoPostal').text(data.postal || 'N/A');
    $('#infoLat').text(data.lat.toFixed(4));
    $('#infoLng').text(data.lng.toFixed(4));

    // Técnico
    $('#infoScreen').text(data.screen);
    $('#infoViewport').text(data.viewport);
    $('#infoLanguage').text(data.language);
    $('#infoTime').text(data.time);
    $('#infoUtc').text(`UTC${data.utcOffset >= 0 ? '+' : ''}${data.utcOffset}`);
    $('#infoOnline').text(data.online ? '✅ Online' : '❌ Offline');

    $('#jsonData').text(JSON.stringify(data, null, 2));
  });

  // Acciones
  $('#btnCopyIp').on('click', function() {
    wicopy(wiIp('ip'), this, '¡IP copiada!');
  });

  $('#btnCopyCiudad').on('click', function() {
    wicopy(wiIp('ciudad'), this, '¡Ciudad copiada!');
  });

  $('#btnMostrarTodo').on('click', function() {
    wiIp(data => {
      console.table(data);
      Notificacion('Datos en consola', 'info');
      wiTip(this, 'Ver consola (F12)', 'info', 2000);
    });
  });

  $('#btnLimpiarCache').on('click', function() {
    removels('wiIp');
    location.reload();
  });
};