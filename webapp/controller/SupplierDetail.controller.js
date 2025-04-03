sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../service/SupplierDetailService",
    "../util/Formatter"
  ], function (Controller, SupplierDetailService, Formatter) {
    "use strict";
  
    return Controller.extend("finalproject.controller.SupplierDetail", {
      formatter: Formatter,

      onInit: function () {
        SupplierDetailService.initialize(this);
      },
  
      onSelectProduct: function (oEvent) {
        SupplierDetailService.onSelectProduct(oEvent, this.getView(), this);
      },
  
      onCloseProductDialog: function () {
        SupplierDetailService.onCloseProductDialog();
      },
  
      onOpenNewProductDialog: function () {
        SupplierDetailService.onOpenNewProductDialog(this.getView(), this);
      },
  
      onCloseAddProductDialog: function () {
        SupplierDetailService.onCloseAddProductDialog();
      },
  
      onPressSaveData: function () {
        SupplierDetailService.onPressSaveData(this.getView());
      }
    });
  });
  