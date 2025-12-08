import{a as v,$ as e,i as w,e as f}from"./main-D6CGN8wP.js";import"./vendor-B2AETYxa.js";let n=[];const m=()=>{let s="";for(let a=0;a<60;a++){const i=a*6,o=a%5===0?"wihora_mark wihora_mark_hour":"wihora_mark wihora_mark_minute";s+=`<div class="${o}" style="transform: rotate(${i}deg) translateY(-50px)"></div>`}return s},d=(s,a)=>{const i=w(s.zona);if(!i)return;const[r,o,t]=i.hora.split(":").map(Number),c=f(i.hora);a.removeClass("es-dia es-noche").addClass(c?"es-dia":"es-noche");const h=t*6,l=o*6+t*.1,_=r%12*30+o*.5;a.find(".wihora_hand_second").css("transform",`translateX(-50%) rotate(${h}deg)`),a.find(".wihora_hand_minute").css("transform",`translateX(-50%) rotate(${l}deg)`),a.find(".wihora_hand_hour").css("transform",`translateX(-50%) rotate(${_}deg)`),a.find(".wihora_time").text(i.hora),a.find(".wihora_fecha").text(i.fecha),a.find(".wihora_gmt").text(i.gmt),a.find(".wihora_estacion").text(i.estacion),a.find(".wihora_icon i").attr("class",`fas ${c?"fa-sun":"fa-moon"}`)},g=async()=>{const s=[{ciudad:"Lima",pais:"Perú",zona:"America/Lima",codigo:"pe"},{ciudad:"Tokio",pais:"Japón",zona:"Asia/Tokyo",codigo:"jp"}],a=m();return`
    <div class="wihora">
      ${s.map(i=>`
        <div class="wihora_card" data-zona="${i.zona}">
          <div class="wihora_card_content">
            <div class="wihora_analogico">
              <div class="wihora_reloj_face">
                <div class="wihora_reloj_marks">${a}</div>
                <div class="wihora_hand wihora_hand_hour"></div>
                <div class="wihora_hand wihora_hand_minute"></div>
                <div class="wihora_hand wihora_hand_second"></div>
                <div class="wihora_reloj_center"></div>
              </div>
            </div>
            
            <div class="wihora_digital_section">
              <div class="wihora_header_info">
                <img src="${v(i.codigo)}" alt="${i.pais}" class="wihora_flag">
                <div class="wihora_location">
                  <h3 class="wihora_ciudad">${i.ciudad}</h3>
                  <p class="wihora_pais">${i.pais}</p>
                </div>
                <div class="wihora_icon">
                  <i class="fas fa-sun"></i>
                </div>
              </div>
              
              <div class="wihora_time">00:00:00</div>
              <div class="wihora_fecha">Cargando...</div>
              
              <div class="wihora_info">
                <div class="wihora_info_item">
                  <i class="fas fa-globe"></i>
                  <span class="wihora_gmt">GMT</span>
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
  `},k=()=>{n.forEach(clearInterval),n=[];const s=[{zona:"America/Lima"},{zona:"Asia/Tokyo"}];e(".wihora_card").each((a,i)=>{const r=e(i),o=s[a];d(o,r);const t=setInterval(()=>d(o,r),1e3);n.push(t)})},z=()=>{n.forEach(clearInterval),n=[]};export{z as cleanup,k as init,g as render};
