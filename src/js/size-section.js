'use strict';

(function () {
  var sizeElements = Array.from(document.querySelectorAll('.size-item__label')),
      sizeItems = Array.from(document.querySelectorAll('.size-item')),
      sizeTotal = document.querySelector('#size'),
      sizeButton = document.querySelector('.form__item-button--size');

  var onSizeElementClick = function (evt) {  // При клике на элемент, его значение записывается в итоговое поле.
    sizeTotal.textContent = evt.target.textContent;
  };

  var addSizeElementsListeners = function () {  // Вешает обработчики на все элементы
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].addEventListener('click', onSizeElementClick);
    };
  };

  var removeSizeElementsListeners = function () {  // Удаляет обработчики с элементов
    sizeElements.forEach(function (element) {
      element.removeEventListener('click', onSizeElementClick);
    });
  };

  var findCurrentElement = function (element) {  // Возвращает true, если элемент активный
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  var onSizeButtonClick = function () {  // При клике на кнопку, его значение записывается в итоговое поле.
    var currentSizeElementIndex = sizeItems.findIndex(findCurrentElement);
    sizeTotal.textContent = sizeItems[currentSizeElementIndex].querySelector('label').textContent;
  };

  window.addEventListener('resize', function () {
    // Обработчик изменения ширины экрана.
    if (screen.width >= 768) {
      window.sizeSlider.removeSlider();
      addSizeElementsListeners();
      sizeButton.removeEventListener('click', onSizeButtonClick);
    } else if (screen.width < 768) {
      window.sizeSlider.addSlider();
      removeSizeElementsListeners();
      sizeButton.addEventListener('click', onSizeButtonClick);
    }
  });

  if (screen.width >= 768) {
    window.sizeSlider.removeSlider();
    addSizeElementsListeners();
  }
  if (screen.width < 768) {
    window.sizeSlider.addSlider();
    sizeButton.addEventListener('click', onSizeButtonClick);
  }
})();
