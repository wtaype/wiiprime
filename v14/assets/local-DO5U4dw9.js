import{$ as i}from"./main-h5MB0uF9.js";import{k as n,j as f,r as l,N as m,w as p}from"./widev-Btkevk8b.js";import"./vendor-B2AETYxa.js";const c=(o,t)=>`
  <div class="test-section" style="margin-bottom:2rem;padding:1.5rem;background:var(--wb);border-radius:1.5vh;box-shadow:0 4px 16px rgba(0,0,0,.08);border:1px solid var(--bg5);">
    <h3 style="color:var(--tx);margin-bottom:1rem;font-size:var(--fz_m5);font-weight:700;">${o}</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
      ${t.map(([e,r,s,a])=>`
        <div style="padding:1rem;background:var(--bg1);border-radius:1vh;border:1px solid var(--bg5);">
          <div style="font-size:var(--fz_m1);color:var(--txe);margin-bottom:.5rem;">${e} ${r}</div>
          <div id="${s}" style="font-size:var(--fz_m4);font-weight:700;color:var(${a});">Cargando...</div>
        </div>
      `).join("")}
    </div>
  </div>
`,u=async()=>{const o=[["🌍","Ciudad","infoCiudad","--mco"],["📍","IP Pública","infoIp","--mco"],["💻","Navegador","infoBrowser","--mco"],["🖥️","Sistema Operativo","infoOs","--mco"],["📱","Dispositivo","infoDevice","--mco"],["🌐","Zona Horaria","infoTimezone","--mco"]],t=[["🏙️","Ciudad","infoCity","--success"],["📍","Región","infoRegion","--success"],["🌎","País","infoCountry","--success"],["📮","Código Postal","infoPostal","--success"],["🗺️","Latitud","infoLat","--success"],["🗺️","Longitud","infoLng","--success"]],e=[["🖥️","Pantalla","infoScreen","--info"],["📐","Viewport","infoViewport","--info"],["🌐","Idioma","infoLanguage","--info"],["⏰","Hora Local","infoTime","--info"],["🌍","UTC Offset","infoUtc","--info"],["📡","Estado","infoOnline","--info"]],r=[["📋 Copiar IP","btnCopyIp","--mco"],["📍 Copiar Ciudad","btnCopyCiudad","--success"],["📊 Mostrar Todo","btnMostrarTodo","--info"],["🔄 Actualizar","btnLimpiarCache","--warning"]];return`
    <div class="labs-container" style="padding:2rem;max-width:1000px;margin:0 auto;">
      <h2 style="color:var(--mco);margin-bottom:2rem;font-size:var(--fz_l2);font-weight:700;">🧪 wiIp() v10.1</h2>
      
      ${c("Test 1: Información Básica",o)}
      ${c("Test 2: Ubicación Geográfica",t)}
      ${c("Test 3: Datos Técnicos",e)}
      
      <div class="test-section" style="margin-bottom:2rem;padding:1.5rem;background:var(--wb);border-radius:1.5vh;box-shadow:0 4px 16px rgba(0,0,0,.08);border:1px solid var(--bg5);">
        <h3 style="color:var(--tx);margin-bottom:1rem;font-size:var(--fz_m5);font-weight:700;">Test 4: Acciones</h3>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          ${r.map(([s,a,d])=>`
            <button id="${a}" style="padding:1.2vh 2vw;background:var(${d});color:var(--txa);border:none;border-radius:1vh;cursor:pointer;font-size:var(--fz_m3);font-weight:600;">
              ${s}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="resultados" style="margin-top:2rem;padding:1.5rem;background:var(--bg1);border-radius:1.5vh;border-left:4px solid var(--mco);border:1px solid var(--bg5);">
        <h4 style="color:var(--mco);margin-bottom:1rem;font-size:var(--fz_m4);font-weight:700;">📊 JSON:</h4>
        <pre id="jsonData" style="font-family:var(--ff_R);font-size:var(--fz_m1);color:var(--tx);background:var(--wb);padding:1rem;border-radius:1vh;overflow-x:auto;"></pre>
      </div>
    </div>
  `},x=async()=>{n(o=>{i("#infoCiudad").text(`${o.city}, ${o.country}`),i("#infoIp").text(o.ip),i("#infoBrowser").text(o.browser),i("#infoOs").text(o.os),i("#infoDevice").text(o.device),i("#infoTimezone").text(o.timezone),i("#infoCity").text(o.city),i("#infoRegion").text(o.region),i("#infoCountry").text(o.country),i("#infoPostal").text(o.postal||"N/A"),i("#infoLat").text(o.lat.toFixed(4)),i("#infoLng").text(o.lng.toFixed(4)),i("#infoScreen").text(o.screen),i("#infoViewport").text(o.viewport),i("#infoLanguage").text(o.language),i("#infoTime").text(o.time),i("#infoUtc").text(`UTC${o.utcOffset>=0?"+":""}${o.utcOffset}`),i("#infoOnline").text(o.online?"✅ Online":"❌ Offline"),i("#jsonData").text(JSON.stringify(o,null,2))}),i("#btnCopyIp").on("click",function(){f(n("ip"),this,"¡IP copiada!")}),i("#btnCopyCiudad").on("click",function(){f(n("ciudad"),this,"¡Ciudad copiada!")}),i("#btnMostrarTodo").on("click",function(){n(o=>{console.table(o),m("Datos en consola","info"),p(this,"Ver consola (F12)","info",2e3)})}),i("#btnLimpiarCache").on("click",function(){l("wiIp"),location.reload()})};export{x as init,u as render};
