import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: {
    lists: [],
    name: null,
    id: null,
    phoneCode: null,
  },
  state: {
    lists: [],
    name: null,
    id: null,
  },
  city: {
    lists: [],
    name: null,
    id: null,
  },
};

const countryStateCitySlice = createSlice({
  name: "countryStateCity",
  initialState,
  reducers: {
    countryFun: (state, action) => {
      if (action.payload.lists) {
        const newLists = action.payload.lists.filter((country) => {
          return country.name !== "Israel";
        });
        return {
          ...state,
          country: {
            lists: newLists,
            name: null,
            id: null,
          },
        };
      } else {
        return {
          ...state,
          country: {
            ...state.country,
            name: action.payload.name,
            id: action.payload.id,
            phoneCode: action.payload.phoneCode,
          },
        };
      }
    },
    stateFun: (state, action) => {
      if (action.payload.lists) {
        return {
          ...state,
          state: {
            ...state.state,
            lists: action.payload.lists,
          },
        };
      } else {
        return {
          ...state,
          state: {
            ...state.state,
            name: action.payload.name,
            id: action.payload.id,
          },
        };
      }
    },
    cityFun: (state, action) => {
      if (action.payload.lists) {
        return {
          ...state,
          city: {
            ...state.city,
            lists: action.payload.lists,
          },
        };
      } else {
        return {
          ...state,
          city: {
            ...state.city,
            name: action.payload.name,
            id: action.payload.id,
          },
        };
      }
    },
  },
});

export const { countryFun, stateFun, cityFun } = countryStateCitySlice.actions;
export default countryStateCitySlice.reducer;
