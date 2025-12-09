import{$ as o,i as c,e as v,a as f,w as l,g as _,c as x,s as I,d as L,S as H}from"./main--M2MBI8p.js";import"./init-CVXZIq44.js";import"./firebase-B7LTxXbg.js";import"./vendor-B2AETYxa.js";const p=async()=>{o(".wiMeses").html(`
      <h3>Esto es una zona horaria One:  ${y.usuario}!</h3>
      
    `),o(".wiMeses h3").click(function(){alert("¡Hola mi vidita preciosa muaaak! 😄")})},D=Array.from({length:60},(a,s)=>{const i=s*6;return`<div class="${s%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute"}" style="transform:rotate(${i}deg) translateY(-90px)"></div>`}).join(""),u=(a,s)=>{if(a.ciudad==="Lima")return'<i class="fas fa-map-marker-alt"></i> Tu Ciudad';const i=c("America/Lima");if(!i?.gmt||!s.gmt)return"";const t=r=>parseInt(r.match(/GMT([+-]?\d+)/)?.[1]||0),n=t(s.gmt)-t(i.gmt);return n===0?'<i class="fas fa-exchange-alt"></i> Misma hora':`<i class="fa-solid fa-rotate-${n>0?"right":"left"}"></i> ${n>0?"+":""}${n}h`};let $=!0;const w=a=>{if($)return a;const[s,i,t]=a.split(":"),n=parseInt(s),r=n>=12?"PM":"AM";return`${n%12||12}:${i}:${t} ${r}`},A=a=>!a||a.length<2?[]:Object.values(l).flat().filter(s=>s.ciudad.toLowerCase().includes(a.toLowerCase().trim())||s.pais.toLowerCase().includes(a.toLowerCase().trim())).slice(0,5),B=()=>{const a=o(".whBuscar_input input"),s=o(".whDropdown");a.on("input",function(){const i=A(o(this).val());if(i.length===0){s.hide();return}s.html(i.map(t=>`
      <div class="whDropdown_item" data-zona="${t.zona}">
        <img src="${f(t.codigo)}" alt="${t.pais}" class="whDropdown_flag">
        <div class="whDropdown_info">
          <strong>${t.ciudad}</strong>
          <span>${t.pais}</span>
        </div>
      </div>
    `).join("")).show()}),o(document).on("click",".whDropdown_item",function(){const i=Object.values(l).flat().find(t=>t.zona===o(this).data("zona"));i&&(o(".wi_grid").prepend(k(i)),j()),s.hide(),a.val("")}),o(document).on("click",i=>{o(i.target).closest(".whBuscar_input").length||s.hide()})},g=a=>{const s=c(a);if(!s)return"";const[i,t,n]=s.hora.split(":").map(Number),r={seg:n*6,min:t*6+n*.1,hor:i%12*30+t*.5};return`<div class="wihora_analogico"><div class="wihora_reloj_face"><div class="wihora_reloj_marks">${D}</div>${["hour","minute","second"].map((e,d)=>`<div class="wihora_hand wihora_hand_${e}" style="transform:translateX(-50%) rotate(${Object.values(r)[d]}deg)"></div>`).join("")}<div class="wihora_reloj_center"></div></div></div>`},b=a=>{const s=c(a);return s?.hora?w(s.hora):"00:00:00"},z=a=>c(a)?.fecha||"Fecha no disponible",S=a=>{const s=c(a.zona);if(!s)return"";const i=v(s.hora);return`
    <img src="${f(a.codigo)}" alt="${a.pais}" class="wihora_flag">
    <div class="wihora_location">
      <h3 class="wihora_ciudad">${a.ciudad}</h3>
      <p class="wihora_pais">${a.pais}</p>
    </div>
    <div class="wihora_icon">
      <i class="fas fa-${i?"sun":"moon"}"></i>
    </div>`},F=a=>{const s=c(a.zona);if(!s)return"";const i=v(s.hora);return`
    <img src="${f(a.codigo)}" alt="${a.pais}" class="wihora_flag">
    <div class="wihora_location">
      <h3 class="wihora_ciudad">${a.ciudad}</h3>
      <p class="wihora_pais">${a.pais}</p>
    </div>
    <div class="wihora_icon">
      <i class="fas fa-${i?"sun":"moon"}"></i>
    </div>`},O=a=>{const s=c(a.zona);return s?`
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${u(a,s)}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-globe"></i>
        <span class="wihora_gmt">${s.gmt}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-leaf"></i>
        <span class="wihora_estacion">${s.estacion}</span>
      </div>
    </div>`:""},G=(a,s=null)=>{const i=c(a.zona);if(!i)return"";const t=`
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-clock"></i>
        <span class="wihora_diferencia">${u(a,i)}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-globe"></i>
        <span class="wihora_gmt">${i.gmt}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-leaf"></i>
        <span class="wihora_estacion">${i.estacion}</span>
      </div>
    </div>`,n=s?`
    <div class="wihora_info">
      <div class="wihora_info_item">
        <i class="fas fa-globe-americas"></i>
        <span>${s.city}, ${s.country}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-desktop"></i>
        <span>${s.device}</span>
      </div>
      <div class="wihora_info_item">
        <i class="fas fa-chrome"></i>
        <span>${s.browser}</span>
      </div>
    </div>`:"";return t+n},k=a=>`
  <div class="wihora_card glass-card" data-zona="${a.zona}">
    <div class="wihora_card_content">
      ${g(a.zona)}
      <div class="wihora_digital_section">
        <div class="wihora_header_info">${S(a)}</div>
        <div class="wihora_time">${b(a.zona)}</div>
        <div class="wihora_fecha">${z(a.zona)}</div>
        ${O(a)}
      </div>
    </div>
  </div>`,R=(a,s=null)=>`
  <div class="wihora_card wihora_principal glass-card" data-zona="${a.zona}">
    <div class="wihora_card_content">
      ${g(a.zona)}
      <div class="wihora_digital_section">
        <div class="wihora_header_info">${F(a)}</div>
        <div class="wihora_time">${b(a.zona)}</div>
        <div class="wihora_fecha">${z(a.zona)}</div>
        ${G(a,s)}
      </div>
    </div>
  </div>`,T=()=>{o(".whFormato .btn").on("click",function(){$=o(this).hasClass("formato24"),o(".whFormato .btn").removeClass("active"),o(this).addClass("active"),o(".wihora_card").each(function(){const a=o(this).data("zona"),s=c(a);s&&o(this).find(".wihora_time").text(w(s.hora))})})},V=()=>{o(".whVistas .btn").on("click",function(){o(".whVistas .btn").removeClass("active"),o(this).addClass("active"),o(".wi_grid").toggleClass("whLista",o(this).hasClass("vistaLista"))})};let h=[];const j=()=>{h.forEach(clearInterval),h=[],o(".wihora_card").each((a,s)=>{const i=o(s),t=i.data("zona");m(i,t),h.push(setInterval(()=>m(i,t),1e3))})},m=(a,s)=>{const i=c(s);if(!i)return;const[t,n,r]=i.hora.split(":").map(Number),e=v(i.hora),d={seg:r*6,min:n*6+r*.1,hor:t%12*30+n*.5};a.removeClass("es-dia es-noche").addClass(e?"es-dia":"es-noche"),["second","minute","hour"].forEach((P,M)=>a.find(`.wihora_hand_${P}`).css("transform",`translateX(-50%) rotate(${Object.values(d)[M]}deg)`)),a.find(".wihora_time").text(w(i.hora)),a.find(".wihora_fecha").text(i.fecha),a.find(".wihora_icon i").attr("class",`fas fa-${e?"sun":"moon"}`)},C=async()=>{const a=_("smileIP")||await new Promise(s=>x(i=>(I("smileIP",i),s(i))));o(".wiHoras").html(`
    <div class="whPrincipal">${R(l.principales[0],a)}</div>
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
    </div>
    <div class="whGrids">
      <div class="wi_grid">
        ${l.principales.slice(1).map(s=>k(s)).join("")}
      </div>
    </div>
  `),B(),j(),T(),V()},E=async()=>{o(document).on("click",".wfresh",async function(){L(this,!0,"Actualizando",500),await Promise.all([C(),p()])})};let y=_("wiSmile");const J=async()=>`
   <div class="miweb">
    <div class="mhead">
     <div class="mhead_left">
      <h1 class="mh1"><i class="fas fa-trophy"></i> ${H()} ${y.nombre}</h1>
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
  `,K=async()=>{C(),p(),E()},Q=()=>{console.log("😊 Smile limpiado")};export{Q as cleanup,K as init,J as render,y as smile};
