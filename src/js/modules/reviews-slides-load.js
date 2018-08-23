'use strict';

(function () {
  var sliderElement = document.querySelector('.reviews__list'),
      template = document.querySelector('#template'),
      SHOWN_WORDS_NUMBERS = 26;

  var insertReviewText = function (slide, text, maxWordsNumbers) {  // Если в тексте больше максимального количества
    var words = text.split(' ');                                    // слов - делит его на части и вставляет в слайд.
    if (words.length > maxWordsNumbers) {                           // Еслине больше - вставляет текст и прячет кнопку
      var shownText = words.slice(0, maxWordsNumbers - 1).join(' ');// "Развернуть".
      var hiddenText = words.slice(maxWordsNumbers - 1).join(' ');
      slide.querySelector('.reviews__item-text').textContent = shownText;
      slide.querySelector('.reviews__item-text-hidden').textContent = hiddenText;
    } else {
      slide.querySelector('.reviews__item-text').textContent = text;
      slide.querySelector('.reviews__item-full-text--show').style.display = 'none';
    }
  };

  var addShowFullReviewLinkListener = function (slide) { // Обработчик для ссылки "Развернуть"
    var showFullReviewLink = slide.querySelector('.reviews__item-full-text--show');
    showFullReviewLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      slide.querySelector('.reviews__item-text-hidden').style.display = 'inline';
      slide.querySelector('.reviews__item-full-text--show').style.display = 'none';
      slide.querySelector('.reviews__item-full-text--hide').style.display = 'inline';
    });
  };

  var addHideFullReviewLinkListener = function (slide) { // Обработчик для ссылки "Развернуть"
    var hideFullReviewLink = slide.querySelector('.reviews__item-full-text--hide');
    hideFullReviewLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      slide.querySelector('.reviews__item-text-hidden').style.display = 'none';
      slide.querySelector('.reviews__item-full-text--show').style.display = 'inline';
      slide.querySelector('.reviews__item-full-text--hide').style.display = 'none';
    });
  };

  var createSlide = function (data, index) {  // Создает новый слайд
    var tempSlide = template.querySelector('.reviews__item').cloneNode(true);
    tempSlide.querySelector('.reviews__item-name').textContent = data.names[index];
    tempSlide.querySelector('.reviews__item-info').textContent = data.info[index];
    insertReviewText(tempSlide, data.texts[index], SHOWN_WORDS_NUMBERS);
    addShowFullReviewLinkListener(tempSlide);
    addHideFullReviewLinkListener(tempSlide);
    tempSlide.querySelector('img').setAttribute('src', data.photos[index]);
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'desktop').replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'tablet').replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[2].setAttribute('srcset', data.photos[index].replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[3].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[4].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  var createSlidesFragment = function (data) {  // Создает фрагмент со слайдами
    var slidesNumber = data.names.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelector('.reviews__item').classList.add('reviews__item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.reviewsData));
})();
