import $ from 'jquery';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { wiFlag, infoCiudad, buscarCiudad, esNoche, getls, savels, Notificacion, wiSpin, wiIp } from '../widev.js';

let uis={ciu:getls('wiciudades')||[], nub:new Set(), int:[], ani:new Map(), geo:null};

// Crear marcas del reloj
const marcas=()=>{let htm='';for(let i=0;i<60;i++){const ang=i*6,cls=i%5===0?'wi_mark wi_mark_hr':'wi_mark wi_mark_min';htm+=`<div class="${cls}" style="transform:rotate(${ang}deg) translateY(-${i%5===0?90:60}px)"></div>`;}return htm;};
const marcasC=()=>{let htm='';for(let i=0;i<60;i++){const ang=i*6,cls=i%5===0?'wi_mark wi_mark_hr':'wi_mark wi_mark_min';htm+=`<div class="${cls}" style="transform:rotate(${ang}deg) translateY(-60px)"></div>`;}return htm;};

// Actualizar manecillas
const updHand=($c,hor,min,seg)=>{const cid=$c.data('zona');uis.ani.has(cid)&&cancelAnimationFrame(uis.ani.get(cid));
  const ani=()=>{const angS=seg*6,angM=min*6+seg*.1,angH=(hor%12)*30+min*.5;
    $c.find('.wi_hand_sec').css('transform',`translateX(-50%) rotate(${angS}deg)`);
    $c.find('.wi_hand_min').css('transform',`translateX(-50%) rotate(${angM}deg)`);
    $c.find('.wi_hand_hr').css('transform',`translateX(-50%) rotate(${angH}deg)`);};
  const fid=requestAnimationFrame(ani);uis.ani.set(cid,fid);};

// Calcular diferencia horaria respecto a ciudad principal
const calcDiff=(zon)=>{if(!uis.geo?.timezone)return'';const mainD=infoCiudad(uis.geo.timezone),citD=infoCiudad(zon);
  if(!mainD?.gmt||!citD?.gmt)return'';const extGMT=gmt=>parseInt(gmt.match(/GMT([+-]?\d+)/)?.[1]||0);
  const dif=extGMT(citD.gmt)-extGMT(mainD.gmt);
  return dif===0?`<i class="fas fa-exchange-alt"></i> Misma hora`:dif>0?`<i class="fa-solid fa-rotate-right"></i> +${dif}h`:`<i class="fa-solid fa-rotate-left"></i> ${dif}h`;};

// Reloj principal con info IP
const relojP=()=>{const tz=uis.geo?.timezone||'America/Lima',inf=infoCiudad(tz),dia=esNoche(inf?.hora?.split(':')[0]||'12');
  const marc=marcas();return `<div class="wi_card_main ${dia?'es-dia':'es-noche'}" data-zona="${tz}">
  <div class="wi_main_cnt"><div class="wi_analogico"><div class="wi_reloj_face"><div class="wi_reloj_marks">${marc}</div>
  <div class="wi_hand wi_hand_hr"></div><div class="wi_hand wi_hand_min"></div><div class="wi_hand wi_hand_sec"></div><div class="wi_reloj_center"></div></div></div>
  <div class="wi_digital"><div class="wi_header_info"><img src="${wiFlag((uis.geo?.country||'PE').slice(0,2))}" class="wi_flag">
  <div class="wi_location"><h3 class="wi_ciudad">${uis.geo?.city||'Lima'}</h3><p class="wi_pais">${uis.geo?.country||'Perú'}</p></div>
  <div class="wi_icon"><i class="fas fa-${dia?'sun':'moon'}"></i></div></div>
  <div class="wi_time">${inf?.hora||'00:00:00'}</div><div class="wi_fecha">${inf?.fecha||''}</div>
  <div class="wi_info"><div class="wi_info_item"><i class="fas fa-map-marker-alt"></i><span>${uis.geo?.region||'Lima'}</span></div>
  <div class="wi_info_item"><i class="fas fa-globe"></i><span>${inf?.gmt||'GMT-5'}</span></div>
  <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${inf?.estacion||'Verano'}</span></div></div>
  <div class="wi_ip_info"><div class="wi_ip_item"><i class="fas fa-network-wired"></i><span>IP: ${uis.geo?.ip||'---'}</span></div>
  <div class="wi_ip_item"><i class="fas fa-desktop"></i><span>${uis.geo?.device||'Escritorio'} • ${uis.geo?.browser||'Chrome'}</span></div>
  <div class="wi_ip_item"><i class="fas fa-tv"></i><span>${uis.geo?.viewport||'1920×1080'}</span></div></div></div></div></div>`;};

