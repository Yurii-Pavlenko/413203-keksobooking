'use strict';
(function () {
  window.showCard = function (part) {
    var imgSrc = part.src;
    var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));
    for (var n = 0; n < window.data.advertsAmount; n++) {
      if (imgAddress === window.data.advertsList[n].author.avatar) {
        window.card.formDialogPanel(n);
      }
    }
  };
})();
