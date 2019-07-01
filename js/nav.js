'use strict';

(function () {
  var navHeader = document.querySelector('.page-header__nav');
  var navLists = document.querySelectorAll('.main-nav__list');
  var navButton = navHeader.querySelector('.main-nav__button');
  var speed = 0.3;

  navHeader.classList.remove('main-nav--no-js');

  navButton.addEventListener('click', function () {
    navHeader.classList.toggle('main-nav--show');
  });

  Array.prototype.forEach.call(navLists, function (list) {
    list.addEventListener('click', function (evt) {
      if (!evt.target.closest('.main-nav__link')) return;
      evt.preventDefault();
      var windowScroll = window.pageYOffset;
      var hash = evt.target.href.replace(/[^#]*(.*)/, '$1');
      var blockTop = document.querySelector(hash).getBoundingClientRect().top;
      var start = null;

      requestAnimationFrame(step);

      if (navHeader.classList.contains('main-nav--show')) {
        navHeader.classList.remove('main-nav--show');
      }

      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start;
        var r = (blockTop < 0 ? Math.max(windowScroll - progress/speed, windowScroll + blockTop) : Math.min(windowScroll + progress/speed, windowScroll + blockTop));
        window.scrollTo(0, r);
        if (r !== windowScroll + blockTop) {
            requestAnimationFrame(step);
        } else {
            location.hash = hash;
        }
      }
    });
  });
})();
