import $ from 'jquery';
import { wicopy, wiTip } from '../widev.js';

export async function render() {
  return `
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
  `;
}

export function init() {
  console.log('🧪 Labs inicializado');

  // Test 1: String directo
  $('.test1').on('click', function() {
    wicopy('Hola Mundo', this, '¡String copiado!');
  });

  // Test 2: Input value (selector)
  $('.test2').on('click', function() {
    wicopy('#testInput', this);
  });

  // Test 3: Selector CSS
  $('.test3').on('click', function() {
    wicopy('.textoParaCopiar', this);
  });

  // Test 4: jQuery object
  $('.test4').on('click', function() {
    wicopy($('#jqueryText'), this, '¡jQuery copiado!');
  });

  // Test 5: DOM element
  $('.test5').on('click', function() {
    const domEl = document.getElementById('domElement');
    wicopy(domEl, this, '¡DOM copiado!');
  });

  // Test 6: Tooltip personalizado
  $('.test6').on('click', function() {
    wicopy('Texto con tooltip custom', this, '🎉 ¡Perfecto!');
  });

  // Test 7: Textarea
  $('.test7').on('click', function() {
    wicopy('#testTextarea', this, '¡Textarea copiado!');
  });

  // Test 8: Texto largo
  $('.test8').on('click', function() {
    const textoLargo = 'Lorem ipsum '.repeat(100);
    wicopy(textoLargo, this, `¡${textoLargo.length} chars copiados!`);
  });

  console.log('✅ Eventos de labs configurados');
}