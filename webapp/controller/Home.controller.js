sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "../service/SupplierService"
], function (
  Controller,
  SupplierService
) {
  "use strict";

  return Controller.extend("finalproject.controller.Home", {
    onInit: function () {
      this._dialog = null;
    },

    onFilter: function () {
      SupplierService.filterVendors(
        this.byId("vendorTable"),
        this.byId("filterCompany").getValue(),
        this.byId("filterCountry").getValue()
      );
    },

    onSelectSupplier: function (oEvent) {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      SupplierService.selectSupplier(oEvent, this.byId("vendorTable"), oRouter);
    }
  });
});
