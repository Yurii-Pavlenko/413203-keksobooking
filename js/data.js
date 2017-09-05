'use strict';
(function () {
  /*

   Creating objects, variables & functions
  */

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

  var createAdverts = function () {
    var advertsList = [];

    for (var k = 0; k < advertsAmount; k++) {
      advert[k] = {
        'author': { // First-order property of object 'advert[i]
          'avatar': 'img/avatars/user' + AVATAR_NUMBER[k] + '.png'
        },
        'offer': { // First-order property of object 'advert[i]
          'title': TITLE[k], // Second-order property of object 'offer'
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
      advert[k].offer.address = advert[k].location.x + ', ' + advert[k].location.y;
      advertsList[k] = advert[k];
    }
    return advertsList;
  };

  var adverts = createAdverts();

  window.data = {
    advertsList: adverts,
    advertsAmount: 8
  };

})();
