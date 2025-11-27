const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-CJQ1ZzTM.js","assets/main-DSDIEF83.js","assets/vendor-B2AETYxa.js","assets/main-BRyAGjpW.css","assets/init-BktE2GIV.js","assets/firebase-KckUx_OB.js"])))=>i.map(i=>d[i]);
import{M as _,$ as i,g as c,_ as n,r as e,w as p}from"./main-DSDIEF83.js";import"./vendor-B2AETYxa.js";p({js:[()=>n(()=>import("./wiauth-CJQ1ZzTM.js"),__vite__mapDeps([0,1,2,3,4,5]))]});function b(a){_?.("Bienvenido "+a.nombre),i(".wiauth").html(`
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `)}const f=(()=>{let a=c("wiSmile");a?r(a):t();function t(){i(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}async function r(l){b(l);const[{auth:o},{onAuthStateChanged:u,signOut:m}]=await Promise.all([n(()=>import("./init-BktE2GIV.js"),__vite__mapDeps([4,5])),n(()=>import("./firebase-KckUx_OB.js").then(s=>s.m),[])]);u(o,s=>{if(!s)return e("wiSmile"),t()}),i(document).on("click",".bt_salir",async()=>{await m(o),e("wiSmile"),t()})}})();export{f as header,b as personal};
