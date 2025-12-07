const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wiauth-YclxHmVQ.js","assets/main-Effh8JTN.js","assets/vendor-B2AETYxa.js","assets/init-Cf5CZtPs.js","assets/firebase-D7fWNjWu.js"])))=>i.map(i=>d[i]);
import{M as m,$ as i,r as o,g as u,l as t,m as c,_ as p}from"./main-Effh8JTN.js";import"./footer-DITbv0p-.js";import{o as f,b as g}from"./firebase-D7fWNjWu.js";import{a as n}from"./init-Cf5CZtPs.js";import"./vendor-B2AETYxa.js";c({js:[()=>p(()=>import("./wiauth-YclxHmVQ.js"),__vite__mapDeps([0,1,2,3,4]))]});function b(a){m?.("Bienvenido "+a.nombre),i(".wiauth").html(`
    <a href="/local" class="winav_item" data-page="smile">
      <i class="fa-solid fa-location-dot"></i> <span>Mi Dashboard </span>
    </a>
    <div class="sesion">
      <img src="${a.imagen||"./smile.png"}" alt="${a.nombre}"><span>${a.nombre}</span>
    </div>
    <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> <span> Salir </span></button>
  `),o.navigate("/smile")}const S=(()=>{let a=u("wiSmile");a?e(a):s();function s(){i(".wiauth").html('<button class="wibtn_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button><button class="wibtn_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>')}function e(l){b(l),f(n,r=>{if(!r)return t("wiSmile"),s()})}i(document).on("click",".bt_salir",async()=>{await g(n),s(),o.navigate("/"),t("wiSmile wiciudades wifechas")})})();export{S as header,b as personal};
