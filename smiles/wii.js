import $ from 'jquery';
import { savels, getls} from './widev.js';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v34';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START](1)
git add . ; git commit -m "Actualizacion Principal v34.10.10" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto.(2)
git tag v34 -m "Version v34" ; git push origin v34

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v34 ; git tag v34 -m "Version v34 actualizada" ; git push origin v34 --force
 ACTUALIZACION TAG[END] */ 

