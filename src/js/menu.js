'use strict';
(function () {
  var menuButton = document.querySelector('.page-header__menu-button');
  var menu = document.querySelector('.main-nav');

  menuButton.classList.remove('page-header__menu-button--nojs');

  menuButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    menuButton.classList.toggle('page-header__menu-button--opened');
    menu.classList.toggle('main-nav--hidden');
  });
})();
