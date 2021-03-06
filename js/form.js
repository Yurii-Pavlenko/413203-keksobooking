'use strict';
(function () {

  /* Creating variables & functions*/
  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = noticeForm.querySelector('.form__submit');

  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');

  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  var roomNumber = noticeForm.querySelector('#room_number');
  var roomNumberOptions = roomNumber.options;
  var capacity = noticeForm.querySelector('#capacity');
  var capacityOptions = capacity.options;

  var LOGING_MIN_PRICE = ['0', '1000', '5000', '10000'];

  /* Synchronize timeIn & timeOut*/

  var syncValues = function (field1, field2) {
    field2.options.selectedIndex = field1.options.selectedIndex;
  };

  /* Choosing min price*/
  var checkMinPrice = function (num) {
    price.value = num;
  };

  /* Synchronize min price with housing type*/
  var syncValueWithMin = function (loging, cost) {
    switch (loging.selectedIndex) {
      case 0:
        cost.setAttribute('min', LOGING_MIN_PRICE[1]);
        checkMinPrice(LOGING_MIN_PRICE[1]);
        break;
      case 1:
        cost.setAttribute('min', LOGING_MIN_PRICE[0]);
        checkMinPrice(LOGING_MIN_PRICE[0]);
        break;
      case 2:
        cost.setAttribute('min', LOGING_MIN_PRICE[2]);
        checkMinPrice(LOGING_MIN_PRICE[2]);
        break;
      case 3:
        cost.setAttribute('min', LOGING_MIN_PRICE[3]);
        checkMinPrice(LOGING_MIN_PRICE[3]);
        break;
    }
  };

  /* Removing hidden attribute */
  var removeDisabledAttribute = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].removeAttribute('hidden');
    }
  };

  /* Synchronize rooms number with guests capacity */
  var syncValueWithCapacity = function (rooms, guests) {
    switch (rooms.selectedIndex) {
      // 1 room
      case 0:
        removeDisabledAttribute();
        for (var i = 0; i < guests.length; i++) {
          if (guests[i].value !== '1') {
            guests[i].setAttribute('hidden', 'hidden');
          }
        }
        guests.selectedIndex = 2;
        break;
      // 2 rooms
      case 1:
        removeDisabledAttribute();
        for (i = 0; i < guests.length; i++) {
          if (guests[i].value > 2 || guests[i].value === '0') {
            guests[i].setAttribute('hidden', 'hidden');
          }
        }
        guests.selectedIndex = 1;
        break;
      // 3 rooms
      case 2:
        removeDisabledAttribute();
        guests[3].setAttribute('hidden', 'hidden');
        guests.selectedIndex = 0;
        break;
      // 100 rooms
      case 3:
        removeDisabledAttribute();
        for (i = 0; i < guests.length; i++) {
          if (guests[i].value !== '0') {
            guests[i].setAttribute('hidden', 'hidden');
          }
        }
        guests.selectedIndex = 3;
        break;
    }
  };

  /* Event handlers */
  var onTimeInChange = function () {
    window.synchronizeFields(timeIn, timeOut, syncValues);
  };

  var onTimeOutChange = function () {
    window.synchronizeFields(timeOut, timeIn, syncValues);
  };

  var onCapacityChange = function () {
    window.synchronizeFields(roomNumberOptions, capacityOptions, syncValueWithCapacity);
  };

  var onMinPriceSelect = function () {
    window.synchronizeFields(type, price, syncValueWithMin);
  };

  /* Filds validation */
  var checkValidField = function (field) {
    field.style.borderColor = '';

    if (!field.validity.valid) {
      field.style.borderColor = '#ff0000';
    }
  };

  /* Handler for submit button */
  var onSubmitClick = function () {
    checkValidField(title);
    checkValidField(address);
    checkValidField(price);
  };

  /* Reset settings to default */
  var onValuesDefault = function () {
    timeIn.removeEventListener('change', onTimeInChange);
    timeOut.removeEventListener('change', onTimeOutChange);
    roomNumber.removeEventListener('change', onCapacityChange);
    type.removeEventListener('change', onMinPriceSelect);
    formSubmit.removeEventListener('click', onSubmitClick);
  };

  var resetNoticeForm = function () {
    noticeForm.reset();
  };

  /* Sending form */
  var onNoticeFormSubmit = function (evt) {
    window.backend.save(new FormData(noticeForm), resetNoticeForm, window.backend.onError);
    evt.preventDefault();
  };

  timeIn.addEventListener('change', onTimeInChange);

  timeOut.addEventListener('change', onTimeOutChange);

  roomNumber.addEventListener('change', onCapacityChange);

  type.addEventListener('change', onMinPriceSelect);

  formSubmit.addEventListener('click', onSubmitClick);

  formSubmit.addEventListener('submit', onValuesDefault);

  noticeForm.addEventListener('submit', onNoticeFormSubmit);

  window.form = {
    address: address
  };

})();
