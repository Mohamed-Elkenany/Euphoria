"use client";
import { incrementAndDecrementAmountOfProduct } from "@/app/_libs/services/customCart";
import { cartFun } from "@/app/_utitly/slices/userSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function CardOfCart({ product, handleRemoveFormCart }) {
  console.log(product);
  const mainUser = useSelector((state) => state.rootReducer.userSlice?.user);
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(null);
  const [subTotalOfProduct, setSubTotalOfProduct] = useState(null);
  const increaseAmount = async () => {
    const price = product.our_product.price;
    const increment = amount + 1;
    const incrementAmount = await incrementAndDecrementAmountOfProduct({
      userId: mainUser.user.id,
      our_products: product.our_product,
      size: product.size,
      amount: increment,
      subTotal: increment * parseFloat(price),
      token: mainUser.jwt,
    });
    if (incrementAmount.data) {
      dispatch(cartFun(incrementAmount.data.data.attributes));
      setSubTotalOfProduct(increment * parseFloat(price));
      setAmount(increment);
    }
  };
  const decreaseAmount = async () => {
    const price = product.our_product.price;
    const decreament = amount - 1;
    const decrementAmount = await incrementAndDecrementAmountOfProduct({
      userId: mainUser.user.id,
      our_products: product.our_product,
      size: product.size,
      amount: decreament,
      subTotal: decreament * parseFloat(price),
      token: mainUser.jwt,
    });
    if (decrementAmount.data) {
      dispatch(cartFun(decrementAmount.data.data.attributes));
      setSubTotalOfProduct(decreament * parseFloat(price));
      setAmount(decreament);
    }
  };
  useEffect(()=>{
    setAmount(product.amount)
    setSubTotalOfProduct(product.subTotal)
  },[product])
  return (
    <div className="border-b py-8 grid grid-cols-7 items-center">
      <div className="flex items-start gap-x-3 col-span-2">
        <div className="w-[80px] rounded-md overflow-hidden">
          <Image
            src={product.our_product.imageColor.url}
            width={product.our_product.imageColor.width}
            height={product.our_product.imageColor.height}
            alt="product image"
            className="w-full"
          />
        </div>
        <div className="text-[14px] flex flex-col gap-y-2 text-colorGrayOne">
          <h1>{product.our_product.productName}</h1>
          <h1>Color: {product.our_product.color}</h1>
          <h1>
            Size: <span className="uppercase">{product.size.productSize}</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <span>EGP</span>
        <h1>{product.our_product.price}</h1>
      </div>
      <div className="flex items-center justify-center gap-1">
        <div className="w-fit bg-colorGrayFour rounded-full overflow-hidden">
          <button
            disabled={amount === 1}
            onClick={() => decreaseAmount()}
            className="px-4 text-lg shadow-lg shadow-colorGrayFour"
          >
            -
          </button>
          <span>{amount}</span>
          <button
            onClick={() => increaseAmount()}
            className="px-4 text-lg shadow-lg shadow-colorGrayFour"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <h1>
          {product.our_product.shipping > 0
            ? `EGP ${product.our_product.shipping}`
            : "Free"}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-1">
        <span>EGP</span>
        <h1>{subTotalOfProduct}</h1>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={() =>
            handleRemoveFormCart({
              productId: product.our_product.id,
              sizeId: product.size.id,
            })
          }
        >
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
}

export default CardOfCart;
