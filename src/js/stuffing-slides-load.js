'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      template = document.querySelector('#template');

  var createSlide = function (data, index) {  // Создает новый слайд
    var tempSlide = template.querySelector('.stuffing-item').cloneNode(true);
    tempSlide.querySelector('.stuffing-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.stuffing-item__description').textContent = data.texts[index];
    tempSlide.querySelector('.stuffing-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.images[index]);
    tempSlide.querySelector('img').setAttribute('alt', data.alt[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[2].setAttribute('srcset', data.images[index].replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[3].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[4].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  var createSlidesFragment = function (data) {  // Создает фрагмент со слайдами
    var slidesNumber = data.headings.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelector('.stuffing-item').classList.add('stuffing-item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.stuffingData));
})();
