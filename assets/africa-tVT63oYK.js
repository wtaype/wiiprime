/* empty css               */import{w as u,$ as n,b as x,a as $,i as v,e as I}from"./main-CsaxRgGG.js";import"./vendor-B2AETYxa.js";let e=[],s=new Map,l=1;const m=9;let h=[...u.africa];const A=t=>{const a=v("America/Lima"),i=v(t.zona);if(!a?.gmt||!i?.gmt)return"";const c=r=>parseInt(r.match(/GMT([+-]?\d+)/)?.[1]||0),o=c(i.gmt)-c(a.gmt);return o===0?'<i class="fas fa-exchange-alt"></i> Misma hora':o>0?`<i class="fa-solid fa-rotate-right"></i> +${o}h`:`<i class="fa-solid fa-rotate-left"></i> ${o}h`},E=()=>{let t="";for(let a=0;a<60;a++){const i=a*6,c=a%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute";t+=`<div class="${c}" style="transform: rotate(${i}deg) translateY(-60px)"></div>`}return t},M=(t,a,i,c)=>{const o=t.data("zona");s.has(o)&&cancelAnimationFrame(s.get(o));const d=requestAnimationFrame(()=>{const w=c*6,p=i*6+c*.1,b=a%12*30+i*.5;t.find(".wihora_hand_second").css("transform",`translateX(-50%) rotate(${w}deg)`),t.find(".wihora_hand_minute").css("transform",`translateX(-50%) rotate(${p}deg)`),t.find(".wihora_hand_hour").css("transform",`translateX(-50%) rotate(${b}deg)`)});s.set(o,d)},g=(t,a)=>{try{const i=v(t.zona);if(!i)return;const[c,o,r]=i.hora.split(":").map(Number),d=I(i.hora),w=A(t);a.removeClass("es-dia es-noche").addClass(d?"es-dia":"es-noche"),M(a,c,o,r),a.find(".wihora_time").text(i.hora),a.find(".wihora_fecha").text(i.fecha),a.find(".wihora_gmt").text(i.gmt),a.find(".wihora_diferencia").html(w),a.find(".wihora_estacion").text(i.estacion),a.find(".wihora_icon i").attr("class",`fas ${d?"fa-sun":"fa-moon"}`)}catch(i){console.error("❌ Error actualizando reloj:",i)}},f=()=>{const t=(l-1)*m,a=t+m,i=h.slice(t,a),c=E();return i.length===0?`<div class="wicont_empty">
      <i class="fas fa-search"></i>
      <p>No se encontraron ciudades</p>
    </div>`:i.map(o=>`
    <div class="wihora_card wicont_card_compact" data-zona="${o.zona}">
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
            <img src="${$(o.codigo)}" alt="${o.pais}" class="wihora_flag" />
            <div class="wihora_location">
              <h3 class="wihora_ciudad">${o.ciudad}</h3>
              <p class="wihora_pais">${o.pais}</p>
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
  `).join("")},_=()=>{const t=Math.ceil(h.length/m);if(t<=1)return"";let a="";const i=5;let c=Math.max(1,l-Math.floor(i/2)),o=Math.min(t,c+i-1);o-c<i-1&&(c=Math.max(1,o-i+1));for(let r=c;r<=o;r++)a+=`<button class="wipag_btn ${r===l?"active":""}" data-pagina="${r}">${r}</button>`;return`
    <div class="wipaginacion">
      <button class="wipag_btn wipag_prev" ${l===1?"disabled":""}>
        <i class="fas fa-chevron-left"></i> Anterior
      </button>
      <div class="wipag_numeros">${a}</div>
      <button class="wipag_btn wipag_next" ${l===t?"disabled":""}>
        Siguiente <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `},j=async()=>`
    <div class="wicontinente">
      <div class="wicont_header">
        <h1 class="wicont_title">🌏 África</h1>
        <p class="wicont_subtitle">Explora las zonas horarias del continente más grande</p>
        
        <div class="wicont_controls">
          <div class="wicont_search">
            <i class="fas fa-search wicont_search_icon"></i>
            <input type="text" id="searchAfrica" placeholder="Buscar ciudad o país..." class="wisearch_input" />
            <span class="wicont_count">${h.length} ciudades</span>
          </div>
        </div>
      </div>
      
      <div class="wicont_grid" id="africaGrid">
        ${f()}
      </div>
      
      <div class="wicont_footer">
        ${_()}
      </div>
    </div>
  `,C=()=>{e.forEach(clearInterval),e=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear();const t=()=>{n(".wicont_card_compact").each((a,i)=>{const c=n(i),o=c.data("zona"),r=h.find(d=>d.zona===o);if(r){g(r,c);const d=setInterval(()=>g(r,c),1e3);e.push(d)}})};t(),n("#searchAfrica").on("input",function(){const a=n(this).val().trim();h=a?x(a,"africa"):[...u.africa],l=1,e.forEach(clearInterval),e=[],s.forEach(i=>cancelAnimationFrame(i)),s.clear(),n("#africaGrid").html(f()),n(".wicont_count").text(`${h.length} ciudades`),n(".wicont_footer").html(_()),t()}),n(document).on("click",".wipag_btn:not(.wipag_prev):not(.wipag_next)",function(){n(this).hasClass("active")||(l=parseInt(n(this).data("pagina")),e.forEach(clearInterval),e=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear(),n("#africaGrid").html(f()),n(".wicont_footer").html(_()),t(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_prev",()=>{l>1&&(l--,e.forEach(clearInterval),e=[],s.forEach(a=>cancelAnimationFrame(a)),s.clear(),n("#africaGrid").html(f()),n(".wicont_footer").html(_()),t(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),n(document).on("click",".wipag_next",()=>{const a=Math.ceil(h.length/m);l<a&&(l++,e.forEach(clearInterval),e=[],s.forEach(i=>cancelAnimationFrame(i)),s.clear(),n("#africaGrid").html(f()),n(".wicont_footer").html(_()),t(),n(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),console.log("🌏 Africa inicializado con relojes analógicos")},G=()=>{e.forEach(clearInterval),e=[],s.forEach(t=>cancelAnimationFrame(t)),s.clear()};export{G as cleanup,C as init,j as render};
