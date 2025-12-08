import{g as l,c as a,$ as t,s as o}from"./main-DGp21lZ3.js";import"./vendor-B2AETYxa.js";let s=null;const r=async()=>(s=l("smileIP")||await new Promise(e=>a(i=>(o("smileIP",i),e(i)))),console.log("🌍 IP:",s?.ip),`
    <div class="wtm_hd">
      <div class="hd_info">
        <h2 class="wtm_ttl">
          <i class="fas fa-smile-beam"></i> Bienvenidos
        </h2>
        <p class="wtm_sub">Disfruta de WiiPrime 😄</p>
      </div>
    </div>
    <div class="wtm_lay wtm_lay--center">
      <div class="smile_box">
        <i class="fas fa-grin-stars smile_icon"></i>
        <h3 class="smile_title">Tu panel de sonrisas está en construcción</h3>
        <p class="smile_text">
          Muy pronto verás aquí estadísticas, logros y más sorpresas.
        </p>
      </div>
    </div>
  `),m=async()=>{console.log("😊 Smile iniciado"),t(".smile_text").click(function(){alert("¡Eres genial por descubrir esto! 😄")})},d=()=>{s=null,console.log("😊 Smile limpiado")};export{d as cleanup,m as init,r as render};
