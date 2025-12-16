import{S as _,w as m,a as u,$ as d,i as h,e as g}from"./main-wDJ0C_nJ.js";import"./vendor-B2AETYxa.js";let t=[],e=new Map;const p=s=>{if(s.ciudad==="Lima")return'<i class="fas fa-map-marker-alt"></i> Tu Ciudad';const i=h("America/Lima"),a=h(s.zona);if(!i?.gmt||!a?.gmt)return"";const r=n=>parseInt(n.match(/GMT([+-]?\d+)/)?.[1]||0),o=r(a.gmt)-r(i.gmt);return o===0?'<i class="fas fa-exchange-alt"></i> Misma hora':o>0?`<i class="fa-solid fa-rotate-right"></i> +${o}h`:`<i class="fa-solid fa-rotate-left"></i> ${o}h`},z=()=>{let s="";for(let i=0;i<60;i++){const a=i*6,r=i%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute";s+=`<div class="${r}" style="transform: rotate(${a}deg) translateY(-90px)"></div>`}return s},$=(s,i,a,r)=>{const o=s.data("zona");e.has(o)&&cancelAnimationFrame(e.get(o));const c=requestAnimationFrame(()=>{const l=r*6,v=a*6+r*.1,w=i%12*30+a*.5;s.find(".wihora_hand_second").css("transform",`translateX(-50%) rotate(${l}deg)`),s.find(".wihora_hand_minute").css("transform",`translateX(-50%) rotate(${v}deg)`),s.find(".wihora_hand_hour").css("transform",`translateX(-50%) rotate(${w}deg)`)});e.set(o,c)},f=(s,i)=>{try{const a=h(s.zona);if(!a)return;s.ciudad==="Lima"&&d(".wihora_title").text(`${_()} Gorila`);const[r,o,n]=a.hora.split(":").map(Number),c=g(a.hora),l=p(s);i.removeClass("es-dia es-noche").addClass(c?"es-dia":"es-noche"),$(i,r,o,n),i.find(".wihora_time").text(a.hora),i.find(".wihora_fecha").text(a.fecha),i.find(".wihora_gmt").text(a.gmt),i.find(".wihora_estacion").text(a.estacion),i.find(".wihora_diferencia").html(l),i.find(".wihora_icon i").attr("class",`fas ${c?"fa-sun":"fa-moon"}`)}catch(a){console.error(`❌ Error en ${s.ciudad}:`,a.message)}},M=async()=>{const s=m.principales,i=z();return`
    <div class="wihora">
      <div class="wihora_header">
        <h1 class="wihora_title">${_()} Gorila</h1>
        <div class="wihora_controls">
          <div class="wibtn_format">
            <i class="fas fa-clock"></i> Formato 24h
          </div>
        </div>
      </div>
      
      <div class="wihora_grid">
        ${s.map(a=>`
          <div class="wihora_card glass-card" data-zona="${a.zona}">
            <div class="wihora_card_content">
              <div class="wihora_analogico">
                <div class="wihora_reloj_face">
                  <div class="wihora_reloj_marks">${i}</div>
                  <div class="wihora_hand wihora_hand_hour"></div>
                  <div class="wihora_hand wihora_hand_minute"></div>
                  <div class="wihora_hand wihora_hand_second"></div>
                  <div class="wihora_reloj_center"></div>
                </div>
              </div>
              
              <div class="wihora_digital_section">
                <div class="wihora_header_info">
                  <img src="${u(a.codigo)}" alt="${a.pais}" class="wihora_flag" />
                  <div class="wihora_location">
                    <h3 class="wihora_ciudad">${a.ciudad}</h3>
                    <p class="wihora_pais">${a.pais}</p>
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
        `).join("")}
      </div>
    </div>
  `},j=()=>{t.forEach(clearInterval),t=[],d(".wihora_card").each((s,i)=>{const a=d(i),r=a.data("zona"),o=m.principales.find(n=>n.zona===r);if(o){f(o,a);const n=setInterval(()=>f(o,a),1e3);t.push(n)}}),console.log("🕐 Hora inicializado (24h)")},I=()=>{t.forEach(clearInterval),t=[],e.forEach(s=>cancelAnimationFrame(s)),e.clear()};export{I as cleanup,j as init,M as render};
