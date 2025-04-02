// webapp/service/SupplierDetailService.js
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (UIComponent, Fragment, JSONModel, MessageBox) {
  "use strict";

  let _productDialog = null;
  let _newProductDialog = null;

  function _bindSupplier(oEvent, oView) {
    const supplierId = oEvent.getParameter("arguments").supplierId;
    const sPath = `/Suppliers(${supplierId})`;
    oView.bindElement({
      path: sPath,
      parameters: {
        expand: "Products"
      }
    });
  }

  async function _openProductDialog(oEvent, oView, oController) {
    if (!_productDialog) {
      _productDialog = await Fragment.load({
        id: oView.getId(),
        name: "finalproject.view.fragments.ProductDetailDialog",
        controller: oController
      });
      oView.addDependent(_productDialog);
    }

    const oContext = oEvent.getSource().getBindingContext();
    if (oContext) {
      _productDialog.setBindingContext(oContext);
      _productDialog.open();
    }
  }

  async function _openNewProductDialog(oView, oController) {
    if (!_newProductDialog) {
      _newProductDialog = await Fragment.load({
        id: oView.getId(),
        name: "finalproject.view.fragments.NewProductDialog",
        controller: oController
      });
      oView.addDependent(_newProductDialog);
    }
    _newProductDialog.open();
  }

  return {

    initialize: function (oController) {
      const oView = oController.getView();
      const oRouter = UIComponent.getRouterFor(oController);
      oRouter.getRoute("supplierDetail").attachPatternMatched((oEvent) => {
        _bindSupplier(oEvent, oView);
      }, this);
      const oNewProductModel = new JSONModel({
        ProductName: "",
        QuantityPerUnit: "",
        UnitPrice: "",
        CategoryID: "",
        Discontinued: false
      });
      oView.setModel(oNewProductModel, "newProduct");
    },

    onSelectProduct: function (oEvent, oView, oController) {
      _openProductDialog(oEvent, oView, oController);
    },

    onOpenNewProductDialog: function (oView, oController) {
      _openNewProductDialog(oView, oController);
    },

    onCloseProductDialog: function () {
      if (_productDialog) {
        _productDialog.close();
      }
    },

    onCloseAddProductDialog: function () {
      if (_newProductDialog) {
        _newProductDialog.close();
      }
    },

    onPressSaveData: function (oView) {
        const oNewProductModel = oView.getModel("newProduct");
        const oData = oNewProductModel.getData();
  
        const oInputProductName = oView.byId("inputProductName");
        const oInputQuantity = oView.byId("inputQuantity");
        const oInputPrice = oView.byId("inputPrice");
        const oInputCategory = oView.byId("inputCategory");
  
        oInputProductName.setValueState("None");
        oInputQuantity.setValueState("None");
        oInputPrice.setValueState("None");
        oInputCategory.setValueState("None");
  
        let bValid = true;
        if (!oData.ProductName) {
          oInputProductName.setValueState("Error");
          bValid = false;
        }
        if (!oData.QuantityPerUnit) {
          oInputQuantity.setValueState("Error");
          bValid = false;
        }
        if (!oData.UnitPrice) {
          oInputPrice.setValueState("Error");
          bValid = false;
        }
        if (!oData.CategoryID) {
          oInputCategory.setValueState("Error");
          bValid = false;
        }
  
        if (!bValid) {
          MessageBox.error("Please fill in all required fields.");
          return;
        }
  
        MessageBox.success("Product created successfully (simulation).");
  
        oNewProductModel.setData({
          ProductName: "",
          QuantityPerUnit: "",
          UnitPrice: "",
          CategoryID: "",
          Discontinued: false
        });
  
        if (_newProductDialog) {
          _newProductDialog.close();
        }
      },
  };
});
