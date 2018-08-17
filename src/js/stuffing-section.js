'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      submitButtonElement = document.querySelector('.form__item-button--stuffing'),
      totalDesignElement = document.querySelector('#stuffing');

  var onSubmitButtonClick = function () {
    var currentDesign = sliderElement.querySelector('.stuffing-item--current').querySelector('.stuffing-item__heading').textContent;
    totalDesignElement.textContent = currentDesign;
  };

  submitButtonElement.addEventListener('click', onSubmitButtonClick);

  window.stuffingSlider.add();
})();
