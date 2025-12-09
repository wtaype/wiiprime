import $ from 'jquery';
import { getls, savels, wiIp } from '../widev.js';
import { miReloj, miPrincipal, iniciarBuscador, iniciarRelojes, formatoHoras, mdVistas } from '../widevs.js';
import { wiCiudades } from '../widev.js';

export const wiHoras = async () => {
  const gps = getls('smileIP') || await new Promise(res => wiIp(d => (savels('smileIP', d), res(d))));

  $('.wiHoras').html(`
    <div class="whPrincipal">${miPrincipal(wiCiudades.principales[0], gps)}</div>
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
    </div>
    <div class="whGrids">
      <div class="wi_grid">
        ${wiCiudades.principales.slice(1).map(ciudad => miReloj(ciudad)).join('')}
      </div>
    </div>
  `);

  iniciarBuscador();
  iniciarRelojes();
  formatoHoras();
  mdVistas();
};

export const cleanup = () => {};