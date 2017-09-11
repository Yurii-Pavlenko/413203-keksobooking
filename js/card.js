'use strict';
(function () {
  var mainDialog = document.querySelector('.dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var apartType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
  };

  /* Form generate new advert panel*/

  var formDialogPanel = function (number) {
    var advert = window.map.similarAdverts[number];
    var lodgeWindow = lodgeTemplate.cloneNode(true);
    lodgeWindow.querySelector('.lodge__title').textContent = advert.offer.title;
    lodgeWindow.querySelector('.lodge__address').textContent = advert.offer.address;
    lodgeWindow.querySelector('.lodge__price').innerHTML = advert.offer.price + ' &#x20bd;/ночь';
    lodgeWindow.querySelector('.lodge__type').textContent = apartType[advert.offer.type];
    lodgeWindow.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
    lodgeWindow.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    lodgeWindow.querySelector('.lodge__description').textContent = advert.offer.description;
    var features = document.createDocumentFragment();
    for (var b = 0; b < advert.offer.features.length; b++) {
      var feature = document.createElement('span');
      feature.className = 'feature__image  feature__image--' + advert.offer.features[b];
      features.appendChild(feature);
    }
    lodgeWindow.querySelector('.lodge__features').appendChild(features);
    mainDialog.querySelector('.dialog__title img').src = advert.author.avatar;
    var dialogPanel = mainDialog.querySelector('.dialog__panel');
    mainDialog.replaceChild(lodgeWindow, dialogPanel);
  };
  window.card = {
    mainDialog: mainDialog,
    formDialogPanel: formDialogPanel
  };
})();
