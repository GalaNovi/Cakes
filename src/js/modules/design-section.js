'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      slidesElements = Array.from(document.querySelectorAll('.design-item')),
      submitButtonElement = document.querySelector('.form__item-button--design'),
      totalDesignElement = document.querySelector('#design'),
      windowWidth = window.innerWidth;

  var onSubmitButtonClick = function () {  // Записывает значение текущего слайда в итоговое окно
    var currentDesign = sliderElement.querySelector('.design-item--current').querySelector('.design-item__heading').textContent;
    totalDesignElement.textContent = currentDesign;
    sliderElement.querySelector('.design-item--current').querySelector('.design-item__radio').checked = true;
  };

  var addSlideClickListener = function (evt) { // Записывает значение слайда по которому был клик в итоговое окно
    totalDesignElement.textContent = evt.currentTarget.querySelector('.design-item__heading').textContent;
    evt.currentTarget.querySelector('.design-item__radio').checked = true;
  };

  var addAllSlidesClickListeners = function (slides) { // Добавляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].addEventListener('click', addSlideClickListener);
    };
  }

  var removeAllSlidesClickListeners = function (slides) { // Удаляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].removeEventListener('click', addSlideClickListener);
    };
  }

  var addOrDeleteSlidesListeners = function (slides) { // В зависимости от ширины окна добавляет
    if (windowWidth < 768) {                           // или удаляет обработчики клика по слайдам
      removeAllSlidesClickListeners(slides);
    } else {
      addAllSlidesClickListeners(slides);
    }
  };

  var updateWindowWidth = function () { // Отслеживает ширину окна
    windowWidth = window.innerWidth;
    addOrDeleteSlidesListeners(slidesElements);
  };

  window.addEventListener('resize', updateWindowWidth)
  window.designSlider.add(); // Импортирует настройки для слайдера
  submitButtonElement.addEventListener('click', onSubmitButtonClick);  // Навешивает обработчик на кнопку
  addOrDeleteSlidesListeners(slidesElements);
})();
