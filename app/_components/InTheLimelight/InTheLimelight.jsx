"use client";
import React, { useEffect, useState } from "react";
import TitleSection from "../TitleSection";
import ProductCard from "../ProductCard";
import { useGetOurProductsMutation } from "@/app/_utitly/RTKQAPI/appApi";
import { useDispatch, useSelector } from "react-redux";
import { handleWishlist } from "@/app/_libs/services/customWishlist";
import { wishlistFun } from "@/app/_utitly/slices/userSlice";

function InTheLimelight() {
  const dispatch = useDispatch();
  const mainUser = useSelector((state) => state.rootReducer?.userSlice.user);
  const [ourProductsFun, ourProductsFunOperation] = useGetOurProductsMutation();
  const [products, setProducts] = useState([]);
  const customWishlist = async ({ id, setWishlist }) => {
    if (mainUser.jwt) {
      const wishlist = await handleWishlist({
        userId: mainUser.user.id,
        our_products: id,
        token: mainUser.jwt,
      });
      dispatch(wishlistFun(wishlist.data.data.attributes.our_products.data));
      if (wishlist.add) {
        setWishlist(true);
      } else {
        setWishlist(false);
      }
    } else {
      if (localStorage.getItem("wishlist")) {
        const arrayOfProduct = JSON.parse(localStorage.getItem("wishlist"));
        if (arrayOfProduct.includes(id)) {
          const filterProduct = arrayOfProduct.filter((product) => {
            return product !== id;
          });
          setWishlist(false);
          localStorage.removeItem("wishlist");
          localStorage.setItem("wishlist", JSON.stringify(filterProduct));
          dispatch(wishlistFun(filterProduct));
        } else {
          setWishlist(true);
          arrayOfProduct.push(id);
          localStorage.removeItem("wishlist");
          localStorage.setItem("wishlist", JSON.stringify(arrayOfProduct));
          dispatch(wishlistFun(arrayOfProduct));
        }
      } else {
        setWishlist(true);
        localStorage.setItem("wishlist", JSON.stringify([id]));
        dispatch(wishlistFun([id]));
      }
    }
  };
  useEffect(() => {
    async function getOurproduct() {
      await ourProductsFun();
    }
    getOurproduct();
  }, [ourProductsFun]);
  useEffect(() => {
    if (ourProductsFunOperation.isError) {
      throw new Error("Somthing happend");
    }
  }, [ourProductsFunOperation.isError, ourProductsFunOperation.error]);
  useEffect(() => {
    if (ourProductsFunOperation.isSuccess) {
      let array = [];
      const allProducts = ourProductsFunOperation.data.data;
      for (let index = 0; index <= allProducts.length; index++) {
        const randomNumber = Math.ceil(Math.random() * index);
        if (!array.includes(allProducts[randomNumber])) {
          array.push(allProducts[randomNumber]);
        }
      }
      setProducts(array);
    }
  }, [ourProductsFunOperation.data, ourProductsFunOperation.isSuccess]);
  return (
    <div className=" max-w-screen-xl mx-auto mb-[120px]">
      <div className="mb-[70px]">
        <TitleSection title={"In The Limelight"} />
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {products.slice(0, 4).map((product, i) => {
          return (
            <div key={i} className="flex-1">
              <ProductCard product={product} customWishlist={customWishlist} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InTheLimelight;
