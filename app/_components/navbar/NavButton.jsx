"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {
  cartFun,
  cartIdFun,
  ordersFun,
  userInfo,
  wishlistFun,
} from "@/app/_utitly/slices/userSlice";
import { usePathname } from "next/navigation";
import { useGetUserByIdMutation } from "@/app/_utitly/RTKQAPI/appApi";
import { customWishlsitAfterLogIn } from "@/app/_libs/services/customWishlist";
import NavLink from "./NavLink";
function NavButton({ user }) {
  const userinfo = useSelector((state) => state.rootReducer.userSlice);
  const pathname = usePathname();
  const [userInfoFun] = useGetUserByIdMutation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
    handleOpenMenu(openMenu);
  };
  const arrayOfPathname = pathname.split("/");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo({ user: user.data, jwt: user.jwt }));
    if (user?.data) {
      async function getUserInfo() {
        const userInfo = await userInfoFun({
          id: user.data.id,
          token: user.jwt,
        }).then((res) => res.data);
        if (JSON.parse(localStorage.getItem("wishlist"))?.length) {
          await customWishlsitAfterLogIn({
            userId: user.data.id,
            wishlist: userInfo?.wishlist?.our_products,
            token: user.jwt,
            wishlistId: userInfo?.wishlist?.id,
            our_products: JSON.parse(localStorage?.getItem("wishlist")),
          }).then((res) => {
            if (res?.data) {
              dispatch(wishlistFun(res.data.data.attributes.our_products.data));
              localStorage.removeItem("wishlist");
            } else {
              dispatch(wishlistFun(userInfo.wishlist.our_products));
              localStorage.getItem("wishlist") &&
                localStorage.removeItem("wishlist");
            }
          });
        } else {
          dispatch(wishlistFun(userInfo.wishlist.our_products));
        }

        dispatch(cartFun(userInfo.cart));
        dispatch(cartIdFun(userInfo.cart.id));
        dispatch(ordersFun(userInfo?.orders));
      }
      getUserInfo();
    } else {
      if (localStorage?.getItem("wishlist")) {
        dispatch(wishlistFun(JSON.parse(localStorage.getItem("wishlist"))));
      }
    }
  }, [user, dispatch, userInfoFun]);
  return (
    <div className="flex-1">
      {user?.data === null ? (
        <div className="flex items-center justify-end gap-2">
          <Link href={"/my_account/wishlist"}>
            <button
              className={`relative ${
                arrayOfPathname[arrayOfPathname.length - 1] === "wishlist"
                  ? "bg-colorPink text-colo text-white"
                  : "bg-colorGrayFour text-colorGrayTwo"
              } flex items-center justify-center p-2  rounded-lg text-xl md:text-2xl`}
            >
              <CiHeart className="bg-transparent" />
              {userinfo?.wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-colorGrayTwo text-colorGrayFive w-4 h-4 rounded-md text-xs text-center">
                  {userinfo.wishlist.length}
                </span>
              )}
            </button>
          </Link>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`relative sm:hidden ${
              arrayOfPathname[arrayOfPathname.length - 1] === "wishlist"
                ? "bg-colorPink text-colo text-white"
                : "bg-colorGrayFour text-colorGrayTwo"
            } flex items-center justify-center p-2  rounded-lg text-xl md:text-2xl`}
          >
            {openMenu ? <IoMdClose /> : <IoMdMenu />}
            {userinfo?.wishlist?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-colorGrayTwo text-colorGrayFive w-4 h-4 rounded-md text-xs text-center">
                {userinfo.wishlist.length}
              </span>
            )}
          </button>
          <Link href={"/auth/signin"}>
            <button
              className="bg-colorPink
                                  max-md:text-sm
                                    px-3
                                    py-2
                                    md:px-4
                                    md:py-2
                                    md:font-medium 
                                     rounded-lg
                                      text-colorGrayFive
                                          duration-100
                                          "
            >
              SignIn
            </button>
          </Link>
          <Link href={"/auth/signup"} className="max-sm:hidden">
            <button
              className="
                                    outline
                                     outline-colorPink
                                      outline-1
                                    max-md:text-sm
                                    px-3
                                    py-2
                                    md:px-4
                                    md:py-2
                                    md:font-medium
                                      rounded-lg
                                       text-colorPink
                                        font-medium
                                            duration-100
                                           "
            >
              SignUp
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-x-2 max-lg:hidden">
          <Link href={"/my_account/wishlist"}>
            <button
              className={`relative ${
                arrayOfPathname[arrayOfPathname.length - 1] === "wishlist"
                  ? "bg-colorPink text-colo text-white"
                  : "bg-colorGrayFour text-colorGrayTwo"
              } flex items-center justify-center p-2  rounded-lg text-2xl`}
            >
              <CiHeart className="bg-transparent" />
              {userinfo?.wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-colorGrayTwo text-colorGrayFive w-4 h-4 rounded-md text-xs text-center">
                  {userinfo.wishlist.length}
                </span>
              )}
            </button>
          </Link>
          <Link href={"/my_account/Personal_Info"}>
            <button
              className={`${
                arrayOfPathname.includes("my_account") &&
                !arrayOfPathname.includes("wishlist")
                  ? "bg-colorPink text-colo text-white"
                  : "bg-colorGrayFour text-colorGrayTwo"
              } flex items-center justify-center p-2 bg-colorGrayFour text-colorGrayTwo rounded-lg text-2xl`}
            >
              <GoPerson className="bg-transparent" />
            </button>
          </Link>
          <Link href={"/add_to_cart"}>
            <button
              className={`${
                arrayOfPathname[arrayOfPathname.length - 1] === "add_to_cart"
                  ? "bg-colorPink text-colo text-white"
                  : "bg-colorGrayFour text-colorGrayTwo"
              } flex items-center justify-center p-2  rounded-lg text-xl relative`}
            >
              <BsCart3 className="bg-transparent" />
              {(userinfo?.cart?.productDetails?.length > 0 ||
                userinfo?.cart?.length > 0) && (
                <span className="absolute -top-2 -right-2 bg-colorGrayTwo text-colorGrayFive w-4 h-4 rounded-md text-xs text-center">
                  {userinfo.cart?.productDetails?.length}
                  {userinfo?.cart?.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      )}
      <div
        className={`absolute sm:hidden ${
          !openMenu ? "-left-[500px]" : "left-0"
        } top-[53px] bg-colorGrayFive w-full pt-12 shadow-lg h-screen duration-500`}
      >
        <NavLink />
      </div>
    </div>
  );
}

export default NavButton;
