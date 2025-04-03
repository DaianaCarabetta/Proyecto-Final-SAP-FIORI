sap.ui.define([], function () {
  "use strict";
  return {
    formatPriceWithSymbol: function (sValue) {
      if (!sValue) {
        return "";
      }
      var fValue = parseFloat(sValue).toFixed(2);
      return "$ " + fValue;
    }
  };
});
