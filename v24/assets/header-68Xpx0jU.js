const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-BJbOINxZ.js","assets/main-Ccw8lrP2.js","assets/vendor-B2AETYxa.js","assets/firebase-DWujM1-5.js","assets/init-DFaFE2Xa.js"])))=>i.map(i=>d[i]);
import{M as _,$ as t,r as l,g as p,_ as n,l as e,m as g}from"./main-Ccw8lrP2.js";import"./vendor-B2AETYxa.js";import"./firebase-DWujM1-5.js";g({js:[()=>n(()=>import("./wiauth-BJbOINxZ.js"),__vite__mapDeps([0,1,2,3,4]))]});function b(a){_?.("Bienvenido "+a.nombre),t(".wiauth").html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `),l.navigate("/smile")}const v=(()=>{let a=p("wiSmile");a?r(a):s();function s(){t(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}async function r(m){b(m);const[{auth:o},{onAuthStateChanged:u,signOut:c}]=await Promise.all([n(()=>import("./init-DFaFE2Xa.js"),__vite__mapDeps([4,3])),n(()=>import("./firebase-DWujM1-5.js").then(i=>i.n),[])]);u(o,i=>{if(!i)return e("wiSmile"),s()}),t(document).on("click",".bt_salir",async()=>await c(o)||(e("wiSmile"),s(),l.navigate("/")))}})();export{v as header,b as personal};
