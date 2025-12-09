import $ from 'jquery';
import { savels, getls} from './widev.js';

// INFORMACIÓN DEL APP 
export let app = 'WiiPrime'
export let lanzamiento = 2024;
export let autor = '@wilder.taype';
export let link = 'https://wtaype.github.io/';
export let version = 'v38';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [START](1)
git add . ; git commit -m "Actualizacion Principal v38.10.10" ; git push origin main

// Actualizar main luego esto, pero si es mucho, solo esto.(2)
git tag v38 -m "Version v38" ; git push origin v38

// En caso de emergencia, para actualizar el Tag existente. (3)
git tag -d v38 ; git tag v38 -m "Version v38 actualizada" ; git push origin v37 --force
 ACTUALIZACION TAG[END] */ 

