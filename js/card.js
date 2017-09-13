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

  var formDialogPanel = function (generatedAdvertPanel) {
    var dialogPanel = mainDialog.querySelector('.dialog__panel');
    var lodgeWindow = lodgeTemplate.cloneNode(true);
    mainDialog.replaceChild(lodgeWindow, dialogPanel);
    mainDialog.querySelector('.lodge__title').textContent = generatedAdvertPanel.offer.title;
    mainDialog.querySelector('.lodge__address').textContent = generatedAdvertPanel.offer.address;
    mainDialog.querySelector('.lodge__price').innerHTML = generatedAdvertPanel.offer.price + ' &#x20bd;/ночь';
    mainDialog.querySelector('.lodge__type').textContent = apartType[generatedAdvertPanel.offer.type];
    mainDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + generatedAdvertPanel.offer.guests + ' гостей в ' + generatedAdvertPanel.offer.rooms + ' комнатах';
    mainDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + generatedAdvertPanel.offer.checkin + ', выезд до ' + generatedAdvertPanel.offer.checkout;
    mainDialog.querySelector('.lodge__description').textContent = generatedAdvertPanel.offer.description;
    var features = document.createDocumentFragment();
    for (var b = 0; b < generatedAdvertPanel.offer.features.length; b++) {
      var feature = document.createElement('span');
      feature.className = 'feature__image  feature__image--' + generatedAdvertPanel.offer.features[b];
      features.appendChild(feature);
    }
    mainDialog.querySelector('.lodge__features').appendChild(features);
    mainDialog.querySelector('.dialog__title').querySelector('img').src = generatedAdvertPanel.author.avatar;
  };
  window.card = {
    formDialogPanel: formDialogPanel
  };
})();
