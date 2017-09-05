'use strict';
(function () {
  // Creating variables & functions for task

  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = noticeForm.querySelector('.form__submit');

  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');

  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  // Functions for selecting time-in & time-out
  var onTimeInChange = function (evt) {
    timeOut.value = evt.currentTarget.value;
  };

  var onTimeOutChange = function (evt) {
    timeIn.value = evt.currentTarget.value;
  };

  // Numbers in the array show how many options will be displayed in the list of capacity for select.
  var capacitySettings = {
    rooms1: ['1'],
    rooms2: ['2', '1'],
    rooms3: ['3', '2', '1'],
    rooms100: ['0']
  };
  // Function-handler for selecting the number of guests
  var onCapacityChange = function (evt) {
    var capacitySetElement = 'rooms' + evt.currentTarget.value;
    for (var p = 0; p < capacity.options.length; p++) {
      var optionsToShow = capacitySettings[capacitySetElement];
      var optionValue = capacity.options[p].value;
      var selectedOption;
      capacity.options[p].hidden = optionsToShow.indexOf(optionValue) === -1;
      if (optionsToShow[0] === optionValue) {
        selectedOption = p;
      }
    }
    capacity.options[selectedOption].selected = true;
  };

  // Function selecting min price for each type of lodging
  var onMinPriceSelect = function (evt) {
    var selectedOption = evt.currentTarget.value;
    var minPrice = 0;

    if (selectedOption === 'flat') {
      minPrice = 1000;
    } else if (selectedOption === 'house') {
      minPrice = 5000;
    } else if (selectedOption === 'palace') {
      minPrice = 10000;
    }

    price.min = minPrice;
    price.value = minPrice;
  };

  var checkValidField = function (field) {
    field.style.borderColor = '';

    if (!field.validity.valid) {
      field.style.borderColor = '#ff0000';
    }
  };

  var onSubmitClick = function () {
    checkValidField(title);
    checkValidField(address);
    checkValidField(price);
  };

  var onValuesDefault = function () {
    timeIn.removeEventListener('change', onTimeInChange);
    timeOut.removeEventListener('change', onTimeOutChange);
    roomNumber.removeEventListener('change', onCapacityChange);
    type.removeEventListener('change', onMinPriceSelect);
    formSubmit.removeEventListener('click', onSubmitClick);
  };

  timeIn.addEventListener('change', onTimeInChange);

  timeOut.addEventListener('change', onTimeOutChange);

  roomNumber.addEventListener('change', onCapacityChange);

  type.addEventListener('change', onMinPriceSelect);

  formSubmit.addEventListener('click', onSubmitClick);

  formSubmit.addEventListener('submit', onValuesDefault);

})();
