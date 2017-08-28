'use strict';

// Creating objects, variables & functions

var advertsAmount = 8; // Amount of adverts
var advert = {}; // Object 'advert'

var AVATAR_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];

var TITLE = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде']; // Second-order property of object 'offer'

var priceMin = 1000;
var priceMax = 1000000;

var locationXMin = 300;
var locationXMax = 900;
var locationYMin = 100;
var locationYMax = 500;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var typeMin = 0;
var typeMax = 2;
var TYPE = ['flat', 'house', 'bungalow']; // Second-order property of object 'offer'

var roomsMin = 1;
var roomsMax = 5;

var guestsMin = 1;
var guestsMax = 10;

var checkInOutMin = 0;
var checkInOutMax = 2;
var CHECK_IN = ['12:00', '13:00', '14:00']; // Array of second-order properties of object 'offer'
var CHECK_OUT = ['12:00', '13:00', '14:00'];

var featuresMin = 0;
var featuresMax = 5;
var FEATURES = ['wifi',
  'dish washer',
  'parking',
  'washer',
  'elevator',
  'conditioner']; // Array of second-order properties of object 'offer'

// Random function declaration

function randomInt(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Creating array of adverts

for (var k = 0; k < advertsAmount; k++) {
  advert[k] = {
    'author': { // First-order property of object 'advert[i]
      'avatar': 'img/avatars/user' + AVATAR_NUMBER[k] + '.png'
    },
    'offer': { // First-order property of object 'advert[i]
      'title': TITLE[k], // Second-order property of object 'offer'
      'address': 'location.x,' + 'location.y', // ????????
      'price': randomInt(priceMin, priceMax),
      'type': TYPE[randomInt(typeMin, typeMax)],
      'rooms': randomInt(roomsMin, roomsMax),
      'guests': randomInt(guestsMin, guestsMax),
      'checkIn': CHECK_IN[randomInt(checkInOutMin, checkInOutMax)],
      'checkOut': CHECK_OUT[randomInt(checkInOutMin, checkInOutMax)],
      'features': FEATURES.slice(randomInt(featuresMin, featuresMax)),
      'description': '',
      'photos': []
    },
    'location': { // First-order property of object 'advert[i]
      'x': randomInt(locationXMin, locationXMax),
      'y': randomInt(locationYMin, locationYMax)
    }
  };
}

// Creating DOM-elements for marks 'pins' in map

var pinMap = document.querySelector('.tokyo__pin-map');

var createPins = function () {
  var fragment = document.createDocumentFragment();
  for (var m = 0; m < advertsAmount; m++) {
    var newPin = document.createElement('div');
    newPin.className = 'pin';
    newPin.style.left = advert[m].location.x + PIN_WIDTH / 2 + 'px';
    newPin.style.top = advert[m].location.y + PIN_HEIGHT + 'px';
    newPin.innerHTML = '<img src = "' + advert[m].author.avatar +
      '" class = "rounded" width = "40" height = "40">';
    fragment.appendChild(newPin);
  }
  pinMap.appendChild(fragment);
};
createPins();

// Creating DOM-element with #lodge-template and first element of 'advert' objects

var lodgeTemplate = document.querySelector('#lodge-template').content;
var newDialog = document.querySelector('.dialog');
var newDialogPanel = newDialog.querySelector('.dialog__panel');

var apartType = {
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало'
};
//
var formDialogPanel = function (number) {
  var lodgeWindow = lodgeTemplate.cloneNode(true);

  lodgeWindow.querySelector('.lodge__title').textContent = advert[number].offer.title;
  lodgeWindow.querySelector('.lodge__address').textContent = advert[number].location.x + ', ' + advert[number].location.y;
  lodgeWindow.querySelector('.lodge__price').innerHTML = advert[number].offer.price + ' &#x20bd;/ночь';
  lodgeWindow.querySelector('.lodge__type').textContent = apartType[advert[number].offer.type];
  lodgeWindow.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert[number].offer.guests + ' гостей в ' + advert[number].offer.rooms + ' комнатах';
  lodgeWindow.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert[number].offer.checkIn + ', выезд до ' + advert[number].offer.checkOut;
  lodgeWindow.querySelector('.lodge__description').textContent = advert[number].offer.description;
  var features = document.createDocumentFragment();
  for (var b = 0; b < advert[number].offer.features.length; b++) {
    var feature = document.createElement('span');
    feature.className = 'feature__image  feature__image--' + advert[number].offer.features[b];
    features.appendChild(feature);
  }
  lodgeWindow.querySelector('.lodge__features').appendChild(features);
  newDialog.querySelector('.dialog__title img').src = advert[number].author.avatar;

  return lodgeWindow;
};
newDialog.removeChild(newDialogPanel); // removing default dialog panel
newDialog.appendChild(formDialogPanel(0));
