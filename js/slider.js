'use strict';

(function () {
  var sliders = document.querySelectorAll('.slider');

  function Slider(block) {
    var self = this;
    var wrapper = block.querySelector('.slider__wrapper');
    this._list = block.querySelector('.slider__list');
    this._slides = block.querySelectorAll('.slider__item');
    this._sliderAmount = block.querySelector('.slider__amount');
    this._pos = 0;
    this._slideStyle = getComputedStyle(this._slides[0]);
    this._slideWidth = this._slides[0].offsetWidth + parseFloat(this._slideStyle.marginLeft) + parseFloat(this._slideStyle.marginRight);
    this._amount = Math.floor(wrapper.offsetWidth / this._slideWidth);

    self._setAmount(self._sliderAmount, self._pos + self._amount, self._slides.length);

    block.onclick = function (evt) {
      if (!evt.target.closest('.slider__toggle')) return;
      evt.preventDefault();
      if (evt.target.closest('.slider__toggle--prev')) {
        self._pos = Math.max(self._pos - self._amount, 0);
      } else if (evt.target.closest('.slider__toggle--next')) {
        self._pos = Math.min(self._pos + self._amount, self._slides.length - self._amount);
      }
      self._setTransform();
    };

    block.ontouchstart = function (evt) {
      if (!evt.target.closest('.slider__list')) return;
      evt.preventDefault();
      var startCoord = evt.changedTouches[0].clientX;
      var moveCoord;

      block.ontouchmove = function (evt) {
        moveCoord = evt.changedTouches[0].clientX;
      };

      block.ontouchend = function (evt) {
        evt.preventDefault();
        if (startCoord > moveCoord) {
          self._pos = Math.min(self._pos + self._amount, self._slides.length - self._amount);
        } else if (startCoord < moveCoord) {
          self._pos = Math.max(self._pos - self._amount, 0);
        }
        self._setTransform();
      };
    };
  };

  Slider.prototype._setAmount = function(block, numSlide, amount) {
    if (!block) return;
    if (numSlide > amount) {
      block.textContent = amount + '/' + amount;
    } else {
      block.textContent = numSlide + '/' + amount;
    }
  };

  Slider.prototype._setTransform = function() {
    var slideWidth = this._slides[0].offsetWidth + parseFloat(this._slideStyle.marginLeft) + parseFloat(this._slideStyle.marginRight);
    var maxTranslate = this._list.scrollWidth - slideWidth;

    if (maxTranslate < this._pos * slideWidth) {
      this._list.style.transform = 'translateX(' + (-maxTranslate) + 'px)';
      this._setAmount(this._sliderAmount, this._pos - this._amount, this._slides.length);
    } else {
      this._list.style.transform = 'translateX(' + (-this._pos * slideWidth) + 'px)';
      this._setAmount(this._sliderAmount, this._pos + this._amount, this._slides.length);
    }
  };

  for (var i = 0; i < sliders.length; i++) {
    new Slider(sliders[i]);
  }
})();
