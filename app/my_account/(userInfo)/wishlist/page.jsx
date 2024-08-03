"use client"
import WishListCard from '@/app/_components/wishListCard/WishListCard';
import { useUpdateWishlistMutation, useGetUserByIdMutation } from '@/app/_utitly/RTKQAPI/appApi';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart } from "react-icons/fi";
import Link from 'next/link';
import { handleCart } from '@/app/_libs/services/customCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wishlistFun } from '@/app/_utitly/slices/userSlice';

function Wishlist() {
  const dispatch = useDispatch();
  const mainUser = useSelector(state=> state.rootReducer.userSlice?.user);
  const [userInfoFun, userInfoOperation] = useGetUserByIdMutation();
  const [userInfo, setUserInfo] = useState(null);
  const [updateWishlistFun] = useUpdateWishlistMutation();
  const [products, setProducts] = useState([]);
  
  const AddToCartFun = async (id) => {
    const customCart = await handleCart({userId: mainUser.user.id, our_products: id, token: mainUser.jwt})
    if(customCart.ok){
      await removeFromWishlist(id)
      return (
        <>
        {
          toast.success('Add To Your Cart Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        }
        </>
      )
    }
  }
  const removeFromWishlist = async (id)=> {
    const filterProducts = products.filter(product=>{
      return product.id !== id
    })
    const updateWishlist = await updateWishlistFun({id:userInfo.wishlist.id, data:{our_products:filterProducts}, token: mainUser.jwt});
    if(updateWishlist.data){
      setProducts(filterProducts);
      dispatch(wishlistFun(updateWishlist.data.data.attributes.our_products.data))
    }
  }
  useEffect(()=>{
    if(mainUser.jwt){
      async function getUserInfo(){
        const user = await userInfoFun({id :mainUser.user.id, token: mainUser.jwt})
        if(user.data){
          setUserInfo(user.data)
          setProducts(user.data.wishlist?.our_products)
        }
      }
      getUserInfo()
    }
},[mainUser.jwt, mainUser.user.id, userInfoFun])
  return (
    <div>
       {
        userInfoOperation.isSuccess &&
        <div>
          {
            products?.length ? products.map((product, i) => (
              <WishListCard key={i} product={product} removeFromWishlist={removeFromWishlist} AddToCartFun={AddToCartFun} />
            ))
              :
              <div className='flex flex-col items-center justify-center p-12 rounded-md shadow-md shadow-colorGrayThree w-fit mx-auto'>
                <div className='flex items-center justify-center text-[#28A642] bg-[#F0F9F4] p-6 w-fit rounded-full mb-6'>
                  <FiHeart className='text-[60px]' />
                </div>
                <div className='flex flex-col items-center justify-center gap-y-4'>
                  <h1 className='text-[34px] text-colorGrayOne font-bold'>Your wishlist is empty.</h1>
                  <p className='w-[500px] text-colorGrayThree text-center'>You don’t have any products in the wishlist yet. You will find a lot of interesting products on our Shop page.</p>
                  <Link href={'/shop'}><button className='text-[14px] font-semibold text-white bg-colorPink px-4 py-2 rounded-md'>Continue Shopping</button></Link>
                </div>
              </div>
          }
        </div>
      }
      {
        userInfoOperation.isLoading &&
        <div className='flex items-center justify-center text-[24px] font-semibold text-colorGrayThree'>
          <h1>Loading...</h1>
        </div>
      }
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
    </div>
  );
}

export default Wishlist