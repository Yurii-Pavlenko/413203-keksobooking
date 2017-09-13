'use strict';
(function () {
  window.util = {

    DEBOUNCE_INTERVAL: 500,

    /* Return some(count) random elements from array(data) */
    getRandomPins: function (data, count) {
      var result = [];
      var copy = data.slice();
      for (var i = 0; i < count; i++) {
        var randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
      }
      return result;
    },

    /* Sort out Array.prototype */
    forEach: function (arr, func) {
      Array.prototype.forEach.call(arr, func);
    },

    /* Renew list of elemnts once in 0.5 sec */
    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        if (lastTimeout !== null) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(fun, window.util.DEBOUNCE_INTERVAL);
      };
    }
  };
})();
