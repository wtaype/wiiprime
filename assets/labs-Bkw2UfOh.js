import{$ as t,c as r,g as n,s as l}from"./main-DGI4Bgfs.js";import{d as c}from"./init-DZeWwa5g.js";import{s as m,d,g as p,T as b,a as g}from"./firebase-Bx39EDaX.js";import"./vendor-B2AETYxa.js";const i=r(b),a="publico",s="labs",y=()=>`
  <div class="wilabs">
    <h3 id="tit">📅 wiDate</h3>
    <input id="dia" type="date">
    <input id="esc" type="datetime-local">
    <button id="btn">💾</button>
    <div id="res"></div>
    <div id="out"></div>
  </div>
`,h=()=>{t("#btn").click(async()=>{await m(d(c,a,s),{nombre:"Wilder",descripcion:t("#tit").text(),creacion:g(),dia:i.save(t("#dia").val()),escogido:i.save(t("#esc").val())},{merge:!0}),localStorage.removeItem(`${a}_${s}`),t("#res").text("✅ Guardado")}),(async()=>{const o=`${a}_${s}`;let e=n(o);e?t("#res").text("📦 Caché"):(t("#res").text("🔥 Firebase"),e=(await p(d(c,a,s))).data(),e&&l(o,{...e,creacion:e.creacion?.seconds,dia:e.dia?.seconds,escogido:e.escogido?.seconds})),e&&t("#out").html(`
        👤 ${e.nombre} | 📝 ${e.descripcion}<br><br>
        🔥 Creación: ${i.get(e.creacion)}<br>
        📅 Día: ${i.get(e.dia)} <input type="date" value="${i.get(e.dia,"iso")}"><br>
        ⏰ Escogido: ${i.get(e.escogido)} <input type="datetime-local" value="${i.get(e.escogido,"full")}">
      `)})()},w=()=>t("#btn").off("click");export{w as cleanup,h as init,y as render};
