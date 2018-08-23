'use strict';

(function () {
  var totalStuffing = document.querySelector('#stuffing'),
      totalSize = document.querySelector('#size'),
      totalDesign = document.querySelector('#design'),
      stuffingValue = document.querySelector('.stuffing-item--current').querySelector('.stuffing-item__heading').textContent,
      sizeValue = document.querySelector('.size-item--current').querySelector('.size-item__label').textContent,
      designValue = document.querySelector('.design-item--current').querySelector('.design-item__heading').textContent;

  var setDefaultValue = function () { // Записывает дефолтные значения
    totalStuffing.textContent = stuffingValue;
    totalSize.textContent = sizeValue;
    totalDesign.textContent = designValue;
  };

  setDefaultValue();
})();
