import{i as v,S as w,d as p,f as $,$ as c,s as g,g as b,h as z}from"./main-DL6uxFax.js";import"./vendor-B2AETYxa.js";let h=[],e=b("wiClockFormat")||"24",u=null;const x=s=>{if(!u)return"";const[i,a]=u.split(":").map(Number),[o,t]=s.split(":").map(Number),n=i*60+a;let r=o*60+t-n;r>720&&(r-=1440),r<-720&&(r+=1440);const m=Math.floor(Math.abs(r)/60),d=Math.abs(r)%60;return r===0&&d===0?'<span class="misma-hora">Misma hora</span>':r>0?`<span class="adelantado">Adelantado ${d>0?`+${m}h ${d}m`:`+${m}h`}</span>`:`<span class="atrasado">Atrasado ${d>0?`-${m}h ${d}m`:`-${m}h`}</span>`},A=s=>{const[i,a,o]=s.split(":").map(Number),t=i>=12?"PM":"AM";return`${(i%12||12).toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")} ${t}`},f=(s,i)=>{try{const a=v(s.zona);if(!a)return;if(s.ciudad==="Lima"){u=a.hora;const l=w(a.hora);c(".wihora_title").html(`${l} Gorila`)}const o=e==="12"?A(a.hora):a.hora,t=z(a.hora),n=s.ciudad!=="Lima"?x(a.hora):"";i.find(".wihora_time").text(o),i.find(".wihora_fecha").text(a.fecha),i.find(".wihora_gmt").text(a.gmt),i.find(".wihora_estacion").text(a.estacion),i.find(".wihora_diferencia").html(n),i.find(".wihora_icon i").attr("class",`fas ${t?"fa-sun":"fa-moon"}`)}catch(a){console.error("Error actualizando reloj:",a)}},M=async()=>{const s=p.principales,i=v("America/Lima");return`
    <div class="wihora">
      <div class="wihora_header">
        <h1 class="wihora_title">${i?w(i.hora):"¡Hola!"} <span class="wihora_subtitle">Gorila</span></h1>
        <div class="wihora_controls">
          <button class="wibtn wibtn_format ${e==="24"?"active":""}" data-format="24">
            <i class="fas fa-clock"></i> 24h
          </button>
          <button class="wibtn wibtn_format ${e==="12"?"active":""}" data-format="12">
            <i class="far fa-clock"></i> 12h
          </button>
        </div>
      </div>
      
      <div class="wihora_grid">
        ${s.map(o=>`
          <div class="wihora_card" data-zona="${o.zona}">
            <div class="wihora_card_header">
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
                <i class="fas fa-exchange-alt"></i>
                <span class="wihora_diferencia"></span>
              </div>
              <div class="wihora_info_item">
                <i class="fas fa-globe"></i>
                <span class="wihora_gmt">GMT+00:00</span>
              </div>
              <div class="wihora_info_item">
                <i class="fas fa-leaf"></i>
                <span class="wihora_estacion">Primavera</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `},S=()=>{h.forEach(clearInterval),h=[],c(".wihora_card").each((s,i)=>{const a=c(i),o=a.data("zona"),t=p.principales.find(n=>n.zona===o);if(t){f(t,a);const n=setInterval(()=>f(t,a),1e3);h.push(n)}}),c(".wibtn_format").off("click").on("click",function(){const s=c(this).data("format");e!==s&&(e=s,c(".wibtn_format").removeClass("active"),c(this).addClass("active"),g("wiClockFormat",e,720),c(".wihora_card").each((i,a)=>{const o=c(a),t=o.find(".wihora_time");t.addClass("changing"),setTimeout(()=>t.removeClass("changing"),400);const n=o.data("zona"),l=p.principales.find(r=>r.zona===n);l&&f(l,o)}),console.log(`🔄 Formato cambiado a ${e}h`))}),console.log(`🕐 Módulo de Hora inicializado (modo ${e}h)`)},F=()=>{h.forEach(clearInterval),h=[]};export{F as cleanup,S as init,M as render};
