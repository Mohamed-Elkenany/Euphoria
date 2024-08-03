"use client";
import React, { useEffect, useState } from "react";
import Path from "../_components/path/Path";
import Image from "next/image";
import Link from "next/link";
import { useGetUserByIdMutation } from "../_utitly/RTKQAPI/appApi";
import { useDispatch, useSelector } from "react-redux";
import CardOfCart from "../_components/cardOfCart/CardOfCart";
import { removeFromCart } from "../_libs/services/customCart";
import { cartFun } from "../_utitly/slices/userSlice";

function AddToCart() {
  const mainUser = useSelector((state) => state.rootReducer?.userSlice.user);
  const productsDetails = useSelector(
    (state) => state.rootReducer?.userSlice?.cart
  );
  const dispatch = useDispatch();
  const [userInfoFun, userInfoOperation] = useGetUserByIdMutation();
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const handleRemoveFormCart = async ({ productId, sizeId }) => {
    const updateCart = await removeFromCart({
      userId: mainUser.user.id,
      our_products: productId,
      size: sizeId,
      token: mainUser.jwt,
    });
    if (updateCart?.ok) {
      const filterProducts = products.filter((product) => {
        if (product.our_product.id == productId && product.size.id !== sizeId) {
          return product;
        } else if (product.our_product.id !== productId) {
          return product;
        }
      });
      setProducts(filterProducts)
      dispatch(cartFun(updateCart.data.data.attributes));
    }
  };
  useEffect(() => {
    if (mainUser) {
      async function getUserInfo() {
        const user = await userInfoFun({
          id: mainUser.user.id,
          token: mainUser.jwt,
        });
        if (!user.data) {
          console.log(false);
        }
        setProducts(user.data.cart?.productDetails);
        let shipping = 0,
          subtotal = 0;
        for (
          let index = 0;
          index < user.data.cart?.productDetails.length;
          index++
        ) {
          subtotal += user.data.cart.productDetails[index].subTotal;
          shipping += user.data.cart.productDetails[index].our_product.shipping;
        }
        setShipping(shipping);
        setSubtotal(subtotal);
      }
      getUserInfo();
    }
  }, [mainUser, userInfoFun]);
  useEffect(() => {
    if (productsDetails?.productDetails) {
      let shipping = 0,
        subtotal = 0;
      for (
        let index = 0;
        index < productsDetails?.productDetails.length;
        index++
      ) {
        subtotal += productsDetails?.productDetails[index].subTotal;
        if (productsDetails?.productDetails[index].our_product.data) {
          shipping +=
            productsDetails?.productDetails[index].our_product.data.attributes
              .shipping;
        } else {
          shipping +=
            productsDetails?.productDetails[index].our_product.shipping;
        }
      }
      setShipping(shipping);
      setSubtotal(subtotal);
    }
  }, [productsDetails?.productDetails]);
  return (
    <div className="pt-[120px] w-full">
      <div className="mx-auto max-w-screen-xl">
        <Path />
      </div>
      {userInfoOperation.isSuccess && (
        <div>
          {products?.length ? (
            <div className="">
              <div className="sticky top-[100px] bg-colorGrayOne text-colorGrayFive py-4">
                <div className="max-w-screen-xl mx-auto grid grid-cols-7 items-center">
                  <h2 className=" col-span-2">Product Details</h2>
                  <h2 className=" col-span-1 flex items-center justify-center">
                    Price
                  </h2>
                  <h2 className=" col-span-1 flex items-center justify-center">
                    Quantity
                  </h2>
                  <h2 className=" col-span-1 flex items-center justify-center">
                    Shipping
                  </h2>
                  <h2 className=" col-span-1 flex items-center justify-center">
                    Subtotal
                  </h2>
                  <h2 className="col-span-1 text-end">Action</h2>
                </div>
              </div>
              <div className="max-w-screen-xl mx-auto flex flex-col gap-y-4">
                {products.map((product, i) => (
                  <CardOfCart
                    product={product}
                    key={i}
                    handleRemoveFormCart={handleRemoveFormCart}
                  />
                ))}
              </div>
              <div className=" bg-slate-50">
                <div className="max-w-screen-xl mx-auto flex items-center justify-end">
                  <div className="bg-colorGrayFour w-fit flex flex-col items-center justify-center">
                    <div className="font-light text-colorGrayOne border-b p-[60px] pb-[20px]">
                      <div className="grid grid-cols-2 items-center gap-12">
                        <h1>Sub Total</h1>
                        <h1>EGP {subtotal}</h1>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-x-12 my-2">
                        <h1>Shipping</h1>
                        <h1>{shipping === 0 ? "Free" : `EGP ${shipping}`}</h1>
                      </div>
                      <div className="font-bold grid grid-cols-2 items-center gap-x-12">
                        <h1>Grand Total</h1>
                        <h1>EGP {shipping + subtotal}</h1>
                      </div>
                    </div>
                    <div className="p-[50px]">
                      <Link href={"/my_account/checkout"} className="w-fit">
                        <button className="font-normal text-colorGrayFive bg-colorPink px-6 py-2 rounded-lg">
                          <h1>Checkout</h1>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-6 items-center justify-center pb-[80px]">
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full z-10" />
                <Image
                  src={"/cartEmpty.jpg"}
                  width={430}
                  height={310}
                  alt="cart is empty"
                />
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-[28px] font-semibold">
                    Your cart is empty and sad :(
                  </h1>
                  <p className="text-[18px] text-colorGrayThree">
                    Add something to make it happy!
                  </p>
                </div>
              </div>
              <Link href={"/"}>
                <button className="bg-colorPink text-colorGrayFive px-12 py-3 rounded-lg mx-auto shadow-md shadow-colorGrayTwo">
                  Back to HomePage
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      {userInfoOperation.isLoading && (
        <div className="flex items-center justify-center text-[24px] font-semibold text-colorGrayOne">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default AddToCart;
