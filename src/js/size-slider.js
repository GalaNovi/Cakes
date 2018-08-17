'use strict';

(function () {
  var sliderElement = document.querySelector('.size-list');
  var slidesElements = Array.from(document.querySelectorAll('.size-item'));
  var currentSlideClass = 'size-item--current';
  var currentSlideIndex = 0;
  var isLastSlide;
  var isFirstSlide;
  var swipeDirection = null;
  var startSwipeX = 0;
  var endSwipeX = 0;
  var NEXT = true;
  var SWIPE_LENGTH = 50;
  var TIME_SLIDE_BROWSING = 200; // В милисекундах

  // Возвращает true, если слайд активный
  var findCurrentSlide = function (element) {
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  // Определяет индекс активного слайда, проверяет не крайний ли он
  var updateCurrentSlideIndex = function () {
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
      currentSlide.style.opacity = '0';
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
      currentSlide.style.opacity = null;
      nextSlide.classList.add(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    currentSlide.style.opacity = '0';
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
      currentSlide.style.opacity = null;
      previousSlide.classList.add(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Смена слайда
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var nextSlide = slidesElements[currentSlideIndex + 1];
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var previousSlide = slidesElements[currentSlideIndex - 1];
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
    }, TIME_SLIDE_BROWSING);
  };

  // Запоминает координаты нажатия тапа
  var onSliderTouchStart = function (evt) {
    startSwipeX = evt.changedTouches[0].screenX;
  };

  // При отпускании тапа вычисляет длину свайпа, и если она соответствует - переключает слайд
  var onSliderTouchEnd = function (evt) {
    endSwipeX = evt.changedTouches[0].screenX;
    if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
      if (startSwipeX - endSwipeX < 0) {
        swipeDirection = 'right';
      } else {
        swipeDirection = 'left';
      }
      changeSlide(swipeDirection);
    }
  };

  window.sizeSlider = {
    // Добавляет обработчик свайпа
    addSwipeListener: function () {
      sliderElement.addEventListener('touchstart', onSliderTouchStart, false);
      sliderElement.addEventListener('touchend', onSliderTouchEnd, false);
    },

    // Удаляет обработчик свайпа
    removeSwipeListener: function () {
      sliderElement.removeEventListener('touchstart', onSliderTouchStart);
      sliderElement.removeEventListener('touchend', onSliderTouchEnd);
    }
  };
})();
