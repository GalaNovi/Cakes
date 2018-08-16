'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list');
  var template = document.querySelector('#template');
  var DEFAULT_SLIDE_NUMBER = 2;

  // Создает новый слайд
  var createSlide = function (data, index) {
    var tempSlide = template.querySelector('.design-item').cloneNode(true);
    tempSlide.querySelector('.design-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.design-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.images[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  // Создает фрагмент со слайдами
  var createSlidesFragment = function (data) {
    var slidesNumber = data.headings.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelectorAll('.design-item')[DEFAULT_SLIDE_NUMBER - 1].classList.add('design-item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.designData));
})();
