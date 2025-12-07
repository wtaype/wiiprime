const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-B9Rh3DUp.js","assets/main-Bd3JQoOJ.js","assets/vendor-B2AETYxa.js","assets/init-D7ituNmG.js","assets/firebase-BDBD3npj.js"])))=>i.map(i=>d[i]);
import{M as _,$ as t,r as l,g as p,_ as n,l as e,m as g}from"./main-Bd3JQoOJ.js";import"./vendor-B2AETYxa.js";g({js:[()=>n(()=>import("./wiauth-B9Rh3DUp.js"),__vite__mapDeps([0,1,2,3,4]))]});function b(a){_?.("Bienvenido "+a.nombre),t(".wiauth").html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `),l.navigate("/smile")}const h=(()=>{let a=p("wiSmile");a?r(a):s();function s(){t(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}async function r(u){b(u);const[{auth:o},{onAuthStateChanged:m,signOut:c}]=await Promise.all([n(()=>import("./init-D7ituNmG.js"),__vite__mapDeps([3,4])),n(()=>import("./firebase-BDBD3npj.js").then(i=>i.n),[])]);m(o,i=>{if(!i)return e("wiSmile"),s()}),t(document).on("click",".bt_salir",async()=>await c(o)||(e("wiSmile"),s(),l.navigate("/")))}})();export{h as header,b as personal};
