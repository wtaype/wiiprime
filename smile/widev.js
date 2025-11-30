import $ from 'jquery'; 

// BANDERAS V11
export const wiFlag = (cod) => {
  if (!cod || cod.length !== 2) return null;
  const cache = getls('wiFlags') || {};
  const url = cache[cod] || `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${cod.toLowerCase()}.svg`;
  if (!cache[cod]) savels('wiFlags', { ...cache, [cod]: url }, 168);
  return url;
};

// CIUDADES DEL MUNDO V10.1
export const wiCiudades = {
  principales: [
    { ciudad: 'Lima', pais: 'Perú', codigo: 'PE', zona: 'America/Lima', capital: true },
    { ciudad: 'Nueva York', pais: 'Estados Unidos', codigo: 'US', zona: 'America/New_York', capital: false },
    { ciudad: 'Tokio', pais: 'Japón', codigo: 'JP', zona: 'Asia/Tokyo', capital: true },
    { ciudad: 'Londres', pais: 'Reino Unido', codigo: 'GB', zona: 'Europe/London', capital: true }
  ],  
  asia: [
    { ciudad: 'Tokio', pais: 'Japón', codigo: 'JP', zona: 'Asia/Tokyo', capital: true },
    { ciudad: 'Seúl', pais: 'Corea del Sur', codigo: 'KR', zona: 'Asia/Seoul', capital: true },
    { ciudad: 'Tel Aviv', pais: 'Israel', codigo: 'IL', zona: 'Asia/Jerusalem', capital: false },
    { ciudad: 'Pekín', pais: 'China', codigo: 'CN', zona: 'Asia/Shanghai', capital: true },
    { ciudad: 'Bangkok', pais: 'Tailandia', codigo: 'TH', zona: 'Asia/Bangkok', capital: true },
    { ciudad: 'Singapur', pais: 'Singapur', codigo: 'SG', zona: 'Asia/Singapore', capital: true },
    { ciudad: 'Dubái', pais: 'Emiratos Árabes', codigo: 'AE', zona: 'Asia/Dubai', capital: false },
    { ciudad: 'Mumbai', pais: 'India', codigo: 'IN', zona: 'Asia/Kolkata', capital: false },
    { ciudad: 'Manila', pais: 'Filipinas', codigo: 'PH', zona: 'Asia/Manila', capital: true },
    { ciudad: 'Yakarta', pais: 'Indonesia', codigo: 'ID', zona: 'Asia/Jakarta', capital: true },
    { ciudad: 'Hong Kong', pais: 'China', codigo: 'HK', zona: 'Asia/Hong_Kong', capital: false },
    { ciudad: 'Shanghái', pais: 'China', codigo: 'CN', zona: 'Asia/Shanghai', capital: false },
    { ciudad: 'Kuala Lumpur', pais: 'Malasia', codigo: 'MY', zona: 'Asia/Kuala_Lumpur', capital: true },
    { ciudad: 'Hanói', pais: 'Vietnam', codigo: 'VN', zona: 'Asia/Ho_Chi_Minh', capital: true },
    { ciudad: 'Estambul', pais: 'Turquía', codigo: 'TR', zona: 'Europe/Istanbul', capital: false }
  ],  
  europa: [
    { ciudad: 'Londres', pais: 'Reino Unido', codigo: 'GB', zona: 'Europe/London', capital: true },
    { ciudad: 'París', pais: 'Francia', codigo: 'FR', zona: 'Europe/Paris', capital: true },
    { ciudad: 'Berlín', pais: 'Alemania', codigo: 'DE', zona: 'Europe/Berlin', capital: true },
    { ciudad: 'Madrid', pais: 'España', codigo: 'ES', zona: 'Europe/Madrid', capital: true },
    { ciudad: 'Roma', pais: 'Italia', codigo: 'IT', zona: 'Europe/Rome', capital: true },
    { ciudad: 'Ámsterdam', pais: 'Países Bajos', codigo: 'NL', zona: 'Europe/Amsterdam', capital: true },
    { ciudad: 'Estocolmo', pais: 'Suecia', codigo: 'SE', zona: 'Europe/Stockholm', capital: true },
    { ciudad: 'Moscú', pais: 'Rusia', codigo: 'RU', zona: 'Europe/Moscow', capital: true },
    { ciudad: 'Atenas', pais: 'Grecia', codigo: 'GR', zona: 'Europe/Athens', capital: true },
    { ciudad: 'Lisboa', pais: 'Portugal', codigo: 'PT', zona: 'Europe/Lisbon', capital: true },
    { ciudad: 'Viena', pais: 'Austria', codigo: 'AT', zona: 'Europe/Vienna', capital: true },
    { ciudad: 'Praga', pais: 'República Checa', codigo: 'CZ', zona: 'Europe/Prague', capital: true },
    { ciudad: 'Copenhague', pais: 'Dinamarca', codigo: 'DK', zona: 'Europe/Copenhagen', capital: true },
    { ciudad: 'Dublín', pais: 'Irlanda', codigo: 'IE', zona: 'Europe/Dublin', capital: true },
    { ciudad: 'Bruselas', pais: 'Bélgica', codigo: 'BE', zona: 'Europe/Brussels', capital: true }
  ],  
  america: [
    { ciudad: 'Los Ángeles', pais: 'Estados Unidos', codigo: 'US', zona: 'America/Los_Angeles', capital: false },
    { ciudad: 'Buenos Aires', pais: 'Argentina', codigo: 'AR', zona: 'America/Argentina/Buenos_Aires', capital: true },
    { ciudad: 'Nueva York', pais: 'Estados Unidos', codigo: 'US', zona: 'America/New_York', capital: false },
    { ciudad: 'Santiago', pais: 'Chile', codigo: 'CL', zona: 'America/Santiago', capital: true },
    { ciudad: 'Ciudad de México', pais: 'México', codigo: 'MX', zona: 'America/Mexico_City', capital: true },
    { ciudad: 'Miami', pais: 'Estados Unidos', codigo: 'US', zona: 'America/New_York', capital: false },
    { ciudad: 'São Paulo', pais: 'Brasil', codigo: 'BR', zona: 'America/Sao_Paulo', capital: false },
    { ciudad: 'Lima', pais: 'Perú', codigo: 'PE', zona: 'America/Lima', capital: true },
    { ciudad: 'Bogotá', pais: 'Colombia', codigo: 'CO', zona: 'America/Bogota', capital: true },
    { ciudad: 'Toronto', pais: 'Canadá', codigo: 'CA', zona: 'America/Toronto', capital: false },
    { ciudad: 'Río de Janeiro', pais: 'Brasil', codigo: 'BR', zona: 'America/Sao_Paulo', capital: false },
    { ciudad: 'Montevideo', pais: 'Uruguay', codigo: 'UY', zona: 'America/Montevideo', capital: true },
    { ciudad: 'Caracas', pais: 'Venezuela', codigo: 'VE', zona: 'America/Caracas', capital: true },
    { ciudad: 'Quito', pais: 'Ecuador', codigo: 'EC', zona: 'America/Guayaquil', capital: true },
    { ciudad: 'La Paz', pais: 'Bolivia', codigo: 'BO', zona: 'America/La_Paz', capital: true }
  ],  
  oceania: [
    { ciudad: 'Sídney', pais: 'Australia', codigo: 'AU', zona: 'Australia/Sydney', capital: false },
    { ciudad: 'Melbourne', pais: 'Australia', codigo: 'AU', zona: 'Australia/Melbourne', capital: false },
    { ciudad: 'Auckland', pais: 'Nueva Zelanda', codigo: 'NZ', zona: 'Pacific/Auckland', capital: false },
    { ciudad: 'Brisbane', pais: 'Australia', codigo: 'AU', zona: 'Australia/Brisbane', capital: false },
    { ciudad: 'Perth', pais: 'Australia', codigo: 'AU', zona: 'Australia/Perth', capital: false },
    { ciudad: 'Wellington', pais: 'Nueva Zelanda', codigo: 'NZ', zona: 'Pacific/Auckland', capital: true },
    { ciudad: 'Canberra', pais: 'Australia', codigo: 'AU', zona: 'Australia/Sydney', capital: true },
    { ciudad: 'Suva', pais: 'Fiyi', codigo: 'FJ', zona: 'Pacific/Fiji', capital: true },
    { ciudad: 'Port Moresby', pais: 'Papúa Nueva Guinea', codigo: 'PG', zona: 'Pacific/Port_Moresby', capital: true },
    { ciudad: 'Adelaida', pais: 'Australia', codigo: 'AU', zona: 'Australia/Adelaide', capital: false },
    { ciudad: 'Gold Coast', pais: 'Australia', codigo: 'AU', zona: 'Australia/Brisbane', capital: false },
    { ciudad: 'Christchurch', pais: 'Nueva Zelanda', codigo: 'NZ', zona: 'Pacific/Auckland', capital: false },
    { ciudad: 'Hobart', pais: 'Australia', codigo: 'AU', zona: 'Australia/Hobart', capital: false },
    { ciudad: 'Nouméa', pais: 'Nueva Caledonia', codigo: 'NC', zona: 'Pacific/Noumea', capital: true },
    { ciudad: 'Papeete', pais: 'Polinesia Francesa', codigo: 'PF', zona: 'Pacific/Tahiti', capital: true }
  ],
  africa: [
    { ciudad: 'El Cairo', pais: 'Egipto', codigo: 'EG', zona: 'Africa/Cairo', capital: true },
    { ciudad: 'Lagos', pais: 'Nigeria', codigo: 'NG', zona: 'Africa/Lagos', capital: false },
    { ciudad: 'Ciudad del Cabo', pais: 'Sudáfrica', codigo: 'ZA', zona: 'Africa/Johannesburg', capital: false },
    { ciudad: 'Nairobi', pais: 'Kenia', codigo: 'KE', zona: 'Africa/Nairobi', capital: true },
    { ciudad: 'Casablanca', pais: 'Marruecos', codigo: 'MA', zona: 'Africa/Casablanca', capital: false },
    { ciudad: 'Johannesburgo', pais: 'Sudáfrica', codigo: 'ZA', zona: 'Africa/Johannesburg', capital: false },
    { ciudad: 'Argel', pais: 'Argelia', codigo: 'DZ', zona: 'Africa/Algiers', capital: true },
    { ciudad: 'Adís Abeba', pais: 'Etiopía', codigo: 'ET', zona: 'Africa/Addis_Ababa', capital: true },
    { ciudad: 'Dakar', pais: 'Senegal', codigo: 'SN', zona: 'Africa/Dakar', capital: true },
    { ciudad: 'Túnez', pais: 'Túnez', codigo: 'TN', zona: 'Africa/Tunis', capital: true },
    { ciudad: 'Accra', pais: 'Ghana', codigo: 'GH', zona: 'Africa/Accra', capital: true },
    { ciudad: 'Kampala', pais: 'Uganda', codigo: 'UG', zona: 'Africa/Kampala', capital: true },
    { ciudad: 'Luanda', pais: 'Angola', codigo: 'AO', zona: 'Africa/Luanda', capital: true },
    { ciudad: 'Kinsasa', pais: 'R.D. del Congo', codigo: 'CD', zona: 'Africa/Kinshasa', capital: true },
    { ciudad: 'Abiyán', pais: 'Costa de Marfil', codigo: 'CI', zona: 'Africa/Abidjan', capital: false }
  ]
};

