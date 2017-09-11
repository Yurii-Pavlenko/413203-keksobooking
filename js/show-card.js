'use strict';
(function () {
  /* Showing advert panel depending of choosing pin  */
  window.showCard = function (part) {
    var imgSrc = part.src;
    var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));

    var sortOut = function (item, i) {
      if (imgAddress === item.author.avatar) {
        window.card.formDialogPanel(i);
      }
    };

    window.map.similarAdverts.forEach(sortOut);
  };
})();
