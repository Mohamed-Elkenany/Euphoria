"use client";
import { useGetOurProductsMutation } from "@/app/_utitly/RTKQAPI/appApi";
import React, { useEffect, useState } from "react";
import TitleSection from "../TitleSection";
import { useParams, usePathname } from "next/navigation";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { handleWishlist } from "@/app/_libs/services/customWishlist";
import { wishlistFun } from "@/app/_utitly/slices/userSlice";

function SimilarProducts() {
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
        } else {
          setWishlist(true);
          arrayOfProduct.push(id);
          localStorage.removeItem("wishlist");
          localStorage.setItem("wishlist", JSON.stringify(arrayOfProduct));
        }
      } else {
        setWishlist(true);
        localStorage.setItem("wishlist", JSON.stringify([id]));
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
    <div className="pb-[120px]">
      <div className="my-[70px]">
        <TitleSection title={"Similar Products"} />
      </div>
      <div className="grid grid-cols-4 gap-x-8">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard
            product={product}
            key={i}
            customWishlist={customWishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
