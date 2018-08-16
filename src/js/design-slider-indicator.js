'use strict';

(function () {
  var indicatorElement = document.querySelector('.form__slider-indicator--design');
  var indicatorElements = [];
  var INDICATOR_ELEMENT_CLASS = 'form__slider-indicator-element';
  var INDICATOR_CURRENT_ELEMENT_CLASS = 'form__slider-indicator-element--current';
  var INDICATOR_EXTREME_ELEMENT_CLASS = 'form__slider-indicator-element--extreme';
  var INDICATOR_ELEMENTS_NUMBER = 5;


  // Создает элемент индикатора
  var createIndicatorElement = function () {
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS);
    return newIndicatorElement;
  };

  // Добавляет элемент в индикатор
  var insertElement = function () {
    indicatorElement.appendChild(createIndicatorElement());
  };

  // Добавляет в индикатор нужное количество элементов
  var insertElements = function (slides) {
    if (slides.length === 1) {
      insertElement();
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      for (var i = 0; i < INDICATOR_ELEMENTS_NUMBER; i++) {
        insertElement();
      };
    } else {
      for (var i = 0; i < slides.length; i++) {
        insertElement();
      };
    }
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  // Обновляет индикатор слайдера
  var updateSliderIndicator = function (slides, currentSlideIndex) {
    var firstElement = indicatorElements[0];
    var lastElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 1]
    var secondFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 2]
    var thirdFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 3]

    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
      element.classList.remove(INDICATOR_EXTREME_ELEMENT_CLASS);
    });

    if (slides.length <= INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      if (currentSlideIndex < 3) {
        indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -1) {
        lastElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -2) {
        secondFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex > 2 && currentSlideIndex < slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      }
    }
  };

  window.designSliderIndicator = {
    set: insertElements,
    update: updateSliderIndicator
  };
})();