// INFORMACIÓN DE LA CIUDAD V10.2 (CORREGIDO)
export const infoCiudad = (zona) => {
  try {
    const ahora = new Date();
    const fmtHora = new Intl.DateTimeFormat('es-ES', { timeZone: zona, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const fmtFecha = new Intl.DateTimeFormat('es-ES', { timeZone: zona, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const fmtGmt = new Intl.DateTimeFormat('es-ES', { timeZone: zona, timeZoneName: 'shortOffset' });
    const gmtOffset = fmtGmt.formatToParts(ahora).find(p => p.type === 'timeZoneName')?.value || 'GMT+0';
    
    // ✅ CORREGIDO: Detección de hemisferio SUR más robusta
    const zonasSur = [
      'Lima', 'Santiago', 'Buenos_Aires', 'Montevideo', 'Sao_Paulo', 'La_Paz', 
      'Asuncion', 'Guayaquil', 'Caracas', 'Sydney', 'Melbourne', 'Brisbane', 
      'Perth', 'Adelaide', 'Hobart', 'Auckland', 'Johannesburg', 'Cairo'
    ];
    
    const esSur = zonasSur.some(ciudad => zona.includes(ciudad));
    
    // Calcular estación por hemisferio
    const mes = ahora.getMonth();
    const estacionesNorte = ['Invierno','Invierno','Primavera','Primavera','Primavera','Verano','Verano','Verano','Otoño','Otoño','Otoño','Invierno'];
    const estacionesSur = ['Verano','Verano','Otoño','Otoño','Otoño','Invierno','Invierno','Invierno','Primavera','Primavera','Primavera','Verano'];
    const estacion = esSur ? estacionesSur[mes] : estacionesNorte[mes];
    
    // Detectar cambio horario (DST)
    const enero = new Date(ahora.getFullYear(), 0, 1);
    const julio = new Date(ahora.getFullYear(), 6, 1);
    const offsetEnero = new Intl.DateTimeFormat('es-ES', { timeZone: zona, timeZoneName: 'shortOffset' }).formatToParts(enero).find(p => p.type === 'timeZoneName')?.value;
    const offsetJulio = new Intl.DateTimeFormat('es-ES', { timeZone: zona, timeZoneName: 'shortOffset' }).formatToParts(julio).find(p => p.type === 'timeZoneName')?.value;
    const cambioHorario = offsetEnero !== offsetJulio;
    
    return {
      hora: fmtHora.format(ahora),
      fecha: fmtFecha.format(ahora),
      gmt: gmtOffset,
      estacion,
      timestamp: Math.floor(ahora.getTime() / 1e3),
      cambioHorario
    };
  } catch (error) {
    console.error(`❌ Error en infoCiudad(${zona}):`, error.message);
    return null;
  }
};

// BUSCADOR DE CIUDADES V10.1
export const buscarCiudad = (termino, continente = null) => {
  const bus = termino.toLowerCase().trim();
  const fue = continente ? wiCiudades[continente] : Object.values(wiCiudades).flat();
  return fue.filter(c => c.ciudad.toLowerCase().includes(bus) || c.pais.toLowerCase().includes(bus));
};

// === PATH VELOCIDAD V10.1 ===
export const wiPath = {
  clean(p) {const b = import.meta?.env?.BASE_URL || '/'; return b !== '/' && p.startsWith(b) ? p.slice(b.length - 1) || '/' : p || '/'},
  update(p, t = '', dr = '/') {history.pushState({ path: p }, t, p === dr ? '/' : p); t && (document.title = t)},
  params: () => Object.fromEntries(new URLSearchParams(location.search)),
  setParams(p) {const u = new URL(location); Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v)); history.pushState({}, '', u)},
  get current() {return this.clean(location.pathname)}
};

// === ANIMACIÓN CARGA V10.1 ===
export const wiAnimate = {
  async fade(s, c, d = 150) {const $e = $(s); await $e.animate({ opacity: 0 }, d).promise(); $e.html(c); await $e.animate({ opacity: 1 }, d).promise()},
  async slide(s, sh = null) {const $e = $(s); if (sh === null) sh = !$e.is(':visible'); return sh ? $e.slideDown().promise() : $e.slideUp().promise()},
  shake(s) {$(s).addClass('shake'); setTimeout(() => $(s).removeClass('shake'), 500)},
  pulse(s) {$(s).addClass('pulse'); setTimeout(() => $(s).removeClass('pulse'), 500)}
};

// HORAS DEL DÍA V10.1
export const esNoche = (hora) => {
  const h = typeof hora === 'string' ? parseInt(hora.split(':')[0]) : hora;
  return h >= 6 && h < 19;
};

// === ⏰ FORMATO DE HORA V11 ===
export const formatoHora = (() => {
  let formato = getls('wiClockFormat') || '24';
  
  const convertir = (hora24) => {
    if (formato === '24') return hora24;
    const [h, m, s] = hora24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${ampm}`;
  };
  
  const cambiar = (nuevoFormato) => {
    if (['12', '24'].includes(nuevoFormato) && formato !== nuevoFormato) {
      formato = nuevoFormato;
      savels('wiClockFormat', formato, 720);
      return true;
    }
    return false;
  };
  
  return {
    get actual() { return formato; },
    convertir,
    cambiar,
    es12h: () => formato === '12',
    es24h: () => formato === '24'
  };
})();

// CARGANDO V10.1
export const wiSpin = (btn, act = true, txt = '') => {
  const $btn = $(btn);
  if (act) {
    const texto = txt || $btn.text().trim();
    $btn.data('txt', texto).prop('disabled', true).html(`${texto} <i class="fas fa-spinner fa-spin"></i>`);
  } else {
    $btn.prop('disabled', false).text($btn.data('txt') || txt || 'Continuar');
  }
};

// SALUDO DE BIENVENIDA V10.1
export const Saludar = () => {
  const hrs = new Date().getHours();
  return hrs >= 5 && hrs < 12 ? 'Buenos días, ' : hrs >= 12 && hrs < 18 ? 'Buenas tardes, ' : 'Buenas noches, ';
};

// NOTIFICACIONES V10.1
export function Notificacion(msg, tipo = 'error', tiempo = 3000) {
  const ico = {success:'fa-check-circle',error:'fa-times-circle',warning:'fa-exclamation-triangle',info:'fa-info-circle'}[tipo];
  if (!$('#notificationsContainer').length) $('body').append('<div id="notificationsContainer" style="position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;"></div>');
  const $not = $(`<div class="notification notif-${tipo}" style="background:var(--F);border-left:4px solid var(--${tipo});box-shadow:0 4px 12px rgba(0,0,0,.1);border-radius:8px;padding:1rem;display:flex;align-items:center;gap:.5rem;opacity:0;transform:translateX(20px);transition:all .3s ease;"><i class="fas ${ico}" style="color:var(--${tipo});"></i><span style="flex:1;color:var(--tx);">${msg}</span><button style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--tx);">&times;</button></div>`);
  $('#notificationsContainer').append($not);requestAnimationFrame(() => $not.css({opacity:1,transform:'translateX(0)'}));
  const cerrar = () => {$not.css({opacity:0,transform:'translateX(20px)'});setTimeout(() => $not.remove(), 300);};
  $not.find('button').on('click', cerrar);
  setTimeout(cerrar, tiempo);
}

// MENSAJE DE BIENVENIDA V10.1
export function Mensaje(msg, tipo = 'success') {
  $('.alert-box').remove();
  const ico = {success:'fa-circle-check',error:'fa-circle-exclamation',warning:'fa-exclamation-triangle',info:'fa-info-circle'}[tipo];
  const $alerta = $(`<div class="alert-box" style="position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:15px 20px;border-radius:8px;background:var(--${tipo}-bg,var(--F));color:var(--${tipo});border-left:4px solid var(--${tipo});box-shadow:0 4px 12px rgba(0,0,0,.1);z-index:1000;display:flex;align-items:center;gap:10px;min-width:300px;max-width:90%;"><i class="fas ${ico}" style="color:var(--${tipo});"></i><span>${msg}</span></div>`).appendTo('body').hide().fadeIn(300);
  setTimeout(() => $alerta.fadeOut(300, () => $alerta.remove()), 3000);
};

// GUARDANDO DE LOCAL v10.1
export function savels(clave, valor, horas = 24) {
  try {
    if (!clave || typeof clave !== 'string') return false;
    localStorage.setItem(clave, JSON.stringify({ value: valor, expiry: Date.now() + horas * 3600000 }));
    return true;
  } catch(e) { console.error('esv:', e); return false; }
}

// OBTENIENDO DE LOCAL v10.1
export function getls(clave) {
  try {
    if (!clave || typeof clave !== 'string') return null;
    const item = localStorage.getItem(clave);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (!parsed || Date.now() > parsed.expiry) return localStorage.removeItem(clave), null;
    return parsed.value;
  } catch(e) { console.error('egt:', e); localStorage.removeItem(clave); return null; }
}

// ELIMINANDO DE LOCAL v10.1
export function removels(...claves) {
  claves.forEach(clave => clave && typeof clave === 'string' && localStorage.removeItem(clave));
}

// TOOLTIP V10.1
export function wiTip(elm, txt, tipo = 'top', tiempo = 1800) {
  const tipos = {success:'--success',error:'--error',warning:'--warning',info:'--info'};
  const color = tipos[tipo] || '--mco';  
  if (!$('#wiTip-css').length) $('head').append(`<style id="wiTip-css">.wiTip{position:fixed;color:var(--F);z-index:99999;padding:8px 12px;border-radius:4px;font-size:.85rem;max-width:250px;box-shadow:0 2px 8px rgba(0,0,0,.2);opacity:0;transition:opacity .2s}.wiTip.show{opacity:1}</style>`);
  const $elm = $(elm);
  if (!$elm.length) return; $('.wiTip').remove();
  const $tip = $(`<div class="wiTip" style="background:var(${color})"><span>${txt}</span><div style="position:absolute;top:100%;left:50%;margin-left:-6px;border:6px solid transparent;border-top-color:var(${color})"></div></div>`).appendTo('body');
  const {left, top, width} = $elm[0].getBoundingClientRect();
  const tipW = $tip.outerWidth(), tipH = $tip.outerHeight();
  let x = left + width/2 - tipW/2, y = top - tipH - 8;
  x = Math.max(8, Math.min(x, innerWidth - tipW - 8));  
  $tip.css({left: x, top: y});
  setTimeout(() => {$tip.addClass('show'); if (tiempo > 0) setTimeout(() => $tip.removeClass('show').delay(200).queue(() => $tip.remove()), tiempo);}, 10);
  return $elm;
}

// SISTEMA IP V10.1
export const wiIp = (geo) => {
  const cch = getls('wiIp');
  if (cch) return typeof geo === 'function' ? geo(cch) : geo === 'ciudad' ? `${cch.city}, ${cch.country}` : cch[geo];
  return $.getJSON('https://ipinfo.io/json?token=3868948e170a74', data => {
    const ua = navigator.userAgent;
    const [lat, lng] = (data.loc || '0,0').split(',').map(Number);
    const ipData = {
      ip: data.ip, city: data.city, region: data.region, country: data.country, postal: data.postal, lat, lng,
      browser: /Edg/i.test(ua) ? 'Edge' : /Chrome/i.test(ua) ? 'Chrome' : /Firefox/i.test(ua) ? 'Firefox' : /Safari/i.test(ua) && !/Chrome/i.test(ua) ? 'Safari' : /Opera|OPR/i.test(ua) ? 'Opera' : 'Otro',
      os: /Windows/i.test(ua) ? 'Windows' : /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Otro',
      device: /Mobile|Android|iPhone|iPad/i.test(ua) ? 'Móvil' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Escritorio',
      screen: `${screen.width}×${screen.height}`, viewport: `${innerWidth}×${innerHeight}`,
      language: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      time: new Date().toLocaleString('es-ES'), utcOffset: new Date().getTimezoneOffset() / -60,
      online: navigator.onLine
    };
    savels('wiIp', ipData, 24);
    return typeof geo === 'function' ? geo(ipData) : geo === 'ciudad' ? `${ipData.city}, ${ipData.country}` : ipData[geo];
  }).fail(() => cch?.[geo] || null);
};

// === MODALES V10.4 ===
export const abrirModal = id => {
  const $m = $(`#${id}`); if (!$m.length) return console.warn(`Modal #${id} no existe`);
  $m.addClass('active'); $('body').addClass('modal-open');
  setTimeout(() => $m.find('input,select,textarea,button').filter(':visible:first').trigger('focus'), 20);
};
export const cerrarModal = id => {
  $(`#${id}`).removeClass('active'); if (!$('.wiModal.active').length) $('body').removeClass('modal-open');
};
export const cerrarTodos = () => {
  $('.wiModal').removeClass('active');  $('body').removeClass('modal-open');
};
(() => {
  $('.wiModalCss').length ? $('.wiModalCss').text('.wiModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:10000;justify-content:center;align-items:center;backdrop-filter:saturate(120%) blur(2px)}.wiModal.active{display:flex}@keyframes mf{from{opacity:0}to{opacity:1}}.wiModal{animation:mf .25s ease}body.modal-open{overflow:hidden}.modalBody{position:relative;background:var(--F);border-radius:1vh;box-shadow:var(--bsh);width:92%;max-width:600px;max-height:90vh;overflow:auto;animation:mp .22s ease;z-index:10001}@keyframes mp{from{transform:translateY(10px) scale(.98);opacity:.6}to{transform:translateY(0) scale(1);opacity:1}}.modalX{z-index:10002;background:0 0;border:0;color:var(--mco);font-size:1.4rem;cursor:pointer;transition:transform .15s,opacity .15s;text-shadow:0 1px 2px rgba(0,0,0,.15);position:absolute;top:12px;right:12px}.modalX:hover{transform:scale(1.08);opacity:.95}') : $('head').append('<style class="wiModalCss">.wiModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:10000;justify-content:center;align-items:center;backdrop-filter:saturate(120%) blur(2px)}.wiModal.active{display:flex}@keyframes mf{from{opacity:0}to{opacity:1}}.wiModal{animation:mf .25s ease}body.modal-open{overflow:hidden}.modalBody{position:relative;background:var(--F);border-radius:1vh;box-shadow:var(--bsh);width:92%;max-width:600px;max-height:90vh;overflow:auto;animation:mp .22s ease;z-index:10001}@keyframes mp{from{transform:translateY(10px) scale(.98);opacity:.6}to{transform:translateY(0) scale(1);opacity:1}}.modalX{z-index:10002;background:0 0;border:0;color:var(--mco);font-size:1.4rem;cursor:pointer;transition:transform .15s,opacity .15s;text-shadow:0 1px 2px rgba(0,0,0,.15);position:absolute;top:12px;right:12px}.modalX:hover{transform:scale(1.08);opacity:.95}</style>');
  $(document).on('click', '.modalX', cerrarTodos)
    .on('click', '.wiModal.active', function(e) { if (e.target === this) cerrarTodos(); })
    .on('keydown', e => { if (e.key === 'Escape' && $('.wiModal.active').length) cerrarTodos(); });
})();
// === [END] MODALES V10.4 ===

// GUARDAR FECHAS BASE DE DATOS V10.1
export const savebd = (fecha) => {
  const [año, mes, dia] = fecha.split('-').map(Number);
  const ahora = new Date();
  const fechaObj = new Date(año, mes - 1, dia, ahora.getHours(), ahora.getMinutes(), ahora.getSeconds());
  return Timestamp.fromDate(fechaObj);
};
// OBTENER FECHAS BASE DE DATOS V10.1
export const getbd = (tm) => {
  if (!tm) return '';
  const dt = tm.toDate?.()
    || (tm._seconds && new Date(tm._seconds * 1000)) || (tm.seconds && new Date(tm.seconds * 1000)) || new Date(tm);
  return isNaN(dt) ? '' : `${dt.getDate().toString().padStart(2,'0')}/${(dt.getMonth()+1).toString().padStart(2,'0')}/${dt.getFullYear()}`;
};

// === COPIAR TEXTOS V10.2 ===
export const wicopy = (txt, elm = null, msg = '¡Copiado!') => {
  const getCnt = () => txt instanceof $ ? txt.text() || txt.val() || '' : txt?.nodeType ? txt.textContent || txt.value || '' : typeof txt === 'string' && txt.trim().match(/^[.#\[]/) && $(txt).length ? $(txt).text() || $(txt).val() || '' : String(txt ?? '');
  const cnt = getCnt();
  const fin = () => elm ? wiTip(elm, msg, 'success', 1500) : console.log(`${msg}: ${cnt}`);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(cnt).then(fin).catch(() => {
      const $t = $('<textarea>').val(cnt).css({position:'absolute',left:'-9999px'}).appendTo('body');
      $t[0].select(); document.execCommand('copy'); $t.remove(); fin();
    });
  } else {
    const $t = $('<textarea>').val(cnt).css({position:'absolute',left:'-9999px'}).appendTo('body');
    $t[0].select(); document.execCommand('copy'); $t.remove(); fin();
  }
};

// === [START] FUNCIONES GENIALES V10.1 ===
export const Mayu = (ltr) => ltr.toUpperCase();
export const Capi = (ltr) => ltr[0].toUpperCase() + ltr.slice(1);
export const adrm = (a, b) => $(a).addClass(b).siblings().removeClass(b);
export const mis10 = (txt) => txt.length <= 10 ? txt : txt.substring(0, 10) + '...';
export const adtm = (se, cl, ti, tf) => $(se).text(ti).addClass(cl).delay(1800).queue(q => $(se).text(tf).removeClass(cl).dequeue());
export const adup = (x, y) => ($(x).addClass('updating').text(y), setTimeout(() => $(x).removeClass('updating'), 500));