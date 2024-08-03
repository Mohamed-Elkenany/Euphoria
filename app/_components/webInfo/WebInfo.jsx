"use client"
import React from 'react'
import { TbTruckReturn } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { LuShirt } from "react-icons/lu";
function WebInfo() {
    return (
        <div className='text-[24px] font-medium text-colorGrayTwo grid grid-cols-2 gap-y-8 border-t pt-6'>
            <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center p-2 bg-colorGrayFour rounded-full'>
                    <RiSecurePaymentLine />
                </div>
                <h3>Secure payment</h3>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center p-2 bg-colorGrayFour rounded-full'>
                    <LuShirt />
                </div>
                <h3>Size & Fit</h3>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center p-2 bg-colorGrayFour rounded-full'>
                    <FaShippingFast />
                </div>
                <h3>Free shipping</h3>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center p-2 bg-colorGrayFour rounded-full'>
                    <TbTruckReturn />
                </div>
                <h3>Free Shipping & Returns</h3>
            </div>
        </div>
    );
}

export default WebInfo