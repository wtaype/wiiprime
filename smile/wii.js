import $ from 'jquery';
import { savels, getls} from './widev.js';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v22';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START]  (1)
git add . ; git commit -m "Actualizacion Principal v22.10.10" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto. (2)
git tag v22 -m "Version v22" ; git push origin v22

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v22 ; git tag v22 -m "Version v22 actualizada" ; git push origin v22 --force
 ACTUALIZACION TAG[END] */ 

