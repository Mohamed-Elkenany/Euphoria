import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOverlay: false,
  aboutPrduct: null,
  product: null,
};

const aboutProductSlice = createSlice({
  name: "aboutProduct",
  initialState,
  reducers: {
    aboutProductFun: (state, action) => {
      return {
        ...state,
        aboutPrduct: action.payload.info,
        showOverlay: action.payload.show,
      };
    },
    getProductFun: (state, action) => {
      return {
        ...state,
        product: action.payload,
      };
    },
  },
});

export const { aboutProductFun, getProductFun } = aboutProductSlice.actions;
export default aboutProductSlice.reducer;
