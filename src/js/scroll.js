'use strict';

(function () {
  var links = Array.from(document.querySelectorAll('a'));

  // Вешает обработчик клика по ссылке (плавный скролл)
  var addClickListener = function(link) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      var id = '#' + this.href.split('#')[1];
      var element = document.querySelector(id);
      element.scrollIntoView({block: "start", behavior: "smooth"});
    });
  }

  // Навешивает обработчик клика на все ссылки в массиве
  var addListenersForLinks = function (array) {
    for (var i = 0; i < array.length; i++) {
      addClickListener(array[i]);
    };
  };

  addListenersForLinks(links);
})();
