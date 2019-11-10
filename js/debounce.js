'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;
  var currentPage = 'filter-popular';

  window.debounce = function (cb, nextPage) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    if (currentPage !== nextPage) {
      lastTimeout = window.setTimeout(function () {
        cb();
        currentPage = nextPage;
      }, DEBOUNCE_INTERVAL);
    } else {
      lastTimeout = null;
    }
  };
})();
