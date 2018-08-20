'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      submitButtonElement = document.querySelector('.form__item-button--stuffing'),
      totalDesignElement = document.querySelector('#stuffing');

  var onSubmitButtonClick = function () { // Записывает текущее значение в итоговое окно
    var currentDesign = sliderElement.querySelector('.stuffing-item--current').querySelector('.stuffing-item__heading').textContent;
    sliderElement.querySelector('.stuffing-item--current').querySelector('.stuffing-item__radio').checked = true;
    totalDesignElement.textContent = currentDesign;
  };

  submitButtonElement.addEventListener('click', onSubmitButtonClick); // Навешивает обработчик

  window.stuffingSlider.add();
})();
