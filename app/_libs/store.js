"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../_utitly/RTKQAPI/appApi";
import filterProductSlice from '@/app/_utitly/slices/filterSlice'
import userSlice from "../_utitly/slices/userSlice";
import aboutProductSlice from "../_utitly/slices/aboutProductSlice";
import countryStateCitySlice from "../_utitly/slices/countryStateCitySlice";
import orderSlice from "../_utitly/slices/orderSlice";
const rootReducer = combineReducers({
  api,
  userSlice,
  aboutProductSlice,
  filterProductSlice,
  countryStateCitySlice,
  orderSlice
});

const store = configureStore({
    reducer: {
        rootReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export default store;
