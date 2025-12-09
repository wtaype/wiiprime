import{$ as t,i as f,e as M,a as x,w as O,g as $,c as A,s as w,N as m,d as v,r as B,S as F}from"./main-DxGZhU02.js";import{d as p}from"./init-BEP28Gdd.js";import{g as G,c as R,s as T,d as z,a as V,b as y}from"./firebase-DNbm1GOU.js";import"./vendor-B2AETYxa.js";const S=async()=>{t(".wiMeses").html(`
      <h3>Esto es una zona horaria One:  ${_.usuario}!</h3>
      
    `),t(".wiMeses h3").click(function(){alert("¡Hola mi vidita preciosa muaaak! 😄")})};function J(i,o,s=null){const e=s||i.zona,r=f(e);if(i.zona===e)return'<i class="fas fa-map-marker-alt"></i> Tu Ciudad';if(!r?.gmt||!o.gmt)return"";const l=a=>parseInt(a.match(/GMT([+-]?\d+)/)?.[1]||0),d=l(o.gmt)-l(r.gmt);return d===0?'<i class="fas fa-exchange-alt"></i> Misma hora':`<i class="fa-solid fa-rotate-${d>0?"right":"left"}"></i> ${d>0?"+":""}${d}h`}let E=!0;function X(){t(".whFormato .btn").on("click",function(){E=t(this).hasClass("formato24"),t(".whFormato .btn").removeClass("active").end().addClass("active"),t(".wihora_card").each((i,o)=>{const s=t(o).data("zona"),e=f(s);e&&t(o).find(".wihora_time").text(b(e.hora))})})}function b(i){if(E)return i;const[o,s,e]=i.split(":"),r=parseInt(o),l=r>=12?"PM":"AM";return`${r%12||12}:${s}:${e} ${l}`}function j(i){const o=f(i);if(!o)return"";const s=Array.from({length:60},(a,n)=>{const c=n*6;return`<div class="${n%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute"}" style="transform:rotate(${c}deg) translateY(-90px)"></div>`}).join(""),[e,r,l]=o.hora.split(":").map(Number),d={seg:l*6,min:r*6+l*.1,hor:e%12*30+r*.5};return`<div class="wihora_analogico"><div class="wihora_reloj_face"><div class="wihora_reloj_marks">${s}</div>${["hour","minute","second"].map((a,n)=>`<div class="wihora_hand wihora_hand_${a}" style="transform:translateX(-50%) rotate(${Object.values(d)[n]}deg)"></div>`).join("")}<div class="wihora_reloj_center"></div></div></div>`}function k(i){const o=f(i);return o?.hora?b(o.hora):"00:00:00"}function C(i){return f(i)?.fecha||"Fecha no disponible"}function H(i){const o=f(i.zona);if(!o)return"";const s=M(o.hora);return`
    <img src="${x(i.codigo)}" alt="${i.pais}" class="wihora_flag">
    <div class="wihora_location">
      <h3 class="wihora_ciudad">${i.ciudad}</h3>
      <p class="wihora_pais">${i.pais}</p>
    </div>
    <div class="wihora_icon">
      <i class="fas fa-${s?"sun":"moon"}"></i>
    </div>`}function D(i,o=null){const s=f(i.zona);return s?`
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${J(i,s,o)}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-globe"></i>
        <span class="wihora_gmt">${s.gmt}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-leaf"></i>
        <span class="wihora_estacion">${s.estacion}</span>
      </div>
    </div>`:""}function Y(){t(".whVistas .btn").on("click",function(){t(".whVistas .btn").removeClass("active"),t(this).addClass("active"),t(".wi_grid").toggleClass("whLista",t(this).hasClass("vistaLista"))})}let g=[];function P(){g.forEach(clearInterval),g=[],t(".wihora_card").each((i,o)=>{const s=t(o),e=s.data("zona");I(s,e),g.push(setInterval(()=>I(s,e),1e3))})}function I(i,o){const s=f(o);if(!s)return;const[e,r,l]=s.hora.split(":").map(Number),d=M(s.hora),a={seg:l*6,min:r*6+l*.1,hor:e%12*30+r*.5};i.removeClass("es-dia es-noche").addClass(d?"es-dia":"es-noche"),["second","minute","hour"].forEach((n,c)=>i.find(`.wihora_hand_${n}`).css("transform",`translateX(-50%) rotate(${Object.values(a)[c]}deg)`)),i.find(".wihora_time").text(b(s.hora)),i.find(".wihora_fecha").text(s.fecha),i.find(".wihora_icon i").attr("class",`fas fa-${d?"sun":"moon"}`)}function q(){const i=t(".whBuscar_input input"),o=t(".whDropdown");i.on("input",function(){const s=t(this).val();if(!s||s.length<2)return o.hide();const e=Object.values(O).flat().filter(r=>[r.ciudad,r.pais].some(l=>l.toLowerCase().includes(s.toLowerCase().trim()))).slice(0,5);if(!e.length)return o.hide();o.html(e.map(r=>`<div class="whDropdown_item" data-ciudad='${JSON.stringify(r)}'><img src="${x(r.codigo)}" alt="${r.pais}" class="whDropdown_flag"><div class="whDropdown_info"><strong>${r.ciudad}</strong><span>${r.pais}</span></div></div>`).join("")).show()}),t(document).on("click",".whDropdown_item",function(){t(this).trigger("agregar-ciudad",[JSON.parse(t(this).attr("data-ciudad"))]),o.hide(),i.val("")}).on("click",s=>!t(s.target).closest(".whBuscar_input").length&&o.hide())}const N=async()=>{const i=$("smileIP")||await new Promise(a=>A(n=>(w("smileIP",n),a(n)))),o={ciudad:i.region,pais:i.country,zona:i.timezone,codigo:i.country},s=(a,n=null)=>{if(!f(a.zona))return"";const h=D(a),u=n?`
      <div class="wihora_info">
        <div class="wihora_info_item">
          <i class="fa-solid fa-house"></i>
          <span>${n.city}, ${n.country}</span>
        </div>
        <div class="wihora_info_item">
          <i class="fas fa-globe-americas"></i>
          <span>IP: ${n.ip}</span>
        </div>
        <div class="wihora_info_item">
          <i class="fa-solid fa-globe"></i>
          <span>${n.browser}</span>
        </div>
      </div>`:"";return`
      <div class="whPrincipal">
        <div class="wihora_card wihora_principal glass-card" data-zona="${a.zona}">
          <div class="wihora_card_content">
            ${j(a.zona)}
            <div class="wihora_digital_section">
              <div class="wihora_header_info">${H(a)}</div>
              <div class="wihora_time">${k(a.zona)}</div>
              <div class="wihora_fecha">${C(a.zona)}</div>
              ${h+u}
            </div>
          </div>
        </div>
      </div>
      <div class="whHeader">
        <div class="whBuscar_input">
          <input type="text" placeholder="Buscar ciudad o país...">
          <div class="whDropdown"></div>
        </div>
        <div class="whControles">
          <div class="whFormato">
            <button class="btn formato12">12h</button>
            <button class="btn formato24 active">24h</button>
          </div>
          <div class="whVistas">
            <button class="btn vistaGrid"><i class="fas fa-th"></i></button>
            <button class="btn vistaLista active"><i class="fas fa-list"></i></button>
          </div>
        </div>
      </div>`},e=a=>`
    <div class="wihora_estados">
    <button class="wihora_delete" data-id="${a.id||""}" data-zona="${a.zona}">
    <i class="fas fa-trash-alt"></i>
    </button>
    <button class="wihora_cloud" data-id="${a.id||""}" data-zona="${a.zona}">
      <i class="fas fa-cloud${a.id?"-upload-alt":""}"></i>
    </button>
    </div>`,r=(a,n)=>`
    <div class="wihora_card glass-card" data-zona="${a.zona}" data-id="${a.id||""}" style="order:${a.orden||0}">
      ${e(a)}
      <div class="wihora_card_content">
        ${j(a.zona)}
        <div class="wihora_digital_section">
          <div class="wihora_header_info">${H(a)}</div>
          <div class="wihora_time">${k(a.zona)}</div>
          <div class="wihora_fecha">${C(a.zona)}</div>
          ${D(a,n)}
        </div>
      </div>
    </div>`,d=$("wiHoras")||await G(R(p,"wiHoras")).then(a=>{const n=a.docs.map(c=>c.data()).sort((c,h)=>c.orden-h.orden);return w("wiHoras",n,450),n});t(".wiHoras").html(`
    ${s(o,i)}
    <div class="whGrids"><div class="wi_grid whLista">${d.map(a=>r(a,i.timezone)).join("")}</div></div>
  `),t(document).on("agregar-ciudad",".whDropdown_item",function(a,n){const c=r({...n,id:null,orden:0},i.timezone);t(".wi_grid").prepend(c),P()}),t(document).on("click",".wihora_cloud",async function(){const a=t(this);if(a.data("id"))return m("Ya está guardado en la nube","info");v(a,!0);const c=a.data("zona"),h=Object.values(O).flat().find(L=>L.zona===c);if(!h)return v(a,!1),m("Ciudad no encontrada","error");const u=`${h.codigo}_${Date.now()}`;await T(z(p,"wiHoras",u),{id:u,pais:h.pais,ciudad:h.ciudad,codigo:h.codigo,zona:h.zona,orden:t(".wihora_card").length-1,creadoEn:y(),actualizadoEn:y(),usuario:_.usuario,email:_.email}),a.attr("data-id",u).find("i").removeClass("fa-cloud").addClass("fa-cloud-upload-alt"),a.closest(".wihora_card").attr("data-id",u),v(a,!1),w("wiHoras",null),m("Guardado en la nube","success")}),t(document).on("click",".wihora_delete",async function(){if(!confirm("¿Eliminar este reloj?"))return;const a=t(this),n=a.closest(".wihora_card"),c=a.data("id");v(a,!0),n.fadeOut(300,async()=>{c&&(await V(z(p,"wiHoras",c)),w("wiHoras",null)),n.remove(),v(a,!1),m("Reloj eliminado","success")})}),q(),P(),X(),Y()},Z=async()=>{t(document).on("click",".wfresh",async function(){v(this,!0,"Actualizando",500),await Promise.all([N(),S()]),B("wiHoras")})};let _=$("wiSmile");const aa=async()=>`
   <div class="miweb">
    <div class="mhead">
     <div class="mhead_left">
      <h1 class="mh1"><i class="fas fa-trophy"></i> ${F()} ${_.nombre}</h1>
      <ul class="mfeatures">
       <li><i class="fas fa-check-circle"></i> Personaliza las zonas horarias</li>
       <li><i class="fas fa-check-circle"></i> Personaliza el calendario</li>
       <li><i class="fas fa-check-circle"></i> Sincroniza en tiempo real</li>
      </ul>
     </div>
     <div class="mhead_right">
      <button class="btn wfresh">Actualizar <i class="fa-solid fa-rotate-right"></i></button>
     </div>
    </div>
    <div class="mibody">
     <div class="wiHoras"></div>
     <div class="wiMeses"></div>
    </div>
   </div>
  `,ia=async()=>{N(),S(),Z()},sa=()=>{console.log("😊 Smile limpiado")};export{sa as cleanup,ia as init,aa as render,_ as smile};
