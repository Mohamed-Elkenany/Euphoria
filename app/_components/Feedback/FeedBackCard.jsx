"use client"
import Image from 'next/image';
import React from 'react'
import RateCustomer from '../Rate/RateCustomer';

function FeedBackCard({ feedBack }) {
    return (
        <div className='border mr-3 py-8 px-4  h-[320px] rounded-xl'>
            <div  className='flex items-start justify-between'>
                <div className='flex flex-col items-start gap-y-4'>
                    <div>
                        <Image src={feedBack.image} width={59} height={59} className='w-full' alt='customer image' />
                    </div>
                    <h3 className='text-[22px] font-medium text-colorGrayOne tracking-wide'>{feedBack.name}</h3>
                </div>
                <div>
                    <RateCustomer rate={feedBack.rate}/>
                </div>
            </div>
            <div className='py-4'>
                <p className='text-[14px] font-normal text-colorGrayThree tracking-wide'>{feedBack.p}</p>
            </div>
        </div>
    );
}

export default FeedBackCard