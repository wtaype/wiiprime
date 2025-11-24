import $ from 'jquery';

export { footer };
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v10';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  
git add . ; git commit -m "Actualizacion Principal v10.10.90" ; git push origin main

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

