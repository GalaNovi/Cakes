'use strict';

(function () {
  var sliderElement = document.querySelector('.reviews__list'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.reviews__item')),
      sliderPreviousButtonElement = document.querySelector('.slider__navigation--reviews-previous'),
      sliderNextButtonElement = document.querySelector('.slider__navigation--reviews-next'),
      sliderCounterElement = document.querySelector('.reviews__slider-counter'),
      currentSlideClass = 'reviews__item--current',
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
    if (window.innerWidth < 768) {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else if (window.innerWidth < 1366) {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftTablet ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftDesktop ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    if (window.innerWidth < 768) {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else if (window.innerWidth < 1366) {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideTablet ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideDesktop ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    }
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
      window.reviewsSliderIndicator.update(slidesElements, currentSlideIndex);
      navigationButtonsUpdate();
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

  var addNavigationButtonsListeners = function () { // Обработчики кнопок навигации слайдера
    sliderPreviousButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('right');
    });
    sliderNextButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('left');
    });
  };

  var navigationButtonsUpdate = function () {
    sliderPreviousButtonElement.classList.remove('slider__navigation--disabled');
    sliderNextButtonElement.classList.remove('slider__navigation--disabled');
    if (isFirstSlide) {
      sliderPreviousButtonElement.classList.add('slider__navigation--disabled');
    } else if (isLastSlide) {
      sliderNextButtonElement.classList.add('slider__navigation--disabled');
    }
  };

  window.reviewsSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      addNavigationButtonsListeners();
      updateCurrentSlideIndex();
      navigationButtonsUpdate();
      sliderCounterUpdate();
      window.reviewsSliderIndicator.set(slidesElements);
      window.reviewsSliderIndicator.update(slidesElements, currentSlideIndex);
    }
  };
})();
