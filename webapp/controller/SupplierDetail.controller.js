sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, Fragment, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("finalproject.controller.SupplierDetail", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("supplierDetail").attachPatternMatched(this._onObjectMatched, this);

            // Initialize new product model
            const oNewProductModel = new JSONModel({
                ProductName: "",
                QuantityPerUnit: "",
                UnitPrice: "",
                Category: "",
                Discontinued: false
            });
            this.getView().setModel(oNewProductModel, "newProduct");
        },

        _onObjectMatched: function (oEvent) {
            const supplierId = oEvent.getParameter("arguments").supplierId;
            const sPath = `/Suppliers(${supplierId})`;
            const oView = this.getView();

            oView.bindElement({
                path: sPath,
                parameters: {
                    expand: "Products"
                }
            });
        },

        onSelectProduct: async function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();
            const oView = this.getView();

            if (!this._productDialog) {
                this._productDialog = await Fragment.load({
                    id: oView.getId(),
                    name: "finalproject.view.fragments.ProductDetailDialog",
                    controller: this
                });
                oView.addDependent(this._productDialog);
            }

            this._productDialog.setBindingContext(oContext);
            this._productDialog.open();
        },

        onCloseProductDialog: function () {
            this._productDialog.close();
        },

        onOpenNewProductDialog: async function () {
            const oView = this.getView();

            if (!this._newProductDialog) {
                this._newProductDialog = await Fragment.load({
                    id: oView.getId(),
                    name: "finalproject.view.fragments.NewProductDialog",
                    controller: this
                });
                oView.addDependent(this._newProductDialog);
            }

            this._newProductDialog.open();
        },

        onCloseAddProductDialog: function () {
            this._newProductDialog.close();
        },

        onPressSaveData: function () {
            const oModel = this.getView().getModel("newProduct");
            const oData = oModel.getData();

            debugger;

            if (!oData.ProductName || !oData.QuantityPerUnit || !oData.UnitPrice || !oData.CategoryID) {
                MessageBox.error("Please fill all the required fields.");
                return;
            }

            MessageBox.success("Product creation simulated successfully!");
            this._newProductDialog.close();
        }
    });
});
