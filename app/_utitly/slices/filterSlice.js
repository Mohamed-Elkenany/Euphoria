"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  filterType: null,
  minPrice: null,
  MaxPrice: null,
  filterByColor: [],
  filterBySize: [],
};

const filterProductSlice = createSlice({
  name: "customProduct",
  initialState,
  reducers: {
    getAllProductFun: (state, action) => {
      return {
        ...state,
        allProducts: action.payload,
      };
    },
    setFilterTypeFun: (state, action) => {
      return {
        ...state,
        filterType: action.payload,
      };
    },
    setMinPriceFun: (state, action) => {
      return {
        ...state,
        minPrice: action.payload,
      };
    },
    setMaxPriceFun: (state, action) => {
      return {
        ...state,
        MaxPrice: action.payload,
      };
    },
    filterByColorFun: (state, action) => {
      return {
        ...state,
        filterByColor: action.payload,
      };
    },
    filterBySizeFun: (state, action) => {
      return {
        ...state,
        filterBySize: action.payload,
      };
    },
  },
});
export const {
  getAllProductFun,
  setMaxPriceFun,
  setMinPriceFun,
  filterByColorFun,
  filterBySizeFun,
  setFilterTypeFun,
} = filterProductSlice.actions;
export default filterProductSlice.reducer;
