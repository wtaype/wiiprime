const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-Cn44HUeW.js","assets/main-DIaeb0IJ.js","assets/vendor-B2AETYxa.js","assets/init-SyVNM3Ej.js","assets/firebase-DXmy2lv8.js"])))=>i.map(i=>d[i]);
import{M as _,$ as e,r as u,g as p,_ as r,l,m as g}from"./main-DIaeb0IJ.js";import"./vendor-B2AETYxa.js";g({js:[()=>r(()=>import("./wiauth-Cn44HUeW.js"),__vite__mapDeps([0,1,2,3,4]))]});function d(a){_?.("Bienvenido "+a.nombre),e(".wiauth").html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `),u.navigate("/smile")}const f=(()=>{let a=p("wiSmile");a?c(a):s();function s(){e(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}async function c(i){d(i);const{auth:n,onAuthStateChanged:o}=await r(async()=>{const{auth:t,onAuthStateChanged:m}=await import("./wiauth-Cn44HUeW.js");return{auth:t,onAuthStateChanged:m}},__vite__mapDeps([0,1,2,3,4]));o(n,t=>{if(!t)return l("wiSmile"),s()})}e(document).on("click",".bt_salir",async()=>{const{auth:i,signOut:n}=await r(async()=>{const{auth:o,signOut:t}=await import("./wiauth-Cn44HUeW.js");return{auth:o,signOut:t}},__vite__mapDeps([0,1,2,3,4]));await n(i),l("wiSmile wiciudades wifechas"),s(),u.navigate("/")})})();export{f as header,d as personal};
