import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  wishlist: null,
  cart: null,
  orders: null,
  cartId: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      switch (action.type) {
        case "loading": {
          return {
            ...state,
            loading: true,
          };
        }
        case "success": {
          return {
            ...state,
            user: action.payload,
          };
        }
      }
      return {
        ...state,
        user: action.payload,
      };
    },
    wishlistFun: (state, action) => {
      return {
        ...state,
        wishlist: action.payload,
      };
    },
    cartFun: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
    cartIdFun: (state, action) => {
      return {
        ...state,
        cartId: action.payload,
      };
    },
    ordersFun: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
});

export const { userInfo, wishlistFun, cartFun, ordersFun, cartIdFun } =
  userSlice.actions;

export default userSlice.reducer;
