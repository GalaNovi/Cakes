'use strict';

(function () {
  var links = Array.from(document.querySelectorAll('.internal-link'));

  var addClickListener = function(link) {  // Вешает обработчик клика по ссылке (плавный скролл)
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      var id = '#' + this.href.split('#')[1];
      var element = document.querySelector(id);
      element.scrollIntoView({block: "start", behavior: "smooth"});
    });
  }

  var addListenersForLinks = function (array) {  // Навешивает обработчик клика на все ссылки в массиве
    for (var i = 0; i < array.length; i++) {
      addClickListener(array[i]);
    };
  };

  addListenersForLinks(links);
})();
