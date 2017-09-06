'use strict';
(function () {
  var mainDialog = document.querySelector('.dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var apartType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
  };

  var formDialogPanel = function (number) {

    var lodgeWindow = lodgeTemplate.cloneNode(true);
    lodgeWindow.querySelector('.lodge__title').textContent = window.data.advertsList[number].offer.title;
    lodgeWindow.querySelector('.lodge__address').textContent = window.data.advertsList[number].location.x + ', ' + window.data.advertsList[number].location.y;
    lodgeWindow.querySelector('.lodge__price').innerHTML = window.data.advertsList[number].offer.price + ' &#x20bd;/ночь';
    lodgeWindow.querySelector('.lodge__type').textContent = apartType[window.data.advertsList[number].offer.type];
    lodgeWindow.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + window.data.advertsList[number].offer.guests + ' гостей в ' + window.data.advertsList[number].offer.rooms + ' комнатах';
    lodgeWindow.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + window.data.advertsList[number].offer.checkIn + ', выезд до ' + window.data.advertsList[number].offer.checkOut;
    lodgeWindow.querySelector('.lodge__description').textContent = window.data.advertsList[number].offer.description;
    var features = document.createDocumentFragment();
    for (var b = 0; b < window.data.advertsList[number].offer.features.length; b++) {
      var feature = document.createElement('span');
      feature.className = 'feature__image  feature__image--' + window.data.advertsList[number].offer.features[b];
      features.appendChild(feature);
    }
    lodgeWindow.querySelector('.lodge__features').appendChild(features);
    mainDialog.querySelector('.dialog__title img').src = window.data.advertsList[number].author.avatar;
    var dialogPanel = mainDialog.querySelector('.dialog__panel');
    mainDialog.replaceChild(lodgeWindow, dialogPanel);
  };
  window.card = {
    mainDialog: mainDialog,
    formDialogPanel: formDialogPanel
  };
})();
