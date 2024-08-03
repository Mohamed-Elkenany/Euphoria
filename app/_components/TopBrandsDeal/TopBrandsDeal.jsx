"use client"
import Image from 'next/image';
import React from 'react'

function TopBrandsDeal() {
    
    return (
        <div className='max-w-screen-xl mx-auto bg-colorGrayOne text-white flex flex-col items-center gap-y-10 mb-[120px] rounded-xl py-8'>
            <h1 className='font-bold text-[34px]'>Top Brands Deal</h1>
            <p className='text-colorGrayThree'>Up To <span className='text-[#FBD103]'>60%</span> off on brands</p>
            <div className='flex items-center gap-x-6'>
              <div className=' bg-white py-5 px-4 rounded-xl'>
                <Image src={'/TopBrandsDeal/nike.png'} width={123} height={69} alt='brand image'/>
              </div>
              <div className=' bg-white py-2 px-4 rounded-xl'>
                <Image src={'/TopBrandsDeal/hm.png'} width={123} height={69} alt='brand image'/>
              </div>
              <div className=' bg-white py-3 px-4 rounded-xl'>
                <Image src={'/TopBrandsDeal/levels.jpg'} width={123} height={69} alt='brand image'/>
              </div>
              <div className=' bg-white py-6 px-4 rounded-xl'>
                <Image src={'/TopBrandsDeal/polo.png'} width={123} height={69} alt='brand image'/>
              </div>
              <div className=' bg-white p-4 rounded-xl'>
                <Image src={'/TopBrandsDeal/puma.png'} width={123} height={69} alt='brand image'/>
              </div>
            </div>
        </div>
    );
}

export default TopBrandsDeal