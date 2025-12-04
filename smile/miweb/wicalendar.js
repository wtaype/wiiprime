import $ from 'jquery';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase/init.js';
import { collection, doc, setDoc, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { getls, savels, Notificacion, abrirModal, cerrarModal, getbd, savebd, wiSpin } from '../widev.js';

let uis={nts:getls('wifechas')||[], cal:null, nub:new Set()};
const colr=c=>({cumpleanos:'#FF5C69',trabajo:'#0EBEFF',personal:'#29C72E',otros:'#ffa726'}[c]||'#ffa726');
const toISO=ts=>{const d=ts.toDate?.();if(!d)return new Date().toISOString().split('T')[0];const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');return`${y}-${m}-${dd}`;};

// DB
const dbLoad=async()=>{const snp=await getDocs(collection(db,'wifechas'));uis.nts=snp.docs.map(dc=>dc.data());uis.nub=new Set(snp.docs.map(dc=>dc.id));savels('wifechas',uis.nts,24);};
const dbSave=async(nid,btn)=>{wiSpin(btn,true);const nt=uis.nts.find(nx=>nx.id===nid);if(!nt){wiSpin(btn,false);return;}
  await setDoc(doc(db,'wifechas',nid),nt);uis.nub.add(nid);$(`[data-id="${nid}"] .nub`).removeClass('off');wiSpin(btn,false);Notificacion('Guardada','success');};
const dbDel=async(nid,btn)=>{wiSpin(btn,true);await deleteDoc(doc(db,'wifechas',nid));uis.nub.delete(nid);wiSpin(btn,false);Notificacion('Eliminada de nube','success');};

// HTML
const card=nt=>`<div class="note_itm ${nt.categoria}" data-id="${nt.id}"><div class="nt_hd"><div class="ttl">${nt.titulo||''}</div><div class="acts">
<i class="fas fa-cloud nub ${uis.nub.has(nt.id)?'':'off'}"></i><button class="ico" data-act="e"><i class="fas fa-edit"></i></button>
<button class="ico" data-act="x"><i class="fas fa-trash"></i></button></div></div>
<div class="nt_meta"><i class="fas fa-calendar"></i> ${getbd(nt.fechaCreado)}${nt.hora?` <i class="fas fa-clock"></i> ${nt.hora}`:''}</div>
${nt.descripcion?`<div class="nt_desc">${nt.descripcion}</div>`:''}<div class="nt_foot"><span class="nt_cat">${nt.categoria}</span></div></div>`;
const lst=arr=>arr.length?arr.sort((aaa,bbb)=>(bbb.actualizadoEn?.seconds||0)-(aaa.actualizadoEn?.seconds||0)).map(card).join(''):`<div class="empty"><i class="far fa-folder-open"></i><p>No hay notas</p></div>`;
const view=()=>`<section class="wtm_cal"><div class="sec_hd"><h3><i class="fas fa-calendar-alt"></i> CALENDARIO</h3></div><div id="calendar"></div></section>
<section class="wtm_nts"><div class="sec_hd"><h3><i class="fas fa-sticky-note"></i> NOTAS</h3><button class="ico" data-act="b"><i class="fas fa-search"></i></button></div>
<div class="srch" style="display:none"><i class="fas fa-search"></i><input class="srNote" placeholder="Buscar..."></div><div id="noteList" class="note_list">${lst(uis.nts)}</div></section>`;
const mdl=(fec=null,nt=null)=>{
  const fecVal=fec||(nt?toISO(nt.fechaCreado):new Date().toISOString().split('T')[0]);
  const horVal=nt?.hora||'00:00';
  return `<div id="mdNota" class="wiModal"><div class="modalBody"><button class="modalX" data-act="c"><i class="fas fa-times"></i></button>
<div class="modal_hd"><h3><i class="fas fa-sticky-note"></i> ${nt?'Editar':'Nueva'} Nota</h3></div><div class="modal_body">
<div class="form_grp"><label><i class="fas fa-heading"></i> Título *</label><input class="md-t" maxlength="100" value="${nt?.titulo||''}"></div>
<div class="form_grp"><label><i class="fas fa-align-left"></i> Descripción</label><textarea class="md-d" maxlength="200" rows="3">${nt?.descripcion||''}</textarea>
<span class="char_count"><span class="md-count">0</span>/200</span></div><div class="form_row">
<div class="form_grp"><label><i class="fas fa-calendar"></i> Fecha *</label><input type="date" class="md-f" value="${fecVal}"></div>
<div class="form_grp"><label><i class="fas fa-clock"></i> Hora</label><input type="time" class="md-h" value="${horVal}"></div></div>
<div class="form_grp"><label><i class="fas fa-tag"></i> Categoría *</label><div class="cat_grid">${['cumpleanos','trabajo','personal','otros'].map(cat=>
`<label class="cat_opt ${nt?.categoria===cat||(!nt&&cat==='otros')?'active':''}"><input type="radio" name="md-c" value="${cat}" ${nt?.categoria===cat||(!nt&&cat==='otros')?'checked':''}>
<span class="cat_ico" style="background:${colr(cat)}"></span><span class="cat_txt">${cat}</span></label>`).join('')}</div></div></div>
<div class="modal_ftr"><button class="btn_sec" data-act="c"><i class="fas fa-times"></i> Cancelar</button>
<button class="btn_pri" data-act="sv" data-id="${nt?.id||''}"><i class="fas fa-cloud-upload-alt"></i> Guardar en Cloud</button></div></div></div>`;};

// UI
const openM=(fec=null,nt=null)=>{$('#mdNota').remove();$('body').append(mdl(fec,nt));abrirModal('mdNota');const $mm=$('#mdNota');$mm.find('.md-t').focus();$mm.find('.md-count').text($mm.find('.md-d').val().length);};
const refr=()=>$('#noteList').html(lst(uis.nts));
const addC=nt=>uis.cal.addEvent({id:nt.id,title:nt.titulo,start:nt.fechaCreado.toDate?.()||new Date(nt.fechaCreado),backgroundColor:colr(nt.categoria),borderColor:colr(nt.categoria),textColor:'#fff'});

// Submit
const subm=(nid,btn)=>{
  wiSpin(btn,true);
  const $mm=$('#mdNota'),ttl=$mm.find('.md-t').val().trim(),dsc=$mm.find('.md-d').val().trim(),fstr=$mm.find('.md-f').val(),hor=$mm.find('.md-h').val()||'00:00',cat=$mm.find('input[name="md-c"]:checked').val();
  if(!ttl||ttl.length<3||!fstr){wiSpin(btn,false);return Notificacion('Completa título y fecha','warning');}
  const prev=uis.nts.find(nx=>nx.id===nid),ahora=Timestamp.now(),tsel=savebd(fstr);
  let cre,upd,fec;
  if(prev){cre=prev.creadoEn;upd=ahora;const prevISO=toISO(prev.fechaCreado);fec=prevISO===fstr?prev.fechaCreado:tsel;}
  else{cre=ahora;upd=ahora;fec=tsel;}
  const nt={id:nid||`nota_${Date.now()}`,titulo:ttl.slice(0,100),descripcion:dsc.slice(0,200),categoria:cat,hora:hor,fechaCreado:fec,creadoEn:cre,actualizadoEn:upd};
  if(prev){uis.nts=uis.nts.map(nx=>nx.id===nt.id?nt:nx);uis.cal.getEventById(nt.id)?.remove();}else{uis.nts.push(nt);}
  savels('wifechas',uis.nts,24);
  setDoc(doc(db,'wifechas',nt.id),nt).then(()=>{uis.nub.add(nt.id);refr();addC(nt);cerrarModal('mdNota');wiSpin(btn,false);Notificacion(prev?'Actualizada':'Creada','success');})
  .catch(e=>{wiSpin(btn,false);Notificacion('Error: '+e.message,'error');});
};

// Módulo
export const modCalendario={
  async init(sel){
    $(sel).html(view());await dbLoad();
    uis.cal=new Calendar($('#calendar')[0],{plugins:[dayGridPlugin,interactionPlugin],locale:esLocale,firstDay:1,initialView:'dayGridMonth',
      headerToolbar:{left:'prev,next today',center:'title',right:'dayGridMonth'},dateClick:e=>openM(e.dateStr),
      eventClick:e=>{const nt=uis.nts.find(nx=>nx.id===e.event.id);nt&&openM(null,nt);},
      events:uis.nts.map(nt=>({id:nt.id,title:nt.titulo,start:nt.fechaCreado.toDate?.()||new Date(nt.fechaCreado),backgroundColor:colr(nt.categoria),borderColor:colr(nt.categoria),textColor:'#fff'}))
    });uis.cal.render();
    $(document)
      .on('click.wc','[data-act="b"]',()=>$('.srch').slideToggle().find('.srNote').focus())
      .on('input.wc','#mdNota .md-d',function(){$('#mdNota .md-count').text(this.value.length);})
      .on('click.wc','#mdNota .cat_opt',function(){$('#mdNota .cat_opt').removeClass('active').find('input').prop('checked',false);$(this).addClass('active').find('input').prop('checked',true);})
      .on('click.wc','[data-act="e"]',function(){const nid=$(this).closest('.note_itm').data('id');const nt=uis.nts.find(nx=>nx.id===nid);nt&&openM(null,nt);})
      .on('click.wc','[data-act="x"]',function(){const $it=$(this).closest('.note_itm'),nid=$it.data('id');
        uis.nts=uis.nts.filter(nx=>nx.id!==nid);savels('wifechas',uis.nts,24);uis.cal.getEventById(nid)?.remove();
        if(uis.nub.has(nid))dbDel(nid,this);$it.fadeOut(()=>$it.remove());})
      .on('click.wc','[data-act="c"]',()=>cerrarModal('mdNota'))
      .on('click.wc','[data-act="sv"]',function(){subm($(this).data('id'),this);})
      .on('input.wc','.srNote',function(){const qrs=this.value.trim().toLowerCase();if(qrs.length<3)return refr();
        const flt=uis.nts.filter(nt=>(nt.titulo||'').toLowerCase().includes(qrs)||nt.descripcion?.toLowerCase().includes(qrs));
        $('#noteList').html(flt.length?flt.map(card).join(''):`<div class="empty"><i class="far fa-folder-open"></i><p>Sin resultados</p></div>`);});
  },
  async actualizar(){await dbLoad();refr();if(uis.cal){uis.cal.removeAllEvents();uis.nts.forEach(addC);}Notificacion('Sincronizado','success');},
  destroy(){uis.cal&&uis.cal.destroy();$(document).off('.wc');}
};