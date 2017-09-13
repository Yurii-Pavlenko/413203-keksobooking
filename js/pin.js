'use strict';
(function () {

  var PIN_WIDTH = 55;
  var PIN_HEIGHT = 75;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;

  /* Creating pins */
  window.pin = {
    createPin: function (advert, id) { // Function for creating new pins
      var newPin = document.createElement('div');
      var newPinImg = document.createElement('img');
      newPin.appendChild(newPinImg);
      newPin.classList.add('pin');
      newPin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
      newPin.style.top = advert.location.y - PIN_HEIGHT + 'px';
      newPinImg.tabIndex = 0;
      newPinImg.src = advert.author.avatar;
      newPinImg.classList.add('rounded');
      newPinImg.width = PIN_IMG_WIDTH;
      newPinImg.height = PIN_IMG_HEIGHT;
      newPin.dataset.index = id;
      return newPin;
    }
  };
})();
