import{a as b,$ as a,b as k,s as z,g as M,i as $,c as C,e as I}from"./main-DjMwGyEQ.js";import"./vendor-B2AETYxa.js";let e=[],m=M("wiClockFormat")||"24",l=1;const _=9;let f=[...b.asia],v=null;const E=o=>{const[i,t,s]=o.split(":").map(Number),c=i>=12?"PM":"AM";return`${(i%12||12).toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")} ${c}`},P=o=>{if(!v)return"";const[i,t]=v.split(":").map(Number),[s,c]=o.split(":").map(Number),n=i*60+t;let r=s*60+c-n;r>720&&(r-=1440),r<-720&&(r+=1440);const h=Math.floor(Math.abs(r)/60),u=Math.abs(r)%60;return r===0&&u===0?'<span class="wicont_diff misma-hora">Misma hora</span>':r>0?`<span class="wicont_diff adelantado">Adelantado ${u>0?`+${h}h ${u}m`:`+${h}h`}</span>`:`<span class="wicont_diff atrasado">Atrasado ${u>0?`-${h}h ${u}m`:`-${h}h`}</span>`},g=(o,i)=>{try{const t=$(o.zona);if(!t)return;o.ciudad==="Lima"&&(v=t.hora);const s=m==="12"?E(t.hora):t.hora,c=I(t.hora),n=P(t.hora),d=c?"Día":"Noche";i.find(".wicont_time").text(s),i.find(".wicont_fecha").text(t.fecha),i.find(".wicont_gmt").text(t.gmt),i.find(".wicont_estado").text(d),i.find(".wicont_diferencia").html(n),i.find(".wicont_icon i").attr("class",`fas ${c?"fa-sun":"fa-moon"}`)}catch(t){console.error("Error actualizando reloj:",t)}},x=()=>{const o=$("America/Lima");o&&(v=o.hora)},w=()=>{const o=(l-1)*_,i=o+_,t=f.slice(o,i);return t.length===0?`<div class="wicont_empty">
      <i class="fas fa-search"></i>
      <p>No se encontraron ciudades</p>
    </div>`:t.map(s=>`
    <div class="wicont_card" data-zona="${s.zona}">
      <div class="wicont_card_header">
        <img src="${C(s.codigo)}" alt="${s.pais}" class="wicont_flag" />
        <div class="wicont_location">
          <h3 class="wicont_ciudad">${s.ciudad}</h3>
          <p class="wicont_pais">${s.pais}</p>
        </div>
        <div class="wicont_icon">
          <i class="fas fa-sun"></i>
        </div>
      </div>
      
      <div class="wicont_time">00:00:00</div>
      <div class="wicont_fecha">Cargando...</div>
      
      <div class="wicont_info">
        <div class="wicont_info_item">
          <i class="fas fa-exchange-alt"></i>
          <span class="wicont_diferencia"></span>
        </div>
        <div class="wicont_info_item">
          <i class="fas fa-globe"></i>
          <span class="wicont_gmt">GMT+00:00</span>
        </div>
        <div class="wicont_info_item">
          <i class="fas fa-clock"></i>
          <span class="wicont_estado">Día</span>
        </div>
      </div>
    </div>
  `).join("")},p=()=>{const o=Math.ceil(f.length/_);if(o<=1)return"";let i="";const t=5;let s=Math.max(1,l-Math.floor(t/2)),c=Math.min(o,s+t-1);c-s<t-1&&(s=Math.max(1,c-t+1));for(let n=s;n<=c;n++)i+=`<button class="wipag_btn ${n===l?"active":""}" data-pagina="${n}">${n}</button>`;return`
    <div class="wipaginacion">
      <button class="wipag_btn wipag_prev" ${l===1?"disabled":""}>
        <i class="fas fa-chevron-left"></i> Anterior
      </button>
      <div class="wipag_numeros">${i}</div>
      <button class="wipag_btn wipag_next" ${l===o?"disabled":""}>
        Siguiente <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `},G=async()=>(x(),`
    <div class="wicontinente">
      <div class="wicont_header">
        <h1 class="wicont_title">🌏 Asia</h1> 
        <p class="wicont_subtitle">Explora las zonas horarias del continente más grande</p>
        
        <div class="wicont_controls">
          <div class="wicont_search">
            <i class="fas fa-search wicont_search_icon"></i>
            <input type="text" id="searchAsia" placeholder="Buscar ciudad o país..." class="wisearch_input" /> 
            <span class="wicont_count">${f.length} ciudades</span>
          </div>
          
          <div class="wibtn_group">
            <button class="wibtn wibtn_format ${m==="24"?"active":""}" data-format="24">
              <i class="fas fa-clock"></i> 24h
            </button>
            <button class="wibtn wibtn_format ${m==="12"?"active":""}" data-format="12">
              <i class="far fa-clock"></i> 12h
            </button>
          </div>
        </div>
      </div>
      
      <div class="wicont_grid" id="asiaGrid"> 
        ${w()}
      </div>
      
      <div class="wicont_footer">
        ${p()}
      </div>
    </div>
  `),L=()=>{e.forEach(clearInterval),e=[],x();const o=()=>{a(".wicont_card").each((i,t)=>{const s=a(t),c=s.data("zona"),n=f.find(d=>d.zona===c);if(n){g(n,s);const d=setInterval(()=>g(n,s),1e3);e.push(d)}})};o(),a("#searchAsia").on("input",function(){const i=a(this).val().trim();f=i?k(i,"asia"):[...b.asia],l=1,e.forEach(clearInterval),e=[],a("#asiaGrid").html(w()),a(".wicont_count").text(`${f.length} ciudades`),a(".wicont_footer").html(p()),o()}),a(".wibtn_format").on("click",function(){const i=a(this).data("format");m!==i&&(m=i,a(".wibtn_format").removeClass("active"),a(this).addClass("active"),z("wiClockFormat",m,720),a(".wicont_card").each((t,s)=>{const c=a(s),n=c.find(".wicont_time");n.addClass("changing"),setTimeout(()=>n.removeClass("changing"),400);const d=c.data("zona"),r=f.find(h=>h.zona===d);r&&g(r,c)}))}),a(document).on("click",".wipag_btn:not(.wipag_prev):not(.wipag_next)",function(){a(this).hasClass("active")||(l=parseInt(a(this).data("pagina")),e.forEach(clearInterval),e=[],a("#asiaGrid").html(w()),a(".wicont_footer").html(p()),o(),a(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),a(document).on("click",".wipag_prev",()=>{l>1&&(l--,e.forEach(clearInterval),e=[],a("#asiaGrid").html(w()),a(".wicont_footer").html(p()),o(),a(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),a(document).on("click",".wipag_next",()=>{const i=Math.ceil(f.length/_);l<i&&(l++,e.forEach(clearInterval),e=[],a("#asiaGrid").html(w()),a(".wicont_footer").html(p()),o(),a(".wicont_grid").get(0).scrollIntoView({behavior:"smooth",block:"start"}))}),console.log("🌏 Módulo de Asia inicializado")},N=()=>{e.forEach(clearInterval),e=[]};export{N as cleanup,L as init,G as render};
