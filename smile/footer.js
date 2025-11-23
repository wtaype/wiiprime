import $ from 'jquery';

export { footer };
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v10';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  
git add . ; git commit -m "Actualizacion Principal v10.10.39" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto. 
git tag v10 -m "Version v10" ; git push origin v10
// En caso de emergencia, para actualizar el Tag existente.  
git tag -d v10 ; git tag v10 -m "Version v10 actualizada" ; git push origin v10 --force

 ACTUALIZACION TAG[END] */ 

function footer(){
  const ahora = new Date();
  return `
  <footer class="foo wb txc psa">
    <span>Creado con <i class="fas fa-heart"></i> by <a class="ftx lkme" href="${link}" target="_blank">${autor}</a></span>
    <span>${lanzamiento} - <span class="wty">${ahora.getFullYear()}</span></span>
    <span class="abw"> | ${app} ${version} | actualizado:
    <span class="wtu">${ahora.toLocaleString()}</span></span>
  </footer>
  `;
}; $('body').append(footer());  //Actualizar 

// === AUTO-EJECUCIÓN DE ESTILOS ===
(() => {
  $('style').append(`.foo{width:100%;text-align:center;padding-block:1.5vh 1vh;background:var(--wb);border-radius:1vh 1vh 0 0;}.foo *{font-size:var(--fz_s2);margin-inline:.3vh;}.foo a{color:var(--bg2);}.foo i{color:var(--mco);}.abwc{background:var(--bg);top:0;width:99%;height:100%;padding:2vh 2vw;overflow:scroll;line-height:1.80;}.abwok{background:var(--mco);color:var(--txa);}`);
})();