'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list');
  var template = document.querySelector('#template');

  // Создает новый слайд
  var createSlide = function (data, index) {
    var tempSlide = template.querySelector('.stuffing-item').cloneNode(true);
    tempSlide.querySelector('.stuffing-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.stuffing-item__description').textContent = data.texts[index];
    tempSlide.querySelector('.stuffing-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.images[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  // Пронумеровывает слайды
  var setNumberSlides = function (slidesContainer) {
    var slides = slidesContainer.querySelectorAll('.stuffing-item');
    var slidesQuantity = slides.length;
    for (var i = 0; i < slides.length; i++) {
      slides[i].querySelector('.stuffing-item__counter').textContent = (i + 1) + '/' + slidesQuantity;
    };
  };

  // Создает фрагмент со слайдами
  var createSlidesFragment = function (data) {
    var slidesNumber = data.headings.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    setNumberSlides(fragment);
    fragment.querySelector('.stuffing-item').classList.add('stuffing-item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.stuffingData));
})();
