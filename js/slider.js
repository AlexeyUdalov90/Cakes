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
      var startCoordX = evt.changedTouches[0].clientX;
      var moveCoordX;

      block.ontouchmove = function (evt) {
        moveCoordX = evt.changedTouches[0].clientX;
      }

      block.ontouchend = function (evt) {
        var MIN_DISTANCE_MOVE = 30;
        var distanceMove = startCoordX - moveCoordX;

        if (distanceMove < 0) distanceMove = -distanceMove;
        if (distanceMove > MIN_DISTANCE_MOVE) {
          if (startCoordX > moveCoordX) {
            self._pos = Math.min(self._pos + self._amount, self._slides.length - self._amount);
          } else if (startCoordX < moveCoordX) {
            self._pos = Math.max(self._pos - self._amount, 0);
          }
          self._setTransform();
        };
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
    var maxLeft = this._list.scrollWidth - slideWidth;

    if (maxLeft < this._pos * slideWidth) {
      this._list.style.left = -maxLeft + 'px';
      this._setAmount(this._sliderAmount, this._pos - this._amount, this._slides.length);
    } else {
      this._list.style.left = -this._pos * slideWidth + 'px';
      this._setAmount(this._sliderAmount, this._pos + this._amount, this._slides.length);
    }
  };

  for (var i = 0; i < sliders.length; i++) {
    new Slider(sliders[i]);
  }
})();
