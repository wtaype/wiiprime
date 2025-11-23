const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/hora-BqGpuQob.js","assets/vendor-B2AETYxa.js","assets/firebase-oQ0U6Yya.js","assets/calendario-J-IxWtKr.js","assets/calculadora-BX3nhD9p.js","assets/cronometro-Dz-acsJG.js"])))=>i.map(i=>d[i]);
import{r as W,g as B}from"./vendor-B2AETYxa.js";import{i as H,g as X,a as Y,b as P,d as M,c as T,q,e as D,w as z,f as J,u as K,s as Z,h as G,j as Q,k as ee,l as te,o as ae,m as oe}from"./firebase-oQ0U6Yya.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const ie="modulepreload",re=function(i){return"/wiiprime/"+i},O={},A=function(o,t,r){let s=Promise.resolve();if(t&&t.length>0){let h=function(a){return Promise.all(a.map(l=>Promise.resolve(l).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");s=h(t.map(a=>{if(a=re(a),a in O)return;O[a]=!0;const l=a.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":ie,l||(d.as="script"),d.crossOrigin="",d.href=a,p&&d.setAttribute("nonce",p),document.head.appendChild(d),l)return new Promise((f,m)=>{d.addEventListener("load",f),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${a}`)))})}))}function n(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return s.then(u=>{for(const p of u||[])p.status==="rejected"&&n(p.reason);return o().catch(n)})};var se=W();const e=B(se);(()=>{const i=[["Cielo","#0EBEFF"],["Dulce","#FF5C69"],["Paz","#29C72E"],["Mora","#7000FF"],["Futuro","#21273B"]],o=r=>{const[s,n]=e(r).data("tema").split("|");e("html").attr("data-theme",s),(e('meta[name="theme-color"]')[0]||e('<meta name="theme-color">').appendTo("head")[0]).content=n,S("wiTema",`${s}|${n}`,720),e(".mtha").removeClass("mtha"),e(r).addClass("mtha")},t=()=>{e(".witemas").html(i.map(([n,u])=>`<div class="tema" data-tema="${n}|${u}" style="background:${u}"></div>`).join(""));const r=N("wiTema"),s=e(`[data-tema="${r}"]`)[0]||e(".tema").first()[0];s&&o(s),e(document).off("click.witema").on("click.witema",".tema",n=>o(n.currentTarget))};return e(".witemas").length?t():new MutationObserver(r=>r.some(({addedNodes:s})=>[...s].some(n=>n.querySelector?.(".witemas")))&&(t(),!0)).observe(document.body,{childList:1,subtree:1}),{set:o}})();const b=(i,o=!0,t="")=>{const r=e(i);if(o){const s=t||r.text().trim();r.data("txt",s).prop("disabled",!0).html(`${s} <i class="fas fa-spinner fa-spin"></i>`)}else r.prop("disabled",!1).text(r.data("txt")||t||"Continuar")};function j(i,o="error",t=3e3){const r={success:"fa-check-circle",error:"fa-times-circle",warning:"fa-exclamation-triangle",info:"fa-info-circle"},s={success:"#2E7D32",error:"#D32F2F",warning:"#F9A825",info:"#0288D1"};e("#notificationsContainer").length||e("body").append('<div id="notificationsContainer" style="position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;"></div>');const n=e(`
    <div class="notification" style="background:#fff;border-left:4px solid ${s[o]};box-shadow:0 4px 12px rgba(0,0,0,.1);border-radius:8px;padding:1rem;display:flex;align-items:center;gap:.5rem;opacity:0;transform:translateX(20px);transition:all .3s ease;">
      <i class="fas ${r[o]}" style="color:${s[o]};"></i>
      <span style="flex:1">${i}</span>
      <button style="background:none;border:none;font-size:1.2rem;cursor:pointer;">&times;</button>
    </div>
  `);e("#notificationsContainer").append(n),requestAnimationFrame(()=>n.css({opacity:1,transform:"translateX(0)"})),n.find("button").on("click",()=>{n.css({opacity:0,transform:"translateX(20px)"}),setTimeout(()=>n.remove(),300)}),setTimeout(()=>{n.css({opacity:0,transform:"translateX(20px)"}),setTimeout(()=>n.remove(),300)},t)}const w=(i,o="success")=>{e(".alert-box").remove();const t={error:{bg:"#FFE8E6",txt:"#D32F2F",border:"#FFCDD2",icon:"fa-circle-exclamation"},success:{bg:"#E8F5E9",txt:"#2E7D32",border:"#C8E6C9",icon:"fa-circle-check"}},{bg:r,txt:s,border:n,icon:u}=t[o]||t.error,p=e(`
        <div class="alert-box" style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 20px;
            border-radius: 8px;
            background: ${r};
            color: ${s};
            border-left: 4px solid ${n};
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 300px;
            max-width: 90%;
            
        ">
            <i class="fas ${u}"></i>
            <span>${i}</span>
        </div>
    `).appendTo("body").hide().fadeIn(300);setTimeout(()=>p.fadeOut(300,()=>p.remove()),3e3)};function S(i,o,t){try{localStorage.setItem(i,JSON.stringify({value:o,expiry:Date.now()+t*36e5,type:typeof o,isArray:Array.isArray(o)}))}catch(r){console.error("Error savels",r)}}function N(i){try{const o=localStorage.getItem(i);if(!o)return null;const t=JSON.parse(o);return!t||Date.now()>t.expiry?(localStorage.removeItem(i),null):t.value}catch(o){return console.error("Error getls:",o),I(i),null}}function I(...i){i.forEach(o=>{o&&typeof o=="string"&&localStorage.removeItem(o)})}function k(i,o,t="top",r=1800){const s={success:"--success",error:"--error",warning:"--warning",info:"--info"},n=s[t]?t:null,u=n?"top":t;if(e("#witip-styles").length||e('<style id="witip-styles">.witip{position:fixed;background:var(--mco);color:var(--txa);z-index:10000;padding:8px 12px;border-radius:4px;font-size:.85rem;max-width:250px;box-shadow:0 2px 8px rgba(0,0,0,.2);opacity:0;transition:opacity .2s;pointer-events:none}.witip::after{content:"";position:absolute;border:6px solid transparent}.witip.show{opacity:1}.witip.top::after{top:100%;left:50%;margin-left:-6px;border-top-color:inherit}.witip.bottom::after{bottom:100%;left:50%;margin-left:-6px;border-bottom-color:inherit}.witip.left::after{left:100%;top:50%;margin-top:-6px;border-left-color:inherit}.witip.right::after{right:100%;top:50%;margin-top:-6px;border-right-color:inherit}.witip.success{background:var(--success);color:#fff}.witip.error{background:var(--error);color:#fff}.witip.warning{background:var(--warning);color:#000}.witip.info{background:var(--info);color:#fff}</style>').appendTo("head"),typeof i=="string"&&(i.includes(",")||i.match(/^[.#a-z]/i)))return e(i).each((we,V)=>k(V,o,t,r)),e(i);const p=e(i);if(!p.length)return;clearTimeout(p.data("witip-timer")),e(".witip").remove();const h=p.attr("id")||p.attr("id",`wtip-${Date.now()}-${Math.floor(Math.random()*1e3)}`).attr("id"),a=e("<div>",{class:`witip ${u} ${n||""}`,"data-for":h,html:o,css:{"border-color":n?`var(${s[n]})`:"var(--mco)"}});n&&a.css("background-color",`var(${s[n]})`),e("body").append(a);const{left:l,top:c,right:d,bottom:f,width:m,height:g}=p[0].getBoundingClientRect(),v=a.outerWidth(),y=a.outerHeight(),R={top:{x:l+m/2-v/2,y:c-y-8},bottom:{x:l+m/2-v/2,y:f+8},left:{x:l-v-8,y:c+g/2-y/2},right:{x:d+8,y:c+g/2-y/2}};let{x:_,y:L}=R[u];return _=Math.max(8,Math.min(_,window.innerWidth-v-8)),L=Math.max(8,Math.min(L,window.innerHeight-y-8)),a.css({left:_,top:L}),p.data("witip-timer",setTimeout(()=>{a.addClass("show"),r>0&&setTimeout(()=>{a.removeClass("show"),setTimeout(()=>a.remove(),200)},r)},10)),p}const E={clean(i){const o="/wiiprime/";return i.startsWith(o)&&(i=i.slice(o.length-1)),i==="/"||i===""?"/hora":i},update(i,o=""){const t=i==="/hora"?"/":i;window.history.pushState({path:i},o,t),o&&(document.title=o)},params(){return Object.fromEntries(new URLSearchParams(location.search))},setParams(i){const o=new URL(location);Object.entries(i).forEach(([t,r])=>o.searchParams.set(t,r)),history.pushState({},"",o)}},ne={async fade(i,o,t=150){const r=e(i);await r.animate({opacity:0},t).promise(),r.html(o),await r.animate({opacity:1},t).promise()},async slide(i,o=null){const t=e(i);return o===null&&(o=!t.is(":visible")),o?t.slideDown().promise():t.slideUp().promise()},shake(i){e(i).addClass("shake"),setTimeout(()=>e(i).removeClass("shake"),500)},pulse(i){e(i).addClass("pulse"),setTimeout(()=>e(i).removeClass("pulse"),500)}};class le{constructor(){this.ruta={},this.currentRoute=null,this.contentContainer="#wiMainContent",this.isNavigating=!1}register(o,t){this.ruta[o]=t}async navigate(o,t=!0){if(this.isNavigating)return;this.isNavigating=!0;const r=E.clean(o);if(!this.ruta[r]){console.warn(`Ruta no encontrada: ${r}`),j("Página no encontrada","error",2e3),this.isNavigating=!1;return}try{this.updateActiveNav(r);const s=this.ruta[r],n=typeof s=="function"?await s():s,u=await n.render();await ne.fade(this.contentContainer,u);const p=r.replace("/","").replace(/^(\w)/,h=>h.toUpperCase())||"Hora";document.title=`${p} - Wihope`,n.init&&n.init(),t&&E.update(r),this.currentRoute=r}catch(s){console.error("Error al navegar:",s),j("Error al cargar la página","error",2e3)}finally{this.isNavigating=!1}}updateActiveNav(o){const t=o.replace("/","")||"hora";e(".winav_item").removeClass("active"),e(`.winav_item[data-page="${t}"]`).addClass("active")}async prefetch(o){const t=E.clean(o);if(!(!this.ruta[t]||typeof this.ruta[t]!="function")){console.log(`⚡ Prefetching: ${t}`);try{const r=await this.ruta[t]();this.ruta[t]=r}catch(r){console.warn(`Error prefetching ${t}`,r)}}}init(){e(document).on("click",".winav_item",t=>{t.preventDefault();const r=e(t.currentTarget).data("page"),s=r==="hora"?"/":`/${r}`;this.navigate(s)}),e(document).on("mouseenter",".winav_item",t=>{const r=e(t.currentTarget).data("page"),s=r==="hora"?"/":`/${r}`;this.prefetch(s)}),window.addEventListener("popstate",t=>{const r=t.state?.path||E.clean(window.location.pathname);this.navigate(r,!1)});const o=E.clean(window.location.pathname);this.navigate(o,!1)}}const C=new le,ce={apiKey:"AIzaSyAw1I8I84eHjOk69UoAaM74k3OUAJMlET8",authDomain:"wiiprime.firebaseapp.com",projectId:"wiiprime",storageBucket:"wiiprime.firebasestorage.app",messagingSenderId:"560186875326",appId:"1:560186875326:web:1e8d7104fc7e53878b2def"},U=H(ce),$=X(U),x=Y(U),de=i=>{const o=e(`#${i}`);if(!o.length)return console.warn(`Modal #${i} no existe`);o.addClass("active"),e("body").addClass("modal-open"),setTimeout(()=>{o.find("input,select,textarea,button").filter(":visible:first").trigger("focus")},20)},pe=i=>{e(`#${i}`).removeClass("active"),e(".modal.active").length||e("body").removeClass("modal-open")},F=()=>{e(".modal").removeClass("active"),e("body").removeClass("modal-open")};window.abrirModal=de;window.cerrarModal=pe;window.cerrarTodos=F;(()=>{const i=".modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;justify-content:center;align-items:center;backdrop-filter:saturate(120%) blur(2px)}.modal.active{display:flex}@keyframes mfade{from{opacity:0}to{opacity:1}}.modal{animation:mfade .25s ease}body.modal-open{overflow:hidden}.modal-content{background:var(--F);border-radius:1vh;box-shadow:var(--bsh);width:92%;max-width:600px;max-height:90vh;overflow:auto;animation:mpop .22s ease}@keyframes mpop{from{transform:translateY(10px) scale(.98);opacity:.6}to{transform:translateY(0) scale(1);opacity:1}}.authModals .modal-content{max-width:430px;padding:0;border:0;position:relative}.authModals .modal-header{border:0;padding:12px;position:absolute;right:0;z-index:10}.authModals .close-modal,.close-modal{background:0 0;border:0;color:var(--mco);font-size:1.4rem;cursor:pointer;transition:transform .15s,opacity .15s;text-shadow:0 1px 2px rgba(0,0,0,.15)}.authModals .close-modal:hover,.close-modal:hover{transform:scale(1.08);opacity:.95}.auth-form{padding:0 36px 32px;display:flex;flex-direction:column;align-items:center}.auth-logo{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:34px 0 8px;box-shadow:0 6px 18px var(--bxs)}.auth-logo img{width:100%;height:auto}.auth-title{font:700 1.6rem var(--ff_P);color:var(--mco);margin:4px 0 18px;text-align:center}.auth-title span{color:#ffe800}.auth-text{color:var(--tx);font-size:.92rem;margin:12px 0 4px;align-self:flex-start}#loginForm,#registroForm,#recuperarForm{width:100%;display:flex;flex-direction:column;gap:12px}.form-group{width:100%;position:relative}.input-icon{position:relative;display:flex;align-items:center}.input-icon i{position:absolute;left:14px;color:var(--mco);opacity:.75;transition:.25s}.input-icon .togglePass{left:auto;right:12px;cursor:pointer;color:#a8a8a8}.input-icon input{width:100%;padding:13px 38px 13px 42px;border-radius:10px;border:1px solid var(--bdr);background:var(--wb);color:var(--tx);transition:border-color .2s,box-shadow .2s}.input-icon input:focus{border-color:var(--mco);box-shadow:0 0 0 3px var(--bxs);outline:0}.input-icon input::placeholder{color:var(--txe);opacity:.7}.form-check{display:flex;align-items:center;gap:8px;margin:6px 0}.form-check input[type=checkbox]{width:16px;height:16px;accent-color:var(--mco)}.btn-auth{width:100%;padding:13px 14px;background:var(--mco);color:var(--txa);border:0;border-radius:10px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px var(--bxs);transition:transform .15s,box-shadow .15s,background .15s}.btn-auth:hover{background:var(--hva);transform:translateY(-1px)}.btn-auth.loading{opacity:.85;cursor:not-allowed;pointer-events:none}.btn-auth.loading i{margin-right:6px}.inactivo{opacity:.75}.auth-links{width:100%;display:flex;justify-content:space-between;margin-top:12px;flex-wrap:wrap}.auth-links span{color:var(--mco);cursor:pointer;padding:6px 0;font-size:.95rem}.auth-links span:hover{color:var(--hv);text-decoration:underline}#registroModal #registroForm{display:grid;grid-template-columns:1fr 1fr;gap:12px}#registroModal .modal-content{max-width:568px}@media (max-width:576px){.auth-form{padding:0 20px 24px}.auth-title{font-size:1.4rem}.auth-logo{width:70px;height:70px;margin-top:26px}#registroModal #registroForm{display:flex;flex-direction:column}}#recuperarModal *:not(i),#registroModal *:not(i),#loginModal *:not(i){font-family:'Poppins',segoe ui}.btn-auth i{color:var(--F)}",o=e(".wiModalCss");o.length?o.text(i):e("head").append(`<style class="wiModalCss">${i}</style>`),e(document).off(".wimodal").on("click.wimodal",".close-modal",F).on("click.wimodal",".modal",t=>{e(t.target).is(".modal")&&F()}).on("keydown.wimodal",t=>{t.key==="Escape"&&F()})})();function ue(){const i=`
<div id="loginModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Login</h2>
      
      <form id="loginForm" class="dfd">
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Email o usuario" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-check">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Recordar mis datos</label>
        </div>
        <button type="button" id="Login" class="inactivo btn-auth">Iniciar Sesión</button>
      </form>
      
      <div class="auth-links">
        <span class="olvidastePass">¿Olvidaste tu contraseña?</span>
        <span class="crearCuenta">Crear cuenta</span>
      </div>
    </div>
  </div>
</div>`,o=`
<div id="registroModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Crear Cuenta</h2>
      
      <form id="registroForm" class="dfd">
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-envelope"></i>
            <input type="email" id="regEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user"></i>
            <input type="text" id="regUsuario" placeholder="Crear usuario" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regNombre" placeholder="Nombre" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regApellidos" placeholder="Apellidos" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword1" placeholder="Confirmar Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <button type="button" id="Registrar" class="inactivo btn-auth">Registrarme</button>
      </form>
      
      <div class="auth-links">
        <span class="conCuenta">Ya tengo cuenta</span>
      </div>
    </div>
  </div>
</div>`,t=`
<div id="recuperarModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Restablecer Contraseña</h2>
      <form id="recuperarForm" class="dfd">
        <p class="auth-text">Ingresa tu Correo o usuario:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="recEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <p class="auth-text">Valida tu fecha de nacimiento:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-cake-candles"></i>
            <input type="date" id="recFechaNacimiento" placeholder="Fecha Nacimiento" class="datepicker" required>
          </div>
        </div>
        <button type="button" id="Recuperar" class="inactivo btn-auth">Restablecer Contraseña</button>
      </form>
      <div class="auth-links">
        <span class="volverLogin"><i class="fas fa-arrow-left"></i> Volver a Inicio</span>
      </div>
    </div>
  </div>
</div>`;e(function(){let r="smiles",s="wiAuthIn",n="usuario";e(document).on("click",".login",()=>abrirModal("loginModal")),e(document).on("click",".registrar",()=>abrirModal("registroModal")),e(".crearCuenta").click(()=>{abrirModal("registroModal"),cerrarModal("loginModal")}),e(".conCuenta").click(()=>{abrirModal("loginModal"),cerrarModal("registroModal")}),e(".olvidastePass").click(()=>{abrirModal("recuperarModal"),cerrarModal("loginModal")}),e(".volverLogin").click(()=>{abrirModal("loginModal"),cerrarModal("recuperarModal")}),e(".togglePass").click(function(){const a=e(this).siblings("input"),l=a.attr("type")==="password";a.attr("type",l?"text":"password"),e(this).toggleClass("fa-eye fa-eye-slash")}),e('.miauth input:not([type="checkbox"])').on("click",function(){k(this,e(this).attr("placeholder"))}),e("#regUsuario, #regEmail, #email, #recEmail").on("input",function(){e(this).val(e(this).val().toLowerCase().trim())}),[["#password","#Login"],["#regPassword1","#Registrar"],["#recEmail","#Recuperar"]].forEach(([a,l])=>{e(a).on("input keyup",c=>{e(l).removeClass("inactivo"),c.key==="Enter"&&(e(l).click(),e(l).addClass("inactivo"))})});const u={regEmail:[a=>a.toLowerCase(),a=>/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(a)||"Correo inválido"],regUsuario:[a=>a.toLowerCase().replace(/[^a-z0-9_]/g,""),a=>a.length>=4||"Usuario 4-20 caracteres"],regNombre:[a=>a.trim(),a=>a.length>0||"Ingrese nombre"],regApellidos:[a=>a.trim(),a=>a.length>0||"Ingrese apellidos"],regPassword:[a=>a,a=>a.length>=6||"Mínimo 6 caracteres"],regPassword1:[a=>a,a=>a===e("#regPassword").val()||"Contraseñas no coinciden"]};e.each(u,function(a,[l,c]){e(`#${a}`).on("blur",function(){const d=l(e(this).val());e(this).val(d);const f=c(d);f!==!0&&k(this,f,"error")})});let p=!1;e("#regUsuario").on("blur focus",async function(){const a=e(this).val();if(a.length>=3)try{const c=(await P(M(x,r,a))).exists();p=!c,k(this,`Usuario ${c?"no disponible":"disponible ✅"}`,c?"error":"success","top",7e3)}catch(l){console.error(l)}});let h=!1;e("#regEmail").on("blur focus",async function(){const a=e(this).val();if(a.length>=3)try{const c=!(await T(q(D(x,r),z("email","==",a)))).empty;h=!c,k(this,`Email ${c?"no disponible":"disponible ✅"}`,c?"error":"success","top",7e3)}catch(l){console.error(l)}}),e("#Registrar").click(async function(){b(this,!0,"Registrando");const a=[[p,e("#regUsuario")[0],"Usuario no disponible"],[h,e("#regEmail")[0],"Email no disponible"],...Object.entries(u).map(([l,[c,d]])=>{const f=e(`#${l}`),m=c(f.val()),g=d(m);return[g===!0,f[0],g!==!0?g:""]})];for(const[l,c,d]of a)if(!l&&d&&(b(this,!1),k(c,d,"error"),c.focus(),!0))return;try{const l=["regEmail","regUsuario","regNombre","regApellidos","regPassword"],[c,d,f,m,g]=l.map(R=>e("#"+R).val().trim()),{user:v}=await J($,c,g);await Promise.all([K(v,{displayName:d}),Z(v)]),console.log("Registro completo en Auth ✅"+Date());const y=M(x,r,d);await G(y,{usuario:d,email:c,nombre:f,apellidos:m,rol:n,creacion:Q(),uid:v.uid}),console.log("Registro completo en Firestore ✅"+Date()),w("Registro completado! ✅")}catch(l){w({"auth/email-already-in-use":"Email ya registrado","auth/weak-password":"Contraseña muy débil"}[l.code]||l.message)||console.error(l)}finally{S(s,"wIn",24),cerrarModal("registroModal"),b(this,!1)}}),e("#Login").click(async function(){b(this,!0,"Iniciando sessión");try{const[a,l]=["#email","#password"].map(m=>e(m).val()),c=a.includes("@"),d=c?null:await P(M(x,r,a));if(!c&&!d.exists())throw new Error("Usuario no encontrado");const f=c?a:d.data().email;await ee($,f,l),S(s,"wIn",24)}catch(a){w({"auth/invalid-credential":"Contraseña incorrecta","auth/invalid-email":"Falta registrar Email","auth/missing-email":"Email o usuario no registrado"}[a.code]||a.message,"error"),console.error(a)}finally{cerrarModal("loginModal"),b(this,!1)}}),e("#Recuperar").click(async function(){b(this,!0,"Restablecer Contraseña");try{const[a,l]=["#recEmail","#recFechaNacimiento"].map(m=>e(m).val()),c=a.includes("@")?a:await(async()=>{const m=await P(M(x,r,a));return m.exists()?m.data().email:null})();if(!c)return w("Usuario no registrado","error");const d=await T(q(D(x,r),z("email","==",c)));if(d.empty)return w("Email incorrecto o no existe","error");if(d.docs[0].data().fechaNacimiento.toDate().toISOString().split("T")[0]!==l)return w("Fecha de nacimiento incorrecta","error");await te($,c),w("Se envió correo para restablecer su contraseña, revisa en principal o spam ✅","success")}catch(a){console.error(a)}finally{b(this,!1)}})}),e("body").append(i+o+t)}ue();(()=>{(function(){let t=N("wiSmile");t?o(t):i()})();function i(){e(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}function o(t){e(".wiauth").html(`
      <div class="sesion">
        <img src="${t.imagen||"./smile.png"}" alt="${t.nombre}"><span>${t.nombre}</span>
      </div>
      <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> Salir</button>
    `)}ae($,async t=>{if(!t)return I("wiSmile"),i();let r=N("wiSmile");if(!(r&&r.usuario===t.displayName))try{let n=(await P(M(x,"smiles",t.displayName))).data();n&&(S("wiSmile",n,450),o(n))}catch(s){console.error(s)}}),e(document).on("click",".bt_salir",async()=>{await oe($),I("wiSmile"),i()})})();let me="WiiPrime",fe=2024,he="@wilder.taype",ge="https://wtaype.github.io/",ve="v9";function be(){const i=new Date;return`
  <footer class="foo wb txc psa">
    <span>Creado con <i class="fas fa-heart"></i> by <a class="ftx lkme" href="${ge}" target="_blank">${he}</a></span>
    <span>${fe} - <span class="wty">${i.getFullYear()}</span></span>
    <span class="abw"> | ${me} ${ve} | actualizado:
    <span class="wtu">${i.toLocaleString()}</span></span>
  </footer>
  `}e("body").append(be());e("style").append(".foo{width:100%;text-align:center;padding-block:1.5vh 1vh;background:var(--wb);border-radius:1vh 1vh 0 0;}.foo *{font-size:var(--fz_s2);margin-inline:.3vh;}.foo a{color:var(--bg2);}.foo i{color:var(--mco);}.abwc{background:var(--bg);top:0;width:99%;height:100%;padding:2vh 2vw;overflow:scroll;line-height:1.80;}.abwok{background:var(--mco);color:var(--txa);}");C.register("/hora",()=>A(()=>import("./hora-BqGpuQob.js"),__vite__mapDeps([0,1,2])));C.register("/calendario",()=>A(()=>import("./calendario-J-IxWtKr.js"),__vite__mapDeps([3,1,2])));C.register("/calculadora",()=>A(()=>import("./calculadora-BX3nhD9p.js"),__vite__mapDeps([4,1,2])));C.register("/cronometro",()=>A(()=>import("./cronometro-Dz-acsJG.js"),__vite__mapDeps([5,1,2])));C.init();console.log("🚀 Sistema SPA inicializado");console.log("📍 Rutas disponibles:",Object.keys(C.ruta));export{e as $,j as N,N as g,S as s};
