import{w as p,$ as n,b as E,a as x,i as v,e as $}from"./main-D5jewhcb.js";import"./vendor-B2AETYxa.js";let e=[],c=new Map,l=1;const m=9;let h=[...p.europa];const I=o=>{const a=v("America/Lima"),i=v(o.zona);if(!a?.gmt||!i?.gmt)return"";const s=r=>parseInt(r.match(/GMT([+-]?\d+)/)?.[1]||0),t=s(i.gmt)-s(a.gmt);return t===0?'<i class="fas fa-exchange-alt"></i> Misma hora':t>0?`<i class="fa-solid fa-rotate-right"></i> +${t}h`:`<i class="fa-solid fa-rotate-left"></i> ${t}h`},M=()=>{let o="";for(let a=0;a<60;a++){const i=a*6,s=a%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute";o+=`<div class="${s}" style="transform: rotate(${i}deg) translateY(-60px)"></div>`}return o},k=(o,a,i,s)=>{const t=o.data("zona");c.has(t)&&cancelAnimationFrame(c.get(t));const d=requestAnimationFrame(()=>{const w=s*6,g=i*6+s*.1,b=a%12*30+i*.5;o.find(".wihora_hand_second").css("transform",`translateX(-50%) rotate(${w}deg)`),o.find(".wihora_hand_minute").css("transform",`translateX(-50%) rotate(${g}deg)`),o.find(".wihora_hand_hour").css("transform",`translateX(-50%) rotate(${b}deg)`)});c.set(t,d)},u=(o,a)=>{try{const i=v(o.zona);if(!i)return;const[s,t,r]=i.hora.split(":").map(Number),d=$(i.hora),w=I(o);a.removeClass("es-dia es-noche").addClass(d?"es-dia":"es-noche"),k(a,s,t,r),a.find(".wihora_time").text(i.hora),a.find(".wihora_fecha").text(i.fecha),a.find(".wihora_gmt").text(i.gmt),a.find(".wihora_diferencia").html(w),a.find(".wihora_estacion").text(i.estacion),a.find(".wihora_icon i").attr("class",`fas ${d?"fa-sun":"fa-moon"}`)}catch(i){console.error("❌ Error actualizando reloj:",i)}},_=()=>{const o=(l-1)*m,a=o+m,i=h.slice(o,a),s=M();return i.length===0?`<div class="wicont_empty">
      <i class="fas fa-search"></i>
      <p>No se encontraron ciudades</p>
    </div>`:i.map(t=>`
    <div class="wihora_card wicont_card_compact" data-zona="${t.zona}">
      <div class="wihora_card_content wicont_compact_content">
        <div class="wihora_analogico wicont_analogico_small">
          <div class="wihora_reloj_face">
            <div class="wihora_reloj_marks">${s}</div>
            <div class="wihora_hand wihora_hand_hour"></div>
            <div class="wihora_hand wihora_hand_minute"></div>
            <div class="wihora_hand wihora_hand_second"></div>
            <div class="wihora_reloj_center"></div>
          </div>
        </div>
        
        <div class="wihora_digital_section wicont_digital_compact">
          <div class="wihora_header_info">
            <img src="${x(t.codigo)}" alt="${t.pais}" class="wihora_flag" />
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
  `).join("")},f=()=>{const o=Math.ceil(h.length/m);if(o<=1)return"";let a="";const i=5;let s=Math.max(1,l-Math.floor(i/2)),t=Math.min(o,s+i-1);t-s<i-1&&(s=Math.max(1,t-i+1));for(let r=s;r<=t;r++)a+=`<button class="wipag_btn ${r===l?"active":""}" data-pagina="${r}">${r}</button>`;return`
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
        <h1 class="wicont_title">🌏 Europa</h1>
        <p class="wicont_subtitle">Explora las zonas horarias del continente más grande</p>
        
        <div class="wicont_controls">
          <div class="wicont_search">
            <i class="fas fa-search wicont_search_icon"></i>
            <input type="text" id="searchEuropa" placeholder="Buscar ciudad o país..." class="wisearch_input" />
            <span class="wicont_count">${h.length} ciudades</span>
          </div>
        </div>
      </div>
      
      <div class="wicont_grid" id="europaGrid">
        ${_()}
      </div>
      
      <div class="wicont_footer">
        ${f()}
      </div>
    </div>
  `,j=()=>{e.forEach(clearInterval),e=[],c.forEach(a=>cancelAnimationFrame(a)),c.clear();const o=()=>{n(".wicont_card_compact").each((a,i)=>{const s=n(i),t=s.data("zona"),r=h.find(d=>d.zona===t);if(r){u(r,s);const d=setInterval(()=>u(r,s),1e3);e.push(d)}})};o(),n("#searchEuropa").on("input",function(){const a=n(this).val().trim();h=a?E(a,"europa"):[...p.europa],l=1,e.forEach(clearInterval),e=[],c.forEach(i=>cancelAnimationFrame(i)),c.clear(),n("#europaGrid").html(_()),n(".wicont_count").text(`${h.length} ciudades`),n(".wicont_footer").html(f()),o()}),n(document).on("click",".wipag_btn:not(.wipag_prev):not(.wipag_next)",function(){n(this).hasClass("active")||(l=parseInt(n(this).data("pagina")),e.forEach(clearInterval),e=[],c.forEach(a=>cancelAnimationFrame(a)),c.clear(),n("#europaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_prev",()=>{l>1&&(l--,e.forEach(clearInterval),e=[],c.forEach(a=>cancelAnimationFrame(a)),c.clear(),n("#europaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_next",()=>{const a=Math.ceil(h.length/m);l<a&&(l++,e.forEach(clearInterval),e=[],c.forEach(i=>cancelAnimationFrame(i)),c.clear(),n("#europaGrid").html(_()),n(".wicont_footer").html(f()),o(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),console.log("🌏 Europa inicializado con relojes analógicos")},C=()=>{e.forEach(clearInterval),e=[],c.forEach(o=>cancelAnimationFrame(o)),c.clear()};export{C as cleanup,j as init,F as render};
