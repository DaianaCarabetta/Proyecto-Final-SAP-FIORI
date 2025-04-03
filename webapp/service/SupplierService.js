sap.ui.define([
  "../helper/FilterHelper"
], function(FilterHelper) {
  "use strict";

  return {
    filterVendors: function(oTable, sCompanyQuery, sCountryQuery) {
      var aFilters = FilterHelper.buildSupplierFilters(sCompanyQuery, sCountryQuery);
      var oBinding = oTable.getBinding("rows");
      if (oBinding) {
        var fnDataRequested = function() {
          oTable.setBusy(true);
        };
        var fnDataReceived = function() {
          oTable.setBusy(false);
          oBinding.detachDataRequested(fnDataRequested);
          oBinding.detachDataReceived(fnDataReceived);
        };
        oBinding.attachDataRequested(fnDataRequested);
        oBinding.attachDataReceived(fnDataReceived);
        oBinding.filter(aFilters, "Application");
      }
    },
    selectSupplier: function(oEvent, oTable, oRouter) {
      var oButton = oEvent.getSource();
      var oContext = oButton.getBindingContext();
      if (!oContext) {
        return;
      }
      oTable.setBusy(true);
      var supplierId = oContext.getProperty("SupplierID");
      oRouter.navTo("supplierDetail", { supplierId: supplierId });
    },
    _getSupplierIdFromContextPath: function(sPath) {
      var supplierIdMatch = sPath.match(/\d+/);
      return supplierIdMatch ? supplierIdMatch[0] : null;
    }
  };
});
