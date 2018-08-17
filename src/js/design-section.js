'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      submitButtonElement = document.querySelector('.form__item-button--design'),
      totalDesignElement = document.querySelector('#design');

  var onSubmitButtonClick = function () {
    var currentDesign = sliderElement.querySelector('.design-item--current').querySelector('.design-item__heading').textContent;
    totalDesignElement.textContent = currentDesign;
  };

  submitButtonElement.addEventListener('click', onSubmitButtonClick);

  window.designSlider.add();
})();
