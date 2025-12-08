import{$ as i,i as h,e as $,a as b,f as v,w as P,g as y,c as S,N as p,s as N,d as O,S as A}from"./main-Bo98c0s3.js";import{d as g}from"./init-SyVNM3Ej.js";import{g as I,c as L,s as B,T as z,d as C,a as E}from"./firebase-DXmy2lv8.js";import"./vendor-B2AETYxa.js";const j=async()=>{i(".wiMeses").html(`
      <h3>Esto es una zona horaria One:  ${m.usuario}!</h3>
      
    `),i(".wiMeses h3").click(function(){alert("¡Hola mi vidita preciosa muaaak! 😄")})},G=s=>{if(!s||s.length<2)return[];const c=s.toLowerCase().trim();return Object.values(P).flat().filter(t=>t.ciudad.toLowerCase().includes(c)||t.pais.toLowerCase().includes(c)).slice(0,5)},D=()=>{let s="";for(let c=0;c<60;c++){const t=c*6,a=c%5===0?"wi_mark wi_mark_hr":"wi_mark wi_mark_min",o=c%5===0?-90:-60;s+=`<div class="${a}" style="transform:rotate(${t}deg) translateY(${o}px)"></div>`}return s},T=s=>{const{ciudad:c,zona:t,codigo:a,region:o,gmt:n,ip:d,dispositivo:e,pantalla:_}=s,l=h(t);if(!l)return"";const w=$(l.hora),f=w?"es-dia":"es-noche",r=w?"fa-sun":"fa-moon",u=l.estacion||"Primavera";return`
<div class="wi_main">
  <div class="wi_card_main ${f}" data-zona="${t}">
    <div class="wi_main_cnt">
      <div class="wi_analogico">
        <div class="wi_reloj_face">
          <div class="wi_reloj_marks">${D()}</div>
          <div class="wi_hand wi_hand_hr"></div>
          <div class="wi_hand wi_hand_min"></div>
          <div class="wi_hand wi_hand_sec"></div>
          <div class="wi_reloj_center"></div>
        </div>
      </div>
      <div class="wi_digital">
        <div class="wi_header_info">
          <img src="${b(a)}" class="wi_flag">
          <div class="wi_location">
            <h3 class="wi_ciudad">${c}</h3>
            <p class="wi_pais">${a}</p>
          </div>
          <div class="wi_icon"><i class="fas ${r}"></i></div>
        </div>
        <div class="wi_time">${v.convertir(l.hora)}</div>
        <div class="wi_fecha">${l.fecha}</div>
        <div class="wi_info">
          <div class="wi_info_item"><i class="fas fa-map-marker-alt"></i><span>${o||c}</span></div>
          <div class="wi_info_item"><i class="fas fa-globe"></i><span>${n||l.gmt}</span></div>
          <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${u}</span></div>
        </div>
        <div class="wi_ip_info">
          <div class="wi_ip_item"><i class="fas fa-network-wired"></i><span>IP: ${d||"N/A"}</span></div>
          <div class="wi_ip_item"><i class="fas fa-desktop"></i><span>${e||"Desconocido"}</span></div>
          <div class="wi_ip_item"><i class="fas fa-tv"></i><span>${_||"N/A"}</span></div>
        </div>
      </div>
    </div>
  </div>
</div>`},k=s=>{const{id:c,ciudad:t,zona:a,codigo:o,pais:n}=s,d=h(a);if(!d)return"";const e=$(d.hora),_=e?"es-dia":"es-noche",l=e?"fa-sun":"fa-moon",w=h("America/Lima"),f=M=>parseInt(M.match(/GMT([+-]?\d+)/)?.[1]||0),r=f(d.gmt)-f(w.gmt),u=r===0?'<i class="fas fa-exchange-alt"></i> Misma hora':r>0?`<i class="fa-solid fa-rotate-right"></i> +${r}h`:`<i class="fa-solid fa-rotate-left"></i> ${r}h`;return`
<div class="wi_card_compact ${_}" data-id="${c}" data-zona="${a}">
  <div class="wi_compact_hd">
    <div class="wi_compact_acts">
      <i class="fas fa-cloud nub"></i>
      <button class="ico" data-act="x"><i class="fas fa-trash"></i></button>
    </div>
  </div>
  <div class="wi_compact_cnt">
    <div class="wi_analogico_small">
      <div class="wi_reloj_face">
        <div class="wi_reloj_marks">${D()}</div>
        <div class="wi_hand wi_hand_hr"></div>
        <div class="wi_hand wi_hand_min"></div>
        <div class="wi_hand wi_hand_sec"></div>
        <div class="wi_reloj_center"></div>
      </div>
    </div>
    <div class="wi_digital_compact">
      <div class="wi_header_info">
        <img src="${b(o)}" class="wi_flag">
        <div class="wi_location">
          <h3 class="wi_ciudad">${t}</h3>
          <p class="wi_pais">${n}</p>
        </div>
        <div class="wi_icon"><i class="fas ${l}"></i></div>
      </div>
      <div class="wi_time">${v.convertir(d.hora)}</div>
      <div class="wi_fecha">${d.fecha}</div>
      <div class="wi_info">
        <div class="wi_info_item"><i class="fas fa-clock"></i><span class="wi_diferencia">${u}</span></div>
        <div class="wi_info_item"><i class="fas fa-globe"></i><span>${d.gmt}</span></div>
        <div class="wi_info_item"><i class="fas fa-leaf"></i><span>${d.estacion}</span></div>
      </div>
    </div>
  </div>
</div>`},F=(s,c)=>{const[t,a,o]=c.split(":").map(Number);s.find(".wi_hand_sec").css("transform",`translateX(-50%) rotate(${o*6}deg)`),s.find(".wi_hand_min").css("transform",`translateX(-50%) rotate(${a*6+o*.1}deg)`),s.find(".wi_hand_hr").css("transform",`translateX(-50%) rotate(${t%12*30+a*.5}deg)`)},x=()=>{i(".wiHoras [data-zona]").each(function(){const s=i(this).data("zona"),c=h(s);if(!c)return;const t=$(c.hora);i(this).toggleClass("es-dia",t).toggleClass("es-noche",!t),i(this).find(".wi_icon i").attr("class",`fas ${t?"fa-sun":"fa-moon"}`),i(this).find(".wi_time").text(v.convertir(c.hora)),i(this).find(".wi_fecha").text(c.fecha),F(i(this),c.hora)})},R=()=>setInterval(x,1e3),H=async()=>{const s=y("smileIP")||await new Promise(a=>S(o=>(N("smileIP",o),a(o))));i(".wiHoras").html(`
    <div class="whPrincipal"></div>
    <div class="whHeader">
      <div class="whBuscar_input">
        <input type="text" placeholder="Buscar ciudad o país...">
        <div class="whDropdown"></div>
      </div>
      <div class="whControles">
        <div class="whFormato">
          <button class="btn formato12 ${v.es12h()?"active":""}">12h</button>
          <button class="btn formato24 ${v.es24h()?"active":""}">24h</button>
        </div>
        <div class="whVistas">
          <button class="btn vistaGrid active"><i class="fas fa-th"></i></button>
          <button class="btn vistaLista"><i class="fas fa-list"></i></button>
        </div>
      </div>
    </div>
    <div class="whGrids"><div class="wi_grid"></div></div>
  `),i(".whPrincipal").html(T({ciudad:s.city,zona:s.timezone,codigo:s.country,region:s.region,gmt:`GMT${s.utcOffset>=0?"+":""}${s.utcOffset}`,ip:s.ip,dispositivo:`${s.device} • ${s.browser}`,pantalla:s.screen}));const t=(await I(L(g,"wiHoras"))).docs.map(a=>a.data()).sort((a,o)=>a.orden-o.orden);t.forEach(a=>i(".wi_grid").append(k(a))),R(),i(".whBuscar_input input").on("input",function(){const a=G(i(this).val()),o=i(".whDropdown");a.length>0?o.html(a.map(n=>`<div class="whDropdown_item" data-ciudad='${JSON.stringify(n)}'>
            <img src="${b(n.codigo)}"><span>${n.ciudad}, ${n.pais}</span>
          </div>`).join("")).addClass("show"):o.removeClass("show")}),i(document).on("click",".whDropdown_item",async function(){const a=JSON.parse(i(this).attr("data-ciudad"));if(t.some(e=>e.zona===a.zona)){p("Ya tienes esta ciudad agregada","error",2e3);return}const n=`${a.codigo}_${Date.now()}`,d=Math.max(...t.map(e=>e.orden||0),-1)+1;await B(C(g,"wiHoras",n),{id:n,...a,grid:2,orden:d,alias:null,color:"#4A90E2",creadoEn:z.now(),actualizadoEn:z.now(),usuario:m.usuario,email:m.email}),i(".wi_grid").append(k({...a,id:n})),i(".whBuscar_input input").val(""),i(".whDropdown").removeClass("show"),p("Ciudad agregada correctamente","success",2e3)}),i(document).on("click",'.ico[data-act="x"]',async function(){const a=i(this).closest(".wi_card_compact"),o=a.data("id");await E(C(g,"wiHoras",o)),a.fadeOut(300,()=>a.remove()),p("Ciudad eliminada","success",2e3)}),i(".whFormato .btn").on("click",function(){v.cambiar(i(this).hasClass("formato12")?"12":"24")&&(i(".whFormato .btn").removeClass("active"),i(this).addClass("active"),x())}),i(".whVistas .btn").on("click",function(){i(".whVistas .btn").removeClass("active"),i(this).addClass("active"),i(".wi_grid").toggleClass("whLista",i(this).hasClass("vistaLista"))}),i(document).on("click",a=>!i(a.target).closest(".whBuscar_input").length&&i(".whDropdown").removeClass("show"))},V=async()=>{i(document).on("click",".wfresh",async function(){O(this,!0,"Actualizando",500),await Promise.all([H(),j()])})};let m=y("wiSmile");const K=async()=>`
   <div class="miweb">
    <div class="mhead">
     <div class="mhead_left">
      <h1 class="mh1"><i class="fas fa-trophy"></i> ${A()} ${m.nombre}</h1>
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
  `,Q=async()=>{H(),j(),V()},U=()=>{console.log("😊 Smile limpiado")};export{U as cleanup,Q as init,K as render,m as smile};
