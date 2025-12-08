import $ from 'jquery';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { getls, savels, Notificacion, abrirModal, cerrarModal, getbd, savebd, wiSpin } from '../widev.js';

