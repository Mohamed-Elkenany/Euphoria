"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { aboutProductFun } from "../_utitly/slices/aboutProductSlice";
import { useGetUserByIdMutation } from "../_utitly/RTKQAPI/appApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
function ProductCard({ product, customWishlist }) {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };
  const dispatch = useDispatch();
  const mainUser = useSelector((state) => state.rootReducer?.userSlice.user);
  const [wishlist, setWishlist] = useState(false);
  const [hoverOnCard, setHoverOnCard] = useState(false);
  const [userInfoFun] = useGetUserByIdMutation();
  const handleAboutProduct = () => {
    dispatch(aboutProductFun({ info: { product }, show: true }));
  };
  useEffect(() => {
    if (mainUser.jwt) {
      async function getUserInfo() {
        const user = await userInfoFun({
          id: mainUser.user.id,
          token: mainUser.jwt,
        });
        if (!user.data) {
          return "Somthing Wrong";
        }
        if (
          user.data.wishlist?.our_products.find((ele) => ele.id === product.id)
        ) {
          setWishlist(true);
        }
      }
      getUserInfo();
    } else {
      if (localStorage.getItem("wishlist")) {
        JSON.parse(localStorage.getItem("wishlist")).includes(product.id)
          ? setWishlist(true)
          : setWishlist(false);
      }
    }
  }, [mainUser, product.id, userInfoFun]);
  return (
    <div
      onMouseEnter={() => setHoverOnCard(true)}
      onMouseLeave={() => setHoverOnCard(false)}
      className="cursor-pointer"
    >
      <div className="relative rounded-t-xl overflow-hidden">
        <button
          onClick={() => customWishlist({ id: product.id, setWishlist })}
          className={`${
            wishlist
              ? "bg-colorPink text-colorGrayFive"
              : "bg-colorGrayFour text-colorGrayOne"
          } text-[20px] font-semibold absolute right-6 top-6 z-20 flex items-center justify-center p-2 rounded-full duration-75`}
        >
          <CiHeart />
        </button>
        <div onClick={handleAboutProduct}>
          {hoverOnCard ? (
            <div>
              <Slider {...settings}>
                {product.attributes.arrayOfImage.data.map((img, i) => (
                  <Image
                    key={i}
                    src={img.attributes.url}
                    width={img.attributes.width}
                    height={img.attributes.height}
                    alt="product image"
                    className="w-full rounded-xl"
                  />
                ))}
              </Slider>
            </div>
          ) : (
            <div>
              <Image
                src={product.attributes.defaulteImg.data.attributes.url}
                width={product.attributes.defaulteImg.data.attributes.width}
                height={product.attributes.defaulteImg.data.attributes.height}
                alt="product image"
                className="w-full rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
      <div onClick={handleAboutProduct}>
        <div>
          <div className="flex items-start justify-between py-6">
            <div className="flex flex-col items-start">
              <h4 className="font-semibold text-[15px] text-colorGrayOne tracking-wide truncate text-ellipsis w-[200px]">
                {product.attributes.productName}
              </h4>
              <span className="text-[14px] font-medium text-colorGrayThree">{`${product.attributes.brandName}'s brand`}</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-colorGrayFour rounded-lg">
              <span className="text-[14px] font-medium text-colorGrayOne text-nowrap">
                EGP {product.attributes.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
