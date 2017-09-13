'use strict';
(function () {
  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;
  var START_PINS_AMOUNT = 3;
  var renderableAdverts = [];
  var mainDialog = document.querySelector('#offer-dialog');
  var pinsInMap = document.querySelector('.tokyo__pin-map');
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

  /* Deactivate pin */
  var removePinActive = function () {
    var pinsActive = document.querySelectorAll('.pin--active');
    window.util.forEach(pinsActive, function (elem) {
      if (elem.classList.contains('pin--active')) {
        elem.classList.remove('pin--active');
      }
    });
  };
  /* Removing panel */
  var removePanel = function () {
    hideElement(window.map.mainDialog);
    removePinActive();
  };

  /* Cross click handler*/
  var onCrossClick = function () {
    window.map.removePanel();
  };
  /* Hide element */
  var hideElement = function (evt) {
    evt.classList.add('hidden');
  };

  /* Esc button handler */
  var onEscButtonPush = function (evt) {
    if (evt.keyCode === window.map.KEY_ESCAPE) {
      window.map.removePanel();
      pinsInMap.removeEventListener('keydown', onEscButtonPush);
    }
  };

  /* Activate dialog */
  var activateDialog = function (evt) {
    window.showCard(renderableAdverts[evt.currentTarget.dataset.index]);
    removePinActive();
    evt.currentTarget.classList.add('pin--active');
    pinsInMap.addEventListener('keydown', onEscButtonPush);
  };

  /* Pin click handler */
  var onPinClick = function (evt) {
    activateDialog(evt);
    pinsInMap.addEventListener('keydown', onEscButtonPush);
  };

  /* ENTER button handler */
  var onEnterButtonPush = function (evt) {
    if (evt.keyCode === window.map.KEY_ENTER) {
      activateDialog(evt);
    }
    pinsInMap.addEventListener('keydown', onEscButtonPush);
  };

  dialogClose.addEventListener('click', onCrossClick);
  dialogClose.addEventListener('keydown', onEscButtonPush);

  /* render not all pins, only choosed */
  var renderPins = function (data) {
    if (data !== 'undefined') {
      renderableAdverts = data;
      var fragment = document.createDocumentFragment();
      data.forEach(function (elem, id) {
        fragment.appendChild(window.pin.createPin(elem, id));
      });
      pinsInMap.appendChild(fragment);
      var pins = pinsInMap.querySelectorAll('.pin');
      window.util.forEach(pins, function (elem) {
        if (!elem.classList.contains('pin__main')) {
          elem.addEventListener('click', onPinClick);
          elem.addEventListener('keydown', onEnterButtonPush);
        }
      });
    }
  };

  /* Render three pins in map using loaded data */
  var onLoadSuccess = function (data) {
    var randomElements = window.util.getRandomPins(data, START_PINS_AMOUNT);
    renderPins(randomElements);
  };

  /* Loading data from the external source */
  window.backend.load(onLoadSuccess, window.backend.onError);

  /* Dragging Main Pin handler */
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

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    renderPins: renderPins,
    KEY_ENTER: KEY_ENTER,
    KEY_ESCAPE: KEY_ESCAPE,
    mainDialog: mainDialog,
    removePanel: removePanel
  };

})();
