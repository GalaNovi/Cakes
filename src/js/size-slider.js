'use strict';

(function () {
  var sliderElement = document.querySelector('.size-list');
  var slidesElements = Array.from(document.querySelectorAll('.size-item'));
  var currentSlideIndex = 0;
  var isLastSlide = false;
  var isFirstSlide = true;
  var NEXT = true;
  var SWIPE_LENGTH = 50;

  // Возвращает true, если слайд активный
  var findCurrentSlide = function (element) {
    if (element.classList.contains('size-item--current')) {
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

  // Смена слайда, анимация
  var changeSlide = function (index, NEXT) {
    if (NEXT) {
      slidesElements[index].style.cssText = 'transform: translateX(-100%); opacity: 0; transition: transform 0.3s, opacity 0.2s;';
    } else {
      slidesElements[index].style.cssText = 'transform: translateX(100%); opacity: 0; transition: transform 0.3s, opacity 0.2s;';
    }
    setTimeout(function () {
      slidesElements[index].classList.toggle('size-item--current');
      if (NEXT) {
        slidesElements[index + 1].classList.toggle('size-item--current');
      } else {
        slidesElements[index - 1].classList.toggle('size-item--current');
      }
      slidesElements[index].style.cssText = null;
      findCurrentSlideIndex();
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

  addSwipeListener();
})();
