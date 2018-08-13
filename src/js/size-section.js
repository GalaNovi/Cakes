'use strict';

(function () {
  var sizeElements = Array.from(document.querySelectorAll('.size-item__label'));
  var sizeItems = Array.from(document.querySelectorAll('.size-item'));
  var sizeTotal = document.querySelector('#size');
  var sizeButton = document.querySelector('.form__item-button--size');

  // При клике на элемент, его значение записывается в итоговое поле.
  var onSizeElementClick = function (evt) {
    sizeTotal.textContent = evt.target.textContent;
  };

  // Вешает обработчики на все элементы
  var addSizeElementsListeners = function () {
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].addEventListener('click', onSizeElementClick);
    };
  };

  // Удаляет обработчики с элементов
  var removeSizeElementsListeners = function () {
    sizeElements.forEach(function (element) {
      element.removeEventListener('click', onSizeElementClick);
    });
  };

  // Возвращает true, если элемент активный
  var findCurrentElement = function (element) {
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  // При клике на кнопку, его значение записывается в итоговое поле.
  var onSizeButtonClick = function () {
    var currentSizeElementIndex = sizeItems.findIndex(findCurrentElement);
    sizeTotal.textContent = sizeItems[currentSizeElementIndex].querySelector('label').textContent;
  };

  // Обработчик изменения ширины экрана.
  window.addEventListener('resize', function () {
    if (screen.width >= 768) {
      window.sizeSlider.removeSwipeListener();
      addSizeElementsListeners();
      sizeButton.removeEventListener('click', onSizeButtonClick);
    } else if (screen.width < 768) {
      window.sizeSlider.addSwipeListener();
      removeSizeElementsListeners();
      sizeButton.addEventListener('click', onSizeButtonClick);
    }
  });

  if (screen.width >= 768) {
    window.sizeSlider.removeSwipeListener();
    addSizeElementsListeners();
  }
  if (screen.width < 768) {
    window.sizeSlider.addSwipeListener();
    sizeButton.addEventListener('click', onSizeButtonClick);
  }
})();
