'use strict';

(function () {
  var indicatorElement = document.querySelector('.slider__indicator--size'),
      slidesElements = Array.from(document.querySelectorAll('.size-item')),
      indicatorElements = [],
      INDICATOR_ELEMENT_CLASS = 'slider__indicator-element',
      INDICATOR_CURRENT_ELEMENT_CLASS = 'slider__indicator-element--current';


  var createIndicatorElement = function () {  // Создает элемент индикатора
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS);
    return newIndicatorElement;
  };

  var insertElement = function () {  // Добавляет элемент в индикатор
    indicatorElement.appendChild(createIndicatorElement());
  };

  var insertElements = function (slides) {  // Добавляет в индикатор нужное количество элементов
    for (var i = 0; i < slides.length; i++) {
      insertElement();
    };
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  var updateSliderIndicator = function (currentSlideIndex) {  // Обновляет индикатор слайдера
    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
    });
    indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
  };

  insertElements(slidesElements);

  window.sizeSliderIndicator = {
    update: updateSliderIndicator
  };
})();
