sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ], function (Filter, FilterOperator) {
    "use strict";
  
    return {
      buildSupplierFilters: function (sCompanyQuery, sCountryQuery) {
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
  
        return aFilters;
      }
    };
  });
  