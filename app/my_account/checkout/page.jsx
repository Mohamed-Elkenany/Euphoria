"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormAddress from "./_components/FormAddress";
import Payment from "./_components/Payment";
import TitleSection from "@/app/_components/TitleSection";
import {
  addressFun,
  productDetailsFun,
  userIdFun,
} from "@/app/_utitly/slices/orderSlice";
import { toast, ToastContainer } from "react-toastify";
export default function CheckoutPage() {
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [items, setItems] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const user = useSelector((state) => state.rootReducer?.userSlice);
  console.log(user);
  const defaultAddress = (e) => {
    if (!localStorage.getItem("defaultAddress")) {
      return toast.warn(
        <div>
          <h1 className="text-sm">You do not set your default address</h1>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "light",
        }
      );
    }
    dispatch(addressFun(e.target.value));
  };
  const differentAddress = (e) => {
    if (!localStorage.getItem("address")) {
      return toast.warn("Create your address please", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    }
    dispatch(addressFun(e.target.value));
  };
  useEffect(() => {
    let SubTotal = 0;
    let Shipping = 0;
    let Items = 0;
    let arrayOfOrders = [];
    if (user.cart?.productDetails?.length) {
      for (let index = 0; index < user.cart.productDetails.length; index++) {
        if (user.cart.productDetails[index].our_product?.data) {
          arrayOfOrders.push({
            our_product: user.cart.productDetails[index].our_product.data.id,
            amount: user.cart.productDetails[index].amount,
            size: user.cart.productDetails[index].size.data.id,
            subTotal: user.cart.productDetails[index].subTotal,
          });
          Shipping +=
            user.cart.productDetails[index].our_product.data.attributes
              .shipping;
          SubTotal +=
            user.cart.productDetails[index].our_product.data.attributes.price *
            user.cart.productDetails[index].amount;
        } else {
          arrayOfOrders.push({
            our_product: user.cart.productDetails[index].our_product.id,
            amount: user.cart.productDetails[index].amount,
            size: user.cart.productDetails[index].size.id,
            subTotal: user.cart.productDetails[index].subTotal,
          });
          Shipping += user.cart.productDetails[index].our_product.shipping;
          SubTotal +=
            user.cart.productDetails[index].our_product.price *
            user.cart.productDetails[index].amount;
        }
        Items += user.cart.productDetails[index].amount;
      }
      dispatch(userIdFun(user.user.user.id));
    }
    dispatch(productDetailsFun(arrayOfOrders));
    setItems(Items);
    setSubTotal(SubTotal);
    setShipping(Shipping);
    setGrandTotal(Shipping + SubTotal);
  }, [dispatch, user.cart, user?.user?.user?.id]);
  return (
    <main>
      <div className="mb-[60px]">
        <TitleSection title={"Check Out"} />
        <p className="text-sm text-colorGrayThree font-medium tracking-wide">
          Billing Details
        </p>
      </div>
      <div>
        {user.cart !== null && (
          <div className="flex items-start justify-between gap-x-4">
            <div className="flex-1 mr-16">
              <FormAddress />
              <div>
                <div className="my-6">
                  <h1 className="font-bold text-xl text-colorGrayOne tracking-wide">
                    Shipping Address
                  </h1>
                  <p className="text-sm text-colorGrayThree tracking-wide mt-1">
                    Select the address that matches your card or payment method.
                  </p>
                </div>
                <div className="py-4 px-2 rounded-lg bg-colorGrayFour">
                  <div className="flex items-center gap-x-2 px-8 py-2 border-b border-colorGrayThree">
                    <input
                      onChange={defaultAddress}
                      type="radio"
                      id="default_address"
                      name="address"
                      value="default_address"
                    />
                    <label htmlFor="default_address">
                      <p className="text-md font-bold text-colorGrayOne tracking-wide">
                        Useing default address
                      </p>
                    </label>
                  </div>
                  <div className="py-2 px-8 flex items-center gap-x-2">
                    <input
                      onChange={differentAddress}
                      type="radio"
                      id="different_address"
                      name="address"
                      value="different_address"
                    />
                    <label htmlFor="different_address">
                      <p className="text-md font-bold text-colorGrayOne tracking-wide">
                        Use a different shipping address
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              {grandTotal > 0 && <Payment amount={grandTotal} />}
            </div>
            <div className="border rounded-md p-2">
              <div className="grid grid-cols-2 gap-4">
                {(user.cart?.productDetails.length !== 0 ||
                  user?.cart?.length !== 0) &&
                  user.cart.productDetails.map((product, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <div className="w-[50px]">
                        <Image
                          src={
                            product.our_product.data
                              ? product.our_product.data.attributes.imageColor
                                  .data.attributes.url
                              : product.our_product.imageColor.url
                          }
                          width={
                            product.our_product.data
                              ? product.our_product.data.attributes.imageColor
                                  .data.attributes.width
                              : product.our_product.imageColor.width
                          }
                          height={
                            product.our_product.data
                              ? product.our_product.data.attributes.imageColor
                                  .data.attributes.height
                              : product.our_product.imageColor.height
                          }
                          alt="product_image"
                          className="w-full rounded-md"
                        />
                      </div>
                      <div className="text-[10px] font-bold text-colorGrayOne text-nowrap">
                        <h4>
                          {product.our_product.data
                            ? product.our_product.data.attributes.productName
                            : product.our_product.productName}{" "}
                          <span className="text-colorGrayThree font-medium">
                            x {product.amount}
                          </span>
                        </h4>
                        <p className="text-colorGrayTwo my-2">
                          <span>Color:</span>{" "}
                          {product.our_product.data
                            ? product.our_product.data.attributes.color
                            : product.our_product.color}
                        </p>
                        <p className="text-colorGrayTwo">
                          Size:{" "}
                          <span className="uppercase">
                            {product.size.data
                              ? product.size.data.attributes.productSize
                              : product.size.productSize}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="w-full text-start bg-colorGrayOne text-colorGrayFive pl-12 font-medium tracking-wide rounded-md mt-4 grid grid-cols-2 gap-2 py-2">
                <h1>
                  SubTotal{" "}
                  <span className="text-xs text-colorGrayFour">
                    x {items} items
                  </span>
                </h1>
                <h1>EGP {subTotal}</h1>
                <h1>Shipping</h1>
                <h1>{shipping !== 0 ? `EGP ${shipping}` : "Free"}</h1>
                <h1>GrandTotal</h1>
                <h1>EGP {grandTotal}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
