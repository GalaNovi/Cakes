'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list');
  var slidesElements = Array.from(sliderElement.querySelectorAll('.stuffing-item'));
  var buttonsElements = Array.from(sliderElement.querySelectorAll('.form__item-button--stuffing'));
  var inputsElements = Array.from(sliderElement.querySelectorAll('.stuffing-item__radio'));
  var headingsElements = Array.from(sliderElement.querySelectorAll('.stuffing-item__heading'));
  var previousButtonElement = document.querySelector('.form__list-navigation--stuffing-previous');
  var nextButtonElement = document.querySelector('.form__list-navigation--stuffing-next');
  var totalChoiseElement = document.querySelector('#stuffing');
  var sliderIndicatorElement = document.querySelector('.form__slider-indicator');
  var currentSlideIndex = 0;
  var isLastSlide = false;
  var isFirstSlide = true;
  var NEXT = true;
  var indicatorElements = [];
  var INDICATOR_ELEMENTS_NUMBER = 5;
  var FIRST_INDOCATOR_ELEMENT = 0;
  var LAST_INDOCATOR_ELEMENT = INDICATOR_ELEMENTS_NUMBER - 1;
  var SWIPE_LENGTH = 50;

  // Возвращает true, если слайд активный
  var findCurrentSlide = function (element) {
    if (element.classList.contains('stuffing-item--current')) {
      return true;
    }
    return false;
  };

  // Определяет индекс активного слайда, проверяет не крайний ли он
  var findCurrentSlideIndex = function () {
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  // Деактивирует соответствующие кнопки навигации, если слайд - крайний
  var disableSliderButtons = function () {
    previousButtonElement.classList.remove('form__list-navigation--disabled');
    nextButtonElement.classList.remove('form__list-navigation--disabled');
    if (isFirstSlide) {
      previousButtonElement.classList.add('form__list-navigation--disabled');
    } else if (isLastSlide) {
      nextButtonElement.classList.add('form__list-navigation--disabled');
    }
  };

  // Смена слайда, анимация
  var changeSlide = function (index, NEXT) {
    if (NEXT) {
      slidesElements[index].style.cssText = 'transform: translateX(-100%); opacity: 0; transition: transform 0.3s, opacity 0.2s;';
    } else {
      slidesElements[index].style.cssText = 'transform: translateX(100%); opacity: 0; transition: transform 0.3s, opacity 0.2s;';
    }
    setTimeout(function () {
      slidesElements[index].classList.toggle('stuffing-item--current');
      if (NEXT) {
        slidesElements[index + 1].classList.toggle('stuffing-item--current');
      } else {
        slidesElements[index - 1].classList.toggle('stuffing-item--current');
      }
      slidesElements[index].style.cssText = null;
      findCurrentSlideIndex();
      disableSliderButtons();
      updateSliderIndicator();
    }, 200);
  };

  // Показывает следующий слайд
  var showNextSlide = function (index) {
    changeSlide(index, NEXT);
  };

  // Показывает предыдущий слайд
  var showPreviousSlide = function (index) {
    changeSlide(index);
  };

  // Меняет слайд в зависимости от направления свайпа
  var swipeSlide = function (startSwipe, endSwipe) {
    if (startSwipe > endSwipe && !isLastSlide) {
      showNextSlide(currentSlideIndex);
    } else if (startSwipe < endSwipe && !isFirstSlide) {
      showPreviousSlide(currentSlideIndex);
    }
  };

  // Добавляет обработчик свайпа
  var addSwipeListener = function () {
    var startSwipeX = 0;
    var endSwipeX = 0;

    sliderElement.addEventListener('touchstart', function (evt) {
      startSwipeX = evt.changedTouches[0].screenX;
    }, false);

    sliderElement.addEventListener('touchend', function (evt) {
      endSwipeX = evt.changedTouches[0].screenX;
      if (startSwipeX - endSwipeX >= SWIPE_LENGTH || endSwipeX - startSwipeX >= SWIPE_LENGTH) {
        swipeSlide(startSwipeX, endSwipeX);
      }
    }, false);
  };

  // Добавляет обработчики на кнопки перелистывания слайдера
  var addSliderButtonsClick = function () {
    previousButtonElement.addEventListener('click', function () {
      if (!isFirstSlide) {
        showPreviousSlide(currentSlideIndex);
      }
    });
    nextButtonElement.addEventListener('click', function () {
      if (!isLastSlide) {
        showNextSlide(currentSlideIndex);
      }
    });
  };

  // Добавляет обработчики клика на кнопки выбора и дублирует название вниз формы
  var addSubmitButtonsClick = function () {
    buttonsElements.forEach(function (button, index) {
      button.addEventListener('click', function(evt) {
        evt.preventDefault();
        inputsElements[index].checked = true;
        totalChoiseElement.textContent = headingsElements[index].textContent;
      });
    });
  };

  // Создает элемент индикатора
  var createIdicatorElement = function () {
    var newElement = document.createElement('div');
    newElement.classList.add('form__slider-indicator-element');
    return newElement;
  };

  // Вставляет элемент в индикатор
  var insertElement = function () {
    sliderIndicatorElement.appendChild(createIdicatorElement());
  };

  // Вставляет в индикатор нужное количество элементов
  var insertElements = function () {
    if (slidesElements.length === 1) {
      insertElement();
    } else if (slidesElements.length > INDICATOR_ELEMENTS_NUMBER) {
      for (var i = 0; i < INDICATOR_ELEMENTS_NUMBER; i++) {
        insertElement();
      };
    } else {
      for (var i = 0; i < slidesElements.length; i++) {
        insertElement();
      };
    }
    indicatorElements = Array.from(document.querySelectorAll('.form__slider-indicator-element'));
  };

  // Ставит индикатор в начальное положение
  var setStartSliderIndicator = function () {
    indicatorElements[0].classList.add('form__slider-indicator-element--current');
    if (slidesElements.length > INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[LAST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
    }
  };

  // Обновляет индикатор слайдера
  var updateSliderIndicator = function () {
    indicatorElements.forEach(function (element) {
      element.classList.remove('form__slider-indicator--current');
      element.classList.remove('form__slider-indicator--extreme');
    });
    if (slidesElements.length <= INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[currentSlideIndex].classList.add('form__slider-indicator-element--current');
    } else if (slidesElements.length > INDICATOR_ELEMENTS_NUMBER) {
      if (currentSlideIndex < 3) {
        indicatorElements[currentSlideIndex].classList.add('form__slider-indicator-element--current');
        indicatorElements[LAST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
      } else if (currentSlideIndex === slidesElements.length -1) {
        indicatorElements[LAST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--current');
        indicatorElements[FIRST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
      } else if (currentSlideIndex === slidesElements.length -2) {
        indicatorElements[LAST_INDOCATOR_ELEMENT - 1].classList.add('form__slider-indicator-element--current');
        indicatorElements[FIRST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
      } else if (currentSlideIndex === slidesElements.length -3) {
        indicatorElements[LAST_INDOCATOR_ELEMENT - 2].classList.add('form__slider-indicator-element--current');
        indicatorElements[FIRST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
      } else if (currentSlideIndex > 2 && currentSlideIndex < slidesElements.length -3) {
        indicatorElements[LAST_INDOCATOR_ELEMENT - 2].classList.add('form__slider-indicator-element--current');
        indicatorElements[LAST_INDOCATOR_ELEMENT].classList.add('form__slider-indicator-element--extreme');
        indicatorElements[FIRST_INDOCATOR_ELEMENT].classList.add('sform__slider-indicator-element--extreme');
      }
    }
  };

  addSwipeListener();
  addSubmitButtonsClick();
  addSliderButtonsClick();
  disableSliderButtons();
  insertElements();
  setStartSliderIndicator();
})();
