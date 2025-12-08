const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-DtftC7a4.js","assets/main-DGGzhnp8.js","assets/vendor-B2AETYxa.js","assets/firebase-wg2OH5Oq.js"])))=>i.map(i=>d[i]);
import{M as _,$ as e,r as u,g as p,_ as r,d as l,f as d}from"./main-DGGzhnp8.js";import"./vendor-B2AETYxa.js";d({js:[()=>r(()=>import("./wiauth-DtftC7a4.js"),__vite__mapDeps([0,1,2,3]))]});function g(a){_?.("Bienvenido "+a.nombre),e(".wiauth").html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `),u.navigate("/smile")}const b=(()=>{let a=p("wiSmile");a?c(a):s();function s(){e(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}async function c(i){g(i);const{auth:n,onAuthStateChanged:o}=await r(async()=>{const{auth:t,onAuthStateChanged:m}=await import("./wiauth-DtftC7a4.js");return{auth:t,onAuthStateChanged:m}},__vite__mapDeps([0,1,2,3]));o(n,t=>{if(!t)return l("wiSmile"),s()})}e(document).on("click",".bt_salir",async()=>{const{auth:i,signOut:n}=await r(async()=>{const{auth:o,signOut:t}=await import("./wiauth-DtftC7a4.js");return{auth:o,signOut:t}},__vite__mapDeps([0,1,2,3]));await n(i),l("wiSmile wiciudades wifechas"),s(),u.navigate("/")})})();export{b as header,g as personal};
