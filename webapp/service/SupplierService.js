sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../helper/FilterHelper"
  ], function (Filter, FilterOperator, FilterHelper) {
    "use strict";
  
    return {
      filterVendors: function (oTable, sCompanyQuery, sCountryQuery) {
        const aFilters = FilterHelper.buildSupplierFilters(sCompanyQuery, sCountryQuery);
  
        const oBinding = oTable.getBinding("rows");
        if (oBinding) {
          oBinding.filter(aFilters, "Application");
        }
      },
  
      selectSupplier: function (oEvent, oTable, oRouter) {
        const oContext = oTable.getContextByIndex(oEvent.getParameter("rowIndex"));
        if (!oContext) {
          return;
        }
  
        const sPath = oContext.getPath();
        const supplierId = this._getSupplierIdFromContextPath(sPath);
        if (!supplierId) {
          console.error("Supplier ID not found in context path");
          return;
        }
  
        oRouter.navTo("supplierDetail", { supplierId: supplierId });
      },
  
      _getSupplierIdFromContextPath: function (sPath) {
        const supplierIdMatch = sPath.match(/\d+/);
        return supplierIdMatch ? supplierIdMatch[0] : null;
      }
    };
  });
  