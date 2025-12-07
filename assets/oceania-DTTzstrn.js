import{w as u,$ as n,b as x,a as $,i as v,e as I}from"./main-Effh8JTN.js";import"./vendor-B2AETYxa.js";let r=[],s=new Map,l=1;const m=9;let h=[...u.oceania];const E=o=>{const a=v("America/Lima"),i=v(o.zona);if(!a?.gmt||!i?.gmt)return"";const c=e=>parseInt(e.match(/GMT([+-]?\d+)/)?.[1]||0),t=c(i.gmt)-c(a.gmt);return t===0?'<i class="fas fa-exchange-alt"></i> Misma hora':t>0?`<i class="fa-solid fa-rotate-right"></i> +${t}h`:`<i class="fa-solid fa-rotate-left"></i> ${t}h`},M=()=>{let o="";for(let a=0;a<60;a++){const i=a*6,c=a%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute";o+=`<div class="${c}" style="transform: rotate(${i}deg) translateY(-60px)"></div>`}return o},k=(o,a,i,c)=>{const t=o.data("zona");s.has(t)&&cancelAnimationFrame(s.get(t));const d=requestAnimationFrame(()=>{const w=c*6,p=i*6+c*.1,b=a%12*30+i*.5;o.find(".wihora_hand_second").css("transform",`translateX(-50%) rotate(${w}deg)`),o.find(".wihora_hand_minute").css("transform",`translateX(-50%) rotate(${p}deg)`),o.find(".wihora_hand_hour").css("transform",`translateX(-50%) rotate(${b}deg)`)});s.set(t,d)},g=(o,a)=>{try{const i=v(o.zona);if(!i)return;const[c,t,e]=i.hora.split(":").map(Number),d=I(i.hora),w=E(o);a.removeClass("es-dia es-noche").addClass(d?"es-dia":"es-noche"),k(a,c,t,e),a.find(".wihora_time").text(i.hora),a.find(".wihora_fecha").text(i.fecha),a.find(".wihora_gmt").text(i.gmt),a.find(".wihora_diferencia").html(w),a.find(".wihora_estacion").text(i.estacion),a.find(".wihora_icon i").attr("class",`fas ${d?"fa-sun":"fa-moon"}`)}catch(i){console.error("❌ Error actualizando reloj:",i)}},_=()=>{const o=(l-1)*m,a=o+m,i=h.slice(o,a),c=M();return i.length===0?`<div class="wicont_empty">
      <i class="fas fa-search"></i>
      <p>No se encontraron ciudades</p>
    </div>`:i.map(t=>`
    <div class="wihora_card wicont_card_compact" data-zona="${t.zona}">
      <div class="wihora_card_content wicont_compact_content">
        <div class="wihora_analogico wicont_analogico_small">
          <div class="wihora_reloj_face">
            <div class="wihora_reloj_marks">${c}</div>
            <div class="wihora_hand wihora_hand_hour"></div>
            <div class="wihora_hand wihora_hand_minute"></div>
            <div class="wihora_hand wihora_hand_second"></div>
            <div class="wihora_reloj_center"></div>
          </div>
        </div>
        
        <div class="wihora_digital_section wicont_digital_compact">
          <div class="wihora_header_info">
            <img src="${$(t.codigo)}" alt="${t.pais}" class="wihora_flag" />
            <div class="wihora_location">
              <h3 class="wihora_ciudad">${t.ciudad}</h3>
              <p class="wihora_pais">${t.pais}</p>
            </div>
            <div class="wihora_icon">
              <i class="fas fa-sun"></i>
            </div>
          </div>
          
          <div class="wihora_time">00:00:00</div>
          <div class="wihora_fecha">Cargando...</div>
          
          <div class="wihora_info">
            <div class="wihora_info_item">
              <i class="fas fa-clock"></i>
              <span class="wihora_diferencia"></span>
            </div>
            <div class="wihora_info_item">
              <i class="fas fa-globe"></i>
              <span class="wihora_gmt">GMT+0</span>
            </div>
            <div class="wihora_info_item">
              <i class="fas fa-leaf"></i>
              <span class="wihora_estacion">Primavera</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("")},f=()=>{const o=Math.ceil(h.length/m);if(o<=1)return"";let a="";const i=5;let c=Math.max(1,l-Math.floor(i/2)),t=Math.min(o,c+i-1);t-c<i-1&&(c=Math.max(1,t-i+1));for(let e=c;e<=t;e++)a+=`<button class="wipag_btn ${e===l?"active":""}" data-pagina="${e}">${e}</button>`;return`
    <div class="wipaginacion">
      <button class="wipag_btn wipag_prev" ${l===1?"disabled":""}>
        <i class="fas fa-chevron-left"></i> Anterior
      </button>
      <div class="wipag_numeros">${a}</div>
      <button class="wipag_btn wipag_next" ${l===o?"disabled":""}>
        Siguiente <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `},F=async()=>`
    <div class="wicontinente">
      <div class="wicont_header">
        <h1 class="wicont_title">🌏 Oceania</h1>
        <p class="wicont_subtitle">Explora las zonas horarias del continente más grande</p>
        
        <div class="wicont_controls">
          <div class="wicont_search">
            <i class="fas fa-search wicont_search_icon"></i>
            <input type="text" id="searchOceania" placeholder="Buscar ciudad o país..." class="wisearch_input" />
            <span class="wicont_count">${h.length} ciudades</span>
          </div>
        </div>
      </div>
      
      <div class="wicont_grid" id="oceaniaGrid">
        ${_()}
      </div>
      
      <div class="wicont_footer">
        ${f()}
      </div>
    </div>
  `,j=()=>{r.forEach(clearInterval),r=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear();const o=()=>{n(".wicont_card_compact").each((a,i)=>{const c=n(i),t=c.data("zona"),e=h.find(d=>d.zona===t);if(e){g(e,c);const d=setInterval(()=>g(e,c),1e3);r.push(d)}})};o(),n("#searchOceania").on("input",function(){const a=n(this).val().trim();h=a?x(a,"oceania"):[...u.oceania],l=1,r.forEach(clearInterval),r=[],s.forEach(i=>cancelAnimationFrame(i)),s.clear(),n("#oceaniaGrid").html(_()),n(".wicont_count").text(`${h.length} ciudades`),n(".wicont_footer").html(f()),o()}),n(document).on("click",".wipag_btn:not(.wipag_prev):not(.wipag_next)",function(){n(this).hasClass("active")||(l=parseInt(n(this).data("pagina")),r.forEach(clearInterval),r=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear(),n("#oceaniaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_prev",()=>{l>1&&(l--,r.forEach(clearInterval),r=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear(),n("#oceaniaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_next",()=>{const a=Math.ceil(h.length/m);l<a&&(l++,r.forEach(clearInterval),r=[],s.forEach(i=>cancelAnimationFrame(i)),s.clear(),n("#oceaniaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),console.log("🌏 Oceania inicializado con relojes analógicos")},C=()=>{r.forEach(clearInterval),r=[],s.forEach(o=>cancelAnimationFrame(o)),s.clear()};export{C as cleanup,j as init,F as render};
