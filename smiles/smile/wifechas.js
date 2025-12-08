import $ from 'jquery';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { wiFlag, infoCiudad, buscarCiudad, esNoche, getls, savels, Notificacion, wiSpin, wiIp } from '../widev.js';
