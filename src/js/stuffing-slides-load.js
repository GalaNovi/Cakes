'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list');

  // Создает новый слайд
  var createSlide = function (data, index) {
    var tempSlide = document.createElement('li');
    var template = document.querySelector('#stuffing-item').content.cloneNode(true);
    tempSlide.appendChild(template);
    tempSlide.classList.add('stuffing-item');
    tempSlide.querySelector('.stuffing-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.stuffing-item__description').textContent = data.texts[index];
    tempSlide.querySelector('.stuffing-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.imagesMobile[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.imagesDesktop[index]);
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.imagesTablet[index]);
    return tempSlide;
  }

  // Пронумеровывает слайды
  var setNumberSlides = function (slidesContainer) {
    var slides = slidesContainer.querySelectorAll('.stuffing-item');
    var slidesQuantity = slides.length;
    slides.forEach(function (slide, index) {
      slide.querySelector('.stuffing-item__counter').textContent = (index + 1) + '/' + slidesQuantity;
    });
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
