'use strict';
(function () {

  /* Showing advert panel depending of choosing pin  */
  window.showCard = function (data) {
    window.map.mainDialog.classList.remove('hidden');
    window.card.formDialogPanel(data);
  };
})();
