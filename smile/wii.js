import $ from 'jquery';
import { savels, getls} from './widev.js';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v15';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  (1)
git add . ; git commit -m "Actualizacion Principal v15.10.18" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto. (2)
git tag v15 -m "Version v15" ; git push origin v15

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v15 ; git tag v15 -m "Version v15 actualizada" ; git push origin v15 --force
 ACTUALIZACION TAG[END] */ 

// ===  ⚡ CARGA INTELIGENTE v14 ===
export const wiSmart = (() => {
  const cargados = new Set(), cache = getls('wiSmart');
  const cargar = (tipo, item) => {
    const clave = `${tipo}:${item}`;
    if (cargados.has(clave)) return; 
    cargados.add(clave);
    tipo === 'css' 
      ? !$(`link[href="${url}"]`).length && $('<link>', { rel: 'stylesheet', href: url }).appendTo('head') 
      : typeof item === 'function' && item().catch?.(e => console.error('wiSmart js error:', e));
  };
  const procesar = (obj) => {
    $.each(obj, (tipo, items) => $.each($.isArray(items) ? items : [items], (i, it) => cargar(tipo, it)));
    savels('wiSmart', 1);
  };
  return (obj) => cache ? procesar(obj) : $(document).one('touchstart scroll click mousemove', () => procesar(obj));
})();