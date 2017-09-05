'use strict';
(function () {
  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;
  var dialogClose = window.card.mainDialog.querySelector('.dialog__close');

  var hideDialog = function (dialog) {
    dialog.classList.add('hidden');
  };

  var removePanel = function () {
    hideDialog(window.card.mainDialog);
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

  window.pin.mapWithPins.addEventListener('keydown', onEnterButtonPush);
  window.pin.mapWithPins.addEventListener('keydown', onEscButtonPush);
  dialogClose.addEventListener('click', onCrossClick);
})();
