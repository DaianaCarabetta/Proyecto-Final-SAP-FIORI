sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, Filter, FilterOperator, Dialog, Fragment, JSONModel) {
    "use strict";
  
    return Controller.extend("finalproject.controller.Home", {
      onInit: function () {
        this._dialog = null;
      },
  
      onFilter: function () {
        const sCompanyQuery = this.byId("filterCompany").getValue();
        const sCountryQuery = this.byId("filterCountry").getValue();
  
        const aFilters = [];
  
        if (sCompanyQuery) {
          const isNumeric = !isNaN(sCompanyQuery);
          const companyFilters = [];
          if (isNumeric) {
            companyFilters.push(new Filter("SupplierID", FilterOperator.EQ, sCompanyQuery));
          }
          companyFilters.push(new Filter("CompanyName", FilterOperator.StartsWith, sCompanyQuery));
          aFilters.push(new Filter({
            filters: companyFilters,
            and: false
          }));
        }
  
        if (sCountryQuery) {
          aFilters.push(new Filter("Country", FilterOperator.StartsWith, sCountryQuery));
        }
  
        const oTable = this.byId("vendorTable");
        const oBinding = oTable.getBinding("rows");
  
        if (oBinding) {
          oBinding.filter(aFilters, "Application");
        }
      },
  
      onSelectSupplier: function (oEvent) {
        const oTable = this.byId("vendorTable");
        const oContext = oTable.getContextByIndex(oEvent.getParameter("rowIndex"));
      
        if (!oContext) {
          return;
        }
      
        const sPath = oContext.getPath();
        const supplierId = sPath.match(/\d+/)?.[0];
      
        if (!supplierId) {
          console.error("Supplier ID not found in context path");
          return;
        }
      
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("supplierDetail", {
            supplierId: supplierId
        });          
      },           
  
      onCloseDialog: function () {
        this._dialog.close();
      }
    });
  });
  