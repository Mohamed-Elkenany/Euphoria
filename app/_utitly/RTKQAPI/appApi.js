"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "Euphoria API",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/" }),
  endpoints: (builder) => ({
    signUP: builder.mutation({
      query: (data) => ({
        url: "api/auth/local/register",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "api/auth/local",
        method: "POST",
        body: data,
      }),
    }),
    userInfo: builder.mutation({
      query: (token) => ({
        url: "/api/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: "populate=*",
      }),
    }),
    getUserById: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:
          "populate[wishlist][populate][our_products][populate]=*&populate[cart][populate][productDetails][populate][our_product][populate]=imageColor&populate[cart][populate][productDetails][populate][size][populate]=id&populate[addresses][populate]=*&populate[orders][populate][productDetails][populate][our_product][populate]=*&populate[orders][populate][productDetails][populate][size][populate]=*",
      }),
    }),
    createWishList: builder.mutation({
      query: ({ data, token }) => ({
        url: "/api/wishlists",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { data },
      }),
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data, token }) => (
        console.log(id, data, token),
        {
          url: `/api/wishlists/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: { data },
          params: "populate[our_products][populate]=*",
        }
      ),
    }),
    updateUserCart: builder.mutation({
      query: ({ data, id, token }) => (console.log(id),{
        url: `/api/carts/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { data },
      }),
    }),
    getAllCategories: builder.mutation({
      query: () => ({
        url: "api/our-categories",
        method: "GET",
        params: "populate=*",
      }),
    }),
    getProductId: builder.mutation({
      query: (id) => ({
        url: `/api/our-products/${id}`,
        method: "GET",
        params: "populate=*",
      }),
    }),
    getAllproducts: builder.mutation({
      query: () => ({
        url: "api/products",
        method: "GET",
        params:
          "populate[productColors][populate]=*&populate[our_category][populate]=*",
      }),
    }),
    getOurProducts: builder.mutation({
      query: () => ({
        url: "api/our-products",
        method: "GET",
        params: "populate=*",
      }),
    }),
    getProductsCode: builder.mutation({
      query: () => ({
        url: "/api/product-codes",
        method: "GET",
        params: "populate[our_products][populate]=*",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ data, token }) => (
        console.log(data),
        {
          url: "/api/orders",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: { data },
        }
      ),
    }),
  }),
});

export const {
  useSignUPMutation,
  useSignInMutation,
  useUserInfoMutation,
  useGetUserByIdMutation,
  useUpdateUserCartMutation,
  useGetAllCategoriesMutation,
  useGetOurProductsMutation,
  useGetProductsCodeMutation,
  useGetAllproductsMutation,
  useGetProductIdMutation,
  useCreateWishListMutation,
  useUpdateWishlistMutation,
  useCreateOrderMutation,
} = api;
