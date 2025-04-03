sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "../service/SupplierService"
], function (Controller, SupplierService) {
  "use strict";

  return Controller.extend("finalproject.controller.Home", {
    onInit: function () {
      this._dialog = null;
      this._busyEventsAttached = false;
      var oTable = this.byId("vendorTable");
      if (oTable) {
        oTable.setBusyIndicatorDelay(0);
        oTable.setBusy(true);
      }
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      if (oRouter && oRouter.getRoute("RouteHome")) {
        oRouter.getRoute("RouteHome").attachPatternMatched(this._onRouteMatched, this);
      }
    },

    _onRouteMatched: function () {
      var oTable = this.byId("vendorTable");
      if (oTable) {
        var oBinding = oTable.getBinding("rows");
        if (oBinding && oBinding.getLength() > 0) {
          oTable.setBusy(false);
        } else {
          oTable.setBusy(true);
        }
      }
    },

    onAfterRendering: function () {
      var oTable = this.byId("vendorTable");
      if (oTable && !this._busyEventsAttached) {
        var oBinding = oTable.getBinding("rows");
        if (oBinding) {
          oBinding.attachDataRequested(function () {
            oTable.setBusy(true);
          });
          oBinding.attachDataReceived(function () {
            oTable.setBusy(false);
          });
          this._busyEventsAttached = true;
        }
      }
    },

    onFilter: function () {
      SupplierService.filterVendors(
        this.byId("vendorTable"),
        this.byId("filterCompany").getValue(),
        this.byId("filterCountry").getValue()
      );
    },

    onSelectSupplier: function (oEvent) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      SupplierService.selectSupplier(oEvent, this.byId("vendorTable"), oRouter);
    }
  });
});
