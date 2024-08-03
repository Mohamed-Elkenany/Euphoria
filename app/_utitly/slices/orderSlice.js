import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users_permissions_user: null,
  productDetails: null,
  address: null,
};

const orderSlice = createSlice({
  name: "orderSilce",
  initialState,
  reducers: {
    addressFun: (state, action) => {
      switch (action.payload) {
        case "default_address": {
          return {
            ...state,
            address: JSON.parse(localStorage.getItem("defaultAddress")),
          };
        }
        case "different_address": {
          return {
            ...state,
            address: JSON.parse(localStorage.getItem("address")),
          };
        }
      }
    },
    productDetailsFun: (state, action) => {
      return {
        ...state,
        productDetails: action.payload,
      };
    },
    userIdFun: (state, action) => {
      return {
        ...state,
        users_permissions_user: action.payload,
      };
    },
  },
});

export const { addressFun, productDetailsFun, userIdFun } = orderSlice.actions;
export default orderSlice.reducer;
