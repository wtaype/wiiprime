
import $ from 'jquery';
export const wiSpin = (btn, act = true, txt = '') => {
  const $btn = $(btn);
  if (act) {
    const texto = txt || $btn.text().trim();
    $btn.data('txt', texto).prop('disabled', true).html(`${texto} <i class="fas fa-spinner fa-spin"></i>`);
  } else {
    $btn.prop('disabled', false).text($btn.data('txt') || txt || 'Continuar');
  }
};
