"use client";
import { aboutProductFun } from "@/app/_utitly/slices/aboutProductSlice";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import RateCustomer from "../Rate/RateCustomer";
import Link from "next/link";
import { usePathname } from "next/navigation";
function AboutProduct() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const productInfo = useSelector(
    (state) => state.rootReducer.aboutProductSlice
  );
  const { aboutPrduct, showOverlay } = productInfo;
  const handleCloseOverlay = useCallback(() => {
    dispatch(aboutProductFun({ info: null, show: false }));
  }, [dispatch]);
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showOverlay, aboutPrduct]);
  useEffect(() => {
    handleCloseOverlay();
  }, [handleCloseOverlay, pathname]);
  return (
    <div
      className={`${
        showOverlay ? "block" : "hidden"
      } absolute left-0 top-0 w-full min-h-full bg-black bg-opacity-50 z-[999]`}
    >
      {aboutPrduct !== null && (
        <div className="bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex gap-x-6 p-4 rounded-md h-[70%]">
          <button
            onClick={handleCloseOverlay}
            className="absolute -top-4 -right-4 flex items-center justify-center bg-colorGrayOne text-colorGrayFive p-2 rounded-md"
          >
            <GrClose />
          </button>
          <div className="flex-1 h-full">
            <Image
              src={
                aboutPrduct.product.attributes.imageColor.data.attributes.url
              }
              width={
                aboutPrduct.product.attributes.defaulteImg.data.attributes.width
              }
              height={
                aboutPrduct.product.attributes.defaulteImg.data.attributes
                  .height
              }
              alt="product image"
              className="rounded-md h-full"
            />
          </div>
          <div className="pr-12 flex-1 flex flex-col justify-around">
            <div className="flex flex-col gap-y-4">
              <h1 className=" text-[28px] text-colorGrayOne font-semibold tracking-wide min-w-1/2">
                {aboutPrduct.product.attributes.productName}
              </h1>
              <RateCustomer rate={aboutPrduct.product.attributes.rate} />
            </div>
            <p className=" text-[14px] text-colorGrayThree font-medium pr-8">
              {aboutPrduct.product.attributes.aboutProduct}
            </p>
            <div>
              <h2 className="text-[24px] text-colorGrayOne font-bold mb-4">
                available Size
              </h2>
              <div className="flex items-center gap-3">
                {aboutPrduct.product.attributes.sizes.data.map((size, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center w-[35px] h-[35px] bg-colorGrayOne shadow rounded p-2"
                  >
                    <h6 className="text-colorGrayFive text-[14px] uppercase">
                      {size.attributes.productSize}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-x-8">
              <Link
                href={`/shop/${
                  aboutPrduct.product.attributes.forMen ? "men" : "women"
                }/${aboutPrduct.product.id}`}
              >
                <button className=" bg-colorPink text-colorGrayFive px-4 py-2 rounded text-[16px]">
                  Show Product
                </button>
              </Link>
              <div className="px-4 py-2 rounded border border-colorGrayOne text-colorGrayOne text-[16px] font-medium">
                <h4>EGP {aboutPrduct.product.attributes.price}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutProduct;
