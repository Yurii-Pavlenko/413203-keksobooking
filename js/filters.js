'use strict';
window.filter = (function () {
  var pinsInMap = document.querySelector('.tokyo__pin-map');
  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingRooms = filtersForm.querySelector('#housing_room-number');
  var housingGuests = filtersForm.querySelector('#housing_guests-number');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var housingFeatures = filtersForm.querySelectorAll('.feature input');
  var adverts = [];

  /* Remove all pins except main pin */
  function removePins() {
    var pins = pinsInMap.querySelectorAll('.pin');
    window.util.forEach(pins, function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.remove();
      }
    });
  }

  /* Filter by type of housing */
  var filterByType = function (elem) {
    return housingType.value === 'any' ? adverts : elem.offer.type === housingType.value;
  };

  /* Filter by quantity of rooms */
  var filterByRoomsCount = function (elem) {
    return housingRooms.value === 'any' ? adverts : elem.offer.rooms === Number(housingRooms.value);
  };

  /* Filter by price */
  var filterByPrice = function (elem) {
    switch (housingPrice.value) {
      case 'any':
        return adverts;
      case 'middle':
        return elem.offer.price >= 10000 && elem.offer.price <= 50000;
      case 'low':
        return elem.offer.price < 10000;
      case 'high':
        return elem.offer.price > 50000;
      default:
        return false;
    }
  };


  /* Filter by quantity of guests */
  var filterByGuestsCount = function (elem) {
    return housingGuests.value === 'any' ? adverts : elem.offer.guests === Number(housingGuests.value);
  };

  /* Filter by features */
  var filterByFeatures = function (elem) {
    var featureCheckedCheckboxes = filtersForm.querySelectorAll('.feature input[type="checkbox"]:checked');
    var checkedFeatures = Array.prototype.map.call(featureCheckedCheckboxes, function (checkbox) {
      return checkbox.value;
    });
    return checkedFeatures.every(function (feature) {
      return elem.offer.features.indexOf(feature) > -1;
    });
  };

  var filteringFucntions = [filterByType, filterByRoomsCount, filterByPrice, filterByGuestsCount, filterByFeatures];

  /* Function filters adverts and sends to render */
  var updatePins = function () {
    removePins();
    window.map.removePanel();
    var filteredData = filteringFucntions.reduce(function (initial, elem) {
      return initial.filter(elem);
    }, adverts);
    window.map.renderPins(filteredData);
  };

  var filters = document.querySelectorAll('.tokyo__filter');

  window. util.forEach(filters, function (elem) {
    elem.addEventListener('change', window.util.debounce(updatePins));
  });

  window.util.forEach(housingFeatures, function (elem) {
    elem.addEventListener('change', window.util.debounce(updatePins));
  });

  var onLoadSuccess = function (data) {
    adverts = data;
  };

  window.backend.load(onLoadSuccess, window.backend.onError);

})();
