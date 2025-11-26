import $ from 'jquery';
import { savels, getls} from './widev.js';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v15';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  (1)
git add . ; git commit -m "Actualizacion Principal v15.10.10" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto. (2)
git tag v15 -m "Version v15" ; git push origin v15

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v15 ; git tag v15 -m "Version v15 actualizada" ; git push origin v15 --force
 ACTUALIZACION TAG[END] */ 

 // ===  ⚡ CARGA INTELIGENTE v12 ===
export const wiSmart = (() => {
  const cargados = new Set(), cache = getls('wiSmart'); //Primero cache
  const cargar = (tipo, url) => {
    const clave = `${tipo}:${url}`;
    if (cargados.has(clave)) return;
    cargados.add(clave);
    tipo === 'css' ? !$(`link[href="${url}"]`).length && $('<link>', { rel: 'stylesheet', href: url }).appendTo('head') : import(/* @vite-ignore */ url);
  };
  const procesar = (objeto) => {
    $.each(objeto, (tipo, urls) => $.each($.isArray(urls) ? urls : [urls], (i, url) => cargar(tipo, url)));
    savels('wiSmart', 1);
  };
  return (objeto) => cache ? procesar(objeto) : $(document).one('scroll click', () => procesar(objeto));
})();