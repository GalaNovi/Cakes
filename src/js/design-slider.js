'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.design-item')),
      sliderCounterElement = document.querySelector('.form__design-slider-counter'), // NEW
      currentSlideClass = 'design-item--current',
      showedSlidesNumber = 1,
      currentSlideIndex,
      isFirstSlide,
      isLastSlide,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 300; // В милисекундах

  var sliderCounterUpdate = function () { // Обновляет счетчик слайдов
    sliderCounterElement.textContent = (currentSlideIndex + 1) + '/' + slidesElements.length;
  };

  var findCurrentSlide = function (element) { // Возвращает true, если слайд активный
    if (element.classList.contains(currentSlideClass)) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () { // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    currentSlide.style.cssText = 'animation: hideSlideToLeft ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    previousSlide.style.cssText = 'animation: showPreviousSlide ' + TIME_SLIDE_BROWSING / 1000 + 's;';
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

  var changeSlide = function (direction) { // Меняет слвйд в зависимости от направления свайпа
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumber];
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var previousSlide = slidesElements[currentSlideIndex - showedSlidesNumber];
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.designSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
    }, TIME_SLIDE_BROWSING);
  };

  var addSwipeListener = function (element) { // Добавляет обработчик свайпа на элемент
    var startSwipeX = null;
    var endSwipeX = null;
    var swipeDirection = null;

    element.addEventListener('touchstart', function (evt) { // При косании экрана запоминает координаты
      startSwipeX = evt.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', function (evt) { // По окончании свайпа запоминает координаты и если длина свайпа не меньше заданной,
      endSwipeX = evt.changedTouches[0].screenX;          // определяет направление свайпа и запускает функцию с этим аргументом
      if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
        if (startSwipeX - endSwipeX < 0) {
          swipeDirection = 'right';
        } else {
          swipeDirection = 'left';
        }
        changeSlide(swipeDirection);
      }
    });
  };

  window.designSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      updateCurrentSlideIndex();
      window.designSliderIndicator.set(slidesElements);
      window.designSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
    },

    slidesElements: slidesElements,
    currentSlideIndex: currentSlideIndex
  };
})();
