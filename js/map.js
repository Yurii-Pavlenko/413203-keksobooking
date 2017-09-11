'use strict';
(function () {
  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;

  var mainDialog = document.querySelector('#offer-dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var mainPin = document.querySelector('.pin__main');
  var MAIN_PIN_WIDTH = 75;
  var MAIN_PIN_HEIGHT = 70;

  var locationXmin = 300;
  var locationXmax = 900;
  var locationYmin = 100;
  var locationYmax = 500;

  var minPositionX = locationXmin - Math.floor(MAIN_PIN_WIDTH / 2);
  var maxPositionX = locationXmax + Math.floor(MAIN_PIN_WIDTH / 2);
  var minPositionY = locationYmin + MAIN_PIN_HEIGHT;
  var maxPositionY = locationYmax + MAIN_PIN_HEIGHT;

  var pinsInMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  window.map = {
    similarAdverts: []
  };

  /* Generate new pins in map using loaded data */
  var onLoadSuccess = function (data) {
    if (data !== 'undefined') {
      for (var i = 0; i < data.length; i++) {
        window.pin.createPin(data[i], fragment, i);
      }
      pinsInMap.appendChild(fragment);
      window.map.similarAdverts = data;
    }
  };

  /* Loading data from the external source */
  window.backend.load(onLoadSuccess, window.backend.onError);

  var hideDialog = function (dialog) {
    dialog.classList.add('hidden');
  };

  var removePanel = function () {
    hideDialog(mainDialog);
    window.pin.removePinActive();
  };

  var onEnterButtonPush = function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      window.pin.activateDialog(evt);
    }
  };

  var onCrossClick = function () {
    removePanel();
  };

  var onEscButtonPush = function (evt) {
    if (evt.keyCode === KEY_ESCAPE) {
      removePanel();
    }
  };

  var onMainPinMouseDown = function (downEvt) {
    downEvt.preventDefault();
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var positionX = mainPin.offsetLeft - shift.x;
      var positionY = mainPin.offsetTop - shift.y;

      mainPin.style.left = positionX + 'px';
      mainPin.style.top = positionY + 'px';

      if (positionX <= minPositionX) {
        mainPin.style.left = minPositionX + 'px';
      }
      if (positionX >= maxPositionX) {
        mainPin.style.left = maxPositionX + 'px';
      }
      if (positionY <= minPositionY) {
        mainPin.style.top = minPositionY + 'px';
      }
      if (positionY >= maxPositionY) {
        mainPin.style.top = maxPositionY + 'px';
      }

      window.form.address.value = (positionX + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (positionY + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinsInMap.addEventListener('keydown', onEnterButtonPush);
  pinsInMap.addEventListener('keydown', onEscButtonPush);
  dialogClose.addEventListener('click', onCrossClick);

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
