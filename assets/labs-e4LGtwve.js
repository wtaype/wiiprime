import{$ as t,j as e}from"./main-Dbak2IZ5.js";import"./vendor-B2AETYxa.js";async function n(){return`
    <div class="page labs-page">
      <div class="page-header">
        <h1>🧪 Laboratorio de Pruebas</h1>
        <p>Testing de funciones wicopy V11.0</p>
      </div>

      <div class="labs-content">
        <!-- Test 1: String directo -->
        <div class="test-card">
          <h3>Test 1: String directo</h3>
          <button class="btn btn-primary test1">Copiar "Hola Mundo"</button>
        </div>

        <!-- Test 2: Input value -->
        <div class="test-card">
          <h3>Test 2: Input value</h3>
          <input type="text" id="testInput" value="Mi texto desde input" class="form-control">
          <button class="btn btn-primary test2">Copiar valor del input</button>
        </div>

        <!-- Test 3: Selector CSS -->
        <div class="test-card">
          <h3>Test 3: Selector CSS</h3>
          <p class="textoParaCopiar">Este texto será copiado por selector</p>
          <button class="btn btn-primary test3">Copiar con selector '.textoParaCopiar'</button>
        </div>

        <!-- Test 4: jQuery object -->
        <div class="test-card">
          <h3>Test 4: jQuery object</h3>
          <div id="jqueryText">Texto de jQuery object</div>
          <button class="btn btn-primary test4">Copiar jQuery object</button>
        </div>

        <!-- Test 5: DOM element -->
        <div class="test-card">
          <h3>Test 5: DOM element</h3>
          <span id="domElement">Texto de DOM element</span>
          <button class="btn btn-primary test5">Copiar DOM element</button>
        </div>

        <!-- Test 6: Con tooltip personalizado -->
        <div class="test-card">
          <h3>Test 6: Tooltip personalizado</h3>
          <button class="btn btn-success test6">Copiar con tooltip custom</button>
        </div>

        <!-- Test 7: Textarea -->
        <div class="test-card">
          <h3>Test 7: Textarea</h3>
          <textarea id="testTextarea" rows="3" class="form-control">Contenido del textarea
Línea 2
Línea 3</textarea>
          <button class="btn btn-primary test7">Copiar textarea</button>
        </div>

        <!-- Test 8: Texto largo -->
        <div class="test-card">
          <h3>Test 8: Texto largo</h3>
          <button class="btn btn-primary test8">Copiar texto largo (1000 chars)</button>
        </div>
      </div>
    </div>
  `}function i(){console.log("🧪 Labs inicializado"),t(".test1").on("click",function(){e("Hola Mundo",this,"¡String copiado!")}),t(".test2").on("click",function(){e("#testInput",this)}),t(".test3").on("click",function(){e(".textoParaCopiar",this)}),t(".test4").on("click",function(){e(t("#jqueryText"),this,"¡jQuery copiado!")}),t(".test5").on("click",function(){const o=document.getElementById("domElement");e(o,this,"¡DOM copiado!")}),t(".test6").on("click",function(){e("Texto con tooltip custom",this,"🎉 ¡Perfecto!")}),t(".test7").on("click",function(){e("#testTextarea",this,"¡Textarea copiado!")}),t(".test8").on("click",function(){const o="Lorem ipsum ".repeat(100);e(o,this,`¡${o.length} chars copiados!`)}),console.log("✅ Eventos de labs configurados")}export{i as init,n as render};
