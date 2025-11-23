import{g as i,$ as t,s as l,N as m}from"./main-DyV1n7rJ.js";import"./vendor-B2AETYxa.js";import"./firebase-oQ0U6Yya.js";let o={format:i("clockFormat")||"24",showDate:i("clockShowDate")||!1,size:i("clockSize")||12},a=null;const c=()=>{const e=new Date;let s=e.getHours();const f=e.getMinutes(),w=e.getSeconds();let n=s,r="";o.format==="12"?(r=s>=12?"PM":"AM",n=s%12||12,t("#clockAmPm").text(r).show()):t("#clockAmPm").hide();const v=`${String(n).padStart(2,"0")}:${String(f).padStart(2,"0")}:${String(w).padStart(2,"0")}`;if(t("#clockTime").text(v),o.showDate){const u={weekday:"long",year:"numeric",month:"long",day:"numeric"},d=e.toLocaleDateString("es-ES",u),k=d.charAt(0).toUpperCase()+d.slice(1);t("#clockDate").text(k).show()}else t("#clockDate").hide()},b=async()=>`
    <!-- RELOJ DIGITAL -->
    <div class="wiclock">
      <div class="wiclock_time" id="clockTime">21:05:58</div>
      <div class="wiclock_date" id="clockDate" style="display: none;">Miércoles, 20 de Noviembre de 2025</div>
      <div class="wiclock_ampm" id="clockAmPm" style="display: none;">PM</div>
    </div>

    <!-- FOOTER DE PERSONALIZACIÓN -->
    <footer class="wifooter">
      <div class="wifooter_section">
        <label class="wilabel">Formato:</label>
        <div class="wibtn_group">
          <button class="wibtn wibtn_format ${o.format==="24"?"active":""}" data-format="24">24h</button>
          <button class="wibtn wibtn_format ${o.format==="12"?"active":""}" data-format="12">12h</button>
        </div>
      </div>

      <div class="wifooter_section">
        <label class="wilabel">
          <input type="checkbox" id="toggleDate" class="witoggle" ${o.showDate?"checked":""} />
          <span>Mostrar Fecha</span>
        </label>
      </div>

      <div class="wifooter_section">
        <label class="wilabel">Tamaño:</label>
        <input type="range" id="clockSize" class="wirange" min="8" max="20" value="${o.size}" step="0.5" />
        <span class="wirange_value" id="sizeValue">${o.size}vw</span>
      </div>
    </footer>
  `,D=()=>{t("#clockTime").css("font-size",`${o.size}vw`),c(),a&&clearInterval(a),a=setInterval(c,1e3),t(".wibtn_format").off("click").on("click",function(){const e=t(this).data("format");o.format=e,t(".wibtn_format").removeClass("active"),t(this).addClass("active"),l("clockFormat",e,720),c(),m(`Formato cambiado a ${e}h`,"success",1500)}),t("#toggleDate").off("change").on("change",function(){o.showDate=t(this).is(":checked"),l("clockShowDate",o.showDate,720),c();const e=o.showDate?"Fecha visible":"Fecha oculta";m(e,"success",1500)}),t("#clockSize").off("input").on("input",function(){const e=t(this).val();o.size=e,t("#clockTime").css("font-size",`${e}vw`),t("#sizeValue").text(`${e}vw`),l("clockSize",e,720)}),console.log("🕐 Módulo de  inicializado")},S=()=>{a&&(clearInterval(a),a=null)};export{S as cleanup,D as init,b as render};
