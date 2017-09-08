'use strict';
(function () {
  var pinsInMap = document.querySelector('.tokyo__pin-map');
  var PIN_WIDTH = 55;
  var PIN_HEIGHT = 75;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;
  var mapWithPins = [];

  var createPins = function (advert) { // function creating new pins
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < window.data.advertsAmount; m++) {
      var newPin = document.createElement('div');
      newPin.className = 'pin';
      newPin.style.left = advert[m].location.x + PIN_WIDTH / 2 + 'px';
      newPin.style.top = advert[m].location.y + PIN_HEIGHT + 'px';
      var newPinImg = document.createElement('img');
      newPinImg.src = advert[m].author.avatar + '';
      newPinImg.className = 'rounded';
      newPinImg.width = PIN_IMG_WIDTH;
      newPinImg.height = PIN_IMG_HEIGHT;
      newPinImg.tabIndex = 0;

      newPin.appendChild(newPinImg);

      fragment.appendChild(newPin);
    }
    pinsInMap.appendChild(fragment);
    return pinsInMap;
  };
  /*

  for (var i = 0; i < window.data.advertsAmount; i++) {
    mapWithPins[i] = createPins(window.data.advertsList[i]);
  }
*/

  mapWithPins = createPins(window.data.advertsList);

  var showDialog = function (dialog) {
    dialog.classList.remove('hidden');
  };

  var onPinClick = function (evt) {
    window.pin.activateDialog(evt);
  };

  mapWithPins.addEventListener('click', onPinClick);

  window.pin = {
    mapWithPins: mapWithPins,
    removePinActive: function () {
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    },
    activateDialog: function (evt) {
      var target = evt.target;

      if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
        window.pin.removePinActive();
        target.parentNode.classList.add('pin--active');
        window.showCard(target);
        showDialog(window.card.mainDialog);
      }
    }
  };
})();