// Card ciudad compacta
const cardC=cit=>{const inf=infoCiudad(cit.zona),dia=esNoche(inf?.hora?.split(':')[0]||'12'),dif=calcDiff(cit.zona),marc=marcasC();
  return `<div class="wi_card_compact ${dia?'es-dia':'es-noche'}" data-id="${cit.id}" data-zona="${cit.zona}">
  <div class="wi_compact_hd"><div class="wi_compact_acts">
  <i class="fas fa-cloud nub ${uis.nub.has(cit.id)?'':'off'}"></i>
  <button class="ico" data-act="x"><i class="fas fa-trash"></i></button></div></div>
  <div class="wi_compact_cnt"><div class="wi_analogico_small"><div class="wi_reloj_face"><div class="wi_reloj_marks">${marc}</div>
  <div class="wi_hand wi_hand_hr"></div><div class="wi_hand wi_hand_min"></div><div class="wi_hand wi_hand_sec"></div><div class="wi_reloj_center"></div></div></div>
  <div class="wi_digital_compact"><div class="wi_header_info"><img src="${wiFlag(cit.codigo)}" class="wi_flag">
  <div class="wi_location"><h3 class="wi_ciudad">${cit.ciudad}</h3><p class="wi_pais">${cit.pais}</p></div>
  <div class="wi_icon"><i class="fas fa-${dia?'sun':'moon'}"></i></div></div>
  <div class="wi_time">${inf?.hora||'00:00:00'}</div><div class="wi_fecha">${inf?.fecha||''}</div>
  <div class="wi_info"><div class="wi_info_item"><i class="fas fa-clock"></i><span class="wi_diferencia">${dif}</span></div>
  <div class="wi_info_item"><i class="fas fa-globe"></i><span>${inf?.gmt||'GMT+0'}</span></div>
  <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${inf?.estacion||'Verano'}</span></div></div></div></div></div>`;};

// Vista principal
const view=()=>`<div class="wi_times">
<div class="wi_main">${relojP()}</div>
<div class="wi_sec_hd"><h3><i class="fas fa-map-marked-alt"></i> CIUDADES AGREGADAS</h3>
<button class="ico" data-act="b"><i class="fas fa-search"></i></button></div>
<div class="wi_srch wi-hide"><i class="fas fa-search"></i><input class="srCity" placeholder="Buscar ciudad..."></div>
<div class="wi_srlist wi-hide"></div>
<div class="wi_grid">${uis.ciu.length?uis.ciu.map(cardC).join(''):`<div class="empty"><i class="far fa-folder-open"></i><p>No hay ciudades agregadas</p></div>`}</div></div>`;

// Actualizar reloj
const updReloj=(zon,$c)=>{try{const dat=infoCiudad(zon);if(!dat)return;const[hor,min,seg]=dat.hora.split(':').map(Number);
  const dia=esNoche(dat.hora);$c.removeClass('es-dia es-noche').addClass(dia?'es-dia':'es-noche');
  updHand($c,hor,min,seg);$c.find('.wi_time').text(dat.hora);$c.find('.wi_fecha').text(dat.fecha);
  $c.find('.wi_info_item span').eq(1).text(dat.gmt);$c.find('.wi_info_item span').eq(2).text(dat.estacion);
  $c.find('.wi_icon i').attr('class',`fas ${dia?'fa-sun':'fa-moon'}`);
  if($c.hasClass('wi_card_compact'))$c.find('.wi_diferencia').html(calcDiff(zon));}catch(e){console.error('updReloj:',e);}};

