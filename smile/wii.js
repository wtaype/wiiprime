import $ from 'jquery';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v12';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  (1)
git add . ; git commit -m "Actualizacion Principal v12.10.10" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto. (2)
git tag v12 -m "Version v12" ; git push origin v12

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v12 ; git tag v12 -m "Version v12 actualizada" ; git push origin v12 --force
 ACTUALIZACION TAG[END] */ 

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

// === CARGA SMART FAST V10.1 ===
export const wiSmart = (() => {
  const ld = new Set(), q = [], evs = ['mousemove', 'scroll', 'touchstart', 'keydown'];
  let ls = false;
  const ck = 'wiSmart';
  const getCache = () => { try { return new Set(JSON.parse(localStorage.getItem(ck) || '[]')); } catch { return new Set(); } };
  const setCache = (nm) => { const c = getCache(); c.add(nm); localStorage.setItem(ck, JSON.stringify([...c])); };
  const load = async (fn, nm, dly) => {
    if (ld.has(nm)) return;
    ld.add(nm); console.log(`⚡ ${nm}`);
    try { await fn(); console.log(`✅ ${nm}`); setCache(nm); } 
    catch (e) { console.warn(`❌ ${nm}`, e); ld.delete(nm); }
  };
  const trig = () => { 
    if (!q.length) return; 
    console.log(`🚀 ${q.length} módulos`); 
    q.forEach(([fn, nm, dly]) => dly ? setTimeout(() => load(fn, nm), dly) : load(fn, nm)); 
    q.length = 0; 
    stop(); 
  };
  const start = () => { if (ls) return; ls = true; evs.forEach(e => document.addEventListener(e, trig, { once: true, passive: true })); };
  const stop = () => { ls = false; evs.forEach(e => document.removeEventListener(e, trig)); };
  return (fn, nm = 'module', dly = 0) => { 
    const cache = getCache();
    if (cache.has(nm)) { console.log(`💾 ${nm}`); return load(fn, nm, 0); }
    q.push([fn, nm, dly]); 
    start(); 
  };
})();

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