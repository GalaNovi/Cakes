'use strict';

(function () {
  var sliderElement = document.querySelector('.size-list'),
      slidesElements = Array.from(document.querySelectorAll('.size-item')),
      currentSlideClass = 'size-item--current',
      currentSlideIndex = 0,
      isLastSlide,
      isFirstSlide,
      swipeDirection = null,
      startSwipeX = 0,
      endSwipeX = 0,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 200; // В милисекундах

  var findCurrentSlide = function (element) {  // Возвращает true, если слайд активный
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () {  // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    currentSlide.style.cssText = 'animation: hideSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    previousSlide.style.cssText = 'animation: showPreviousSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    setTimeout(function () {
      currentSlide.style.cssText = null;
      previousSlide.style.cssText = null;
    }, TIME_SLIDE_BROWSING);
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    animateBrowsingNextSlide(currentSlide, nextSlide);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      animateBrowsingPreviousSlide(currentSlide, previousSlide);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
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
      window.sizeSliderIndicator.update(currentSlideIndex);
    }, TIME_SLIDE_BROWSING);
  };

  var onSliderTouchStart = function (evt) {  // Запоминает координаты нажатия тапа
    startSwipeX = evt.changedTouches[0].screenX;
  };

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
    addSlider: function () { // Добавляет обработчик свайпа
      sliderElement.addEventListener('touchstart', onSliderTouchStart, false);
      sliderElement.addEventListener('touchend', onSliderTouchEnd, false);
      window.sizeSliderIndicator.update(currentSlideIndex);
    },

    removeSlider: function () {  // Удаляет обработчик свайпа
      sliderElement.removeEventListener('touchstart', onSliderTouchStart);
      sliderElement.removeEventListener('touchend', onSliderTouchEnd);
    }
  };
})();