// Cargar DB
const dbLoad=async()=>{const snp=await getDocs(collection(db,'wiciudades'));uis.ciu=snp.docs.map(dc=>dc.data());
  uis.nub=new Set(snp.docs.map(dc=>dc.id));savels('wiciudades',uis.ciu,24);$('.wi_grid').html(uis.ciu.length?uis.ciu.map(cardC).join(''):`<div class="empty"><i class="far fa-folder-open"></i><p>No hay ciudades</p></div>`);initRelojes();};

// Eliminar de DB
const dbDel=async(nid,btn)=>{wiSpin(btn,true);await deleteDoc(doc(db,'wiciudades',nid));uis.nub.delete(nid);wiSpin(btn,false);Notificacion('Eliminada de nube','success');};

// Iniciar relojes
const initRelojes=()=>{uis.int.forEach(clearInterval);uis.int=[];uis.ani.forEach(id=>cancelAnimationFrame(id));uis.ani.clear();
  $('.wi_card_main, .wi_card_compact').each((_,c)=>{const $c=$(c),zon=$c.data('zona');updReloj(zon,$c);
    const itv=setInterval(()=>updReloj(zon,$c),1000);uis.int.push(itv);});};

// Módulo
export const modTiempos={
  async init(sel){
    uis.geo=getls('wiIp')||await new Promise(r=>wiIp(d=>(savels('wiIp',d,24),r(d))));
    $(sel).html(view());await dbLoad();initRelojes();
    $(document)
      .on('click.wt','[data-act="b"]',()=>{$('.wi_srch').toggleClass('wi-hide');$('.wi_srch').hasClass('wi-hide')||$('.srCity').focus();})
      .on('input.wt','.srCity',function(){const qrs=$(this).val().trim(),$l=$('.wi_srlist');
        if(qrs.length<3){$l.addClass('wi-hide').empty();return;}
        const res=buscarCiudad(qrs).slice(0,8);
        $l.html(res.map(cit=>`<div class="sr_itm" data-c='${JSON.stringify(cit)}'><img src="${wiFlag(cit.codigo)}" class="flag_sm"> ${cit.ciudad}, ${cit.pais}</div>`).join('')).removeClass('wi-hide');})
      .on('click.wt','.sr_itm',function(){const cit=JSON.parse($(this).attr('data-c'));
        if(uis.ciu.some(x=>x.ciudad===cit.ciudad&&x.pais===cit.pais))return Notificacion('Ya existe','warning');
        const newC={...cit,id:`${cit.codigo}_${Date.now()}`,creadoEn:Timestamp.now(),actualizadoEn:Timestamp.now()};
        uis.ciu.push(newC);savels('wiciudades',uis.ciu,24);$('.wi_grid').html(uis.ciu.map(cardC).join(''));
        setDoc(doc(db,'wiciudades',newC.id),newC).then(()=>{uis.nub.add(newC.id);Notificacion('Agregada y guardada','success');});
        $('.srCity').val('');$('.wi_srlist').addClass('wi-hide').empty();$('.wi_srch').addClass('wi-hide');initRelojes();})
      .on('click.wt','[data-act="x"]',function(){const $it=$(this).closest('.wi_card_compact'),nid=$it.data('id');
        uis.ciu=uis.ciu.filter(cx=>cx.id!==nid);savels('wiciudades',uis.ciu,24);
        if(uis.nub.has(nid))dbDel(nid,this);$it.fadeOut(()=>$it.remove());});
  },
  async actualizar(){await dbLoad();Notificacion('Sincronizado','success');},
  destroy(){uis.int.forEach(clearInterval);uis.int=[];uis.ani.forEach(id=>cancelAnimationFrame(id));uis.ani.clear();$(document).off('.wt');}
};