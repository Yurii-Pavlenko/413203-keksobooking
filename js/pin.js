'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var mainDialog = document.querySelector('#offer-dialog');
  var PIN_WIDTH = 55;
  var PIN_HEIGHT = 75;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;

  var showDialog = function (dialog) {
    dialog.classList.remove('hidden');
  };

  var onPinClick = function (evt) {
    window.pin.activateDialog(evt);
  };

  pinMap.addEventListener('click', onPinClick);


  window.pin = {
    createPin: function (advert, fragment, id) { // Function for creating new pins

      var newPin = document.createElement('div');
      if (typeof id !== 'undefined') {
        newPin.dataset.id = id;
      }
      newPin.className = 'pin';
      newPin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
      newPin.style.top = advert.location.y - PIN_HEIGHT + 'px';
      var newPinImg = document.createElement('img');
      newPinImg.src = advert.author.avatar + '';
      newPinImg.className = 'rounded';
      newPinImg.width = PIN_IMG_WIDTH;
      newPinImg.height = PIN_IMG_HEIGHT;
      newPinImg.tabIndex = 0;

      newPin.appendChild(newPinImg);

      fragment.appendChild(newPin);
    },
    removePinActive: function () { // Deactivate pin
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    },

    activateDialog: function (evt) { // Activate advert panel of choosed pin
      var target = evt.target;

      if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
        window.pin.removePinActive();
        target.parentNode.classList.add('pin--active');
        window.showCard(target);
        showDialog(mainDialog);
      }
    }
  };
})();
