'use strict';

(function () {
  var fillings = ['Шоколадный ганаш', 'Шоколадный ганаш 2'];
  var sizes = ['1 кг', '2 кг', '5 кг', '8 кг'];
  var decors = ['Ягодное ассорти', 'Маршмэллоу', 'Маршмэллоу 2'];
  var fieldFilling = document.querySelector('#result-filling');
  var fieldSize = document.querySelector('#result-size');
  var fieldDecor = document.querySelector('#result-decor');
  var fillingList = document.querySelector('.filling-list');
  var sizeList = document.querySelector('.size-list');
  var decorList = document.querySelector('.decor-list');

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) {
          return node;
        } else {
          node = node.parentElement;
        }
      }
      return null;
    };
  }

  var chooseRadio = function (e) {
    var elem = e.target;
    while (!elem.matches('li')) {
      elem = elem.parentElement;
    }

    var radio = elem.querySelector('input[type="radio"]');
    radio.checked = true;
    switch (radio.name) {
      case 'filling':
        fieldFilling.value = fillings[radio.value];
        break;
      case 'size':
        fieldSize.value = sizes[radio.value];
        break;
      case 'decor':
        fieldDecor.value = decors[radio.value];
        break;
    }
  };

  fillingList.addEventListener('click', function (evt) {
    if(!evt.target.closest('.filling-list__button')) return;
    chooseRadio(evt);
  });

  sizeList.addEventListener('click', function (evt) {
    if (!evt.target.closest('.size-list__image')) return;
    chooseRadio(evt);
  });

  decorList.addEventListener('click', function (evt) {
    if (!evt.target.closest('.decor-list__item')) return;
    chooseRadio(evt);
  });
})();
