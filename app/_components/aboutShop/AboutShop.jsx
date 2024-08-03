"use client"
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection';

function AboutShop() {
    const pathname = usePathname();
    const params = useParams();
    const [clothesFor, setclothesFor] = useState('');
    useEffect(() => {
        if (pathname.split('/').includes('men')) {
            setclothesFor('Men')
        } else if (pathname.split('/').includes('women')) {
            setclothesFor('Women')
        } else {
            setclothesFor('')
        }
    },[pathname])
    return (
        <div className={`${params.productId && 'hidden'} mb-[70px]`}>
            <div className='mb-[70px]'>
                <div>
                    <TitleSection title={clothesFor ? `Clothing for ${clothesFor} Online in Egypt` : 'Clothing Online in Egypt'} />
                </div>
                <div className=' pl-8'>
                    <p className='py-6 text-[20px] font-bold text-colorGrayThree'>{`Reexplore Women's Clothing Collection Online at Euphoria`}</p>
                    <p className='text-[16px] font-extralight text-colorGrayTwo'>{`Women's Clothing – Are you searching for the best website to buy Clothing for Women online in India? Well, your search for the coolest and most stylish womens clothing ends here. From trendy Casual Womens Wear Online shopping to premium quality cotton women's apparel, Euphoria has closet of Women Collection covered with the latest and best designs of Women's Clothing Online.`}</p>
                    <p className='text-[16px] font-extralight text-colorGrayTwo py-6'>{`Our collection of clothes for women will make you the trendsetter with an iconic resemblance of choice in Womens Wear.`}</p>
                    <p className='text-[16px] font-semibold text-colorGrayTwo'>One-Stop Destination to Shop Every Clothing for Women: Euphoria</p>
                    <p className='text-[16px] font-extralight text-colorGrayTwo py-6'>{`Today, Clothing for Women is gaining more popularity above all. This is because gone are the days when women were used to carrying uncomfortable fashion. Today, a lady looks prettier when she is in Casual Womens Wear which is a comfortable outfit. Concerning this, Euphoria has a big fat range of Stylish Women's Clothing that would make her the winner wherever she goes. `}</p>
                    <p className='text-[16px] font-extralight text-colorGrayTwo'>Our collection of clothes for women will make you the trendsetter with an iconic resemblance of choice in Womens Wear. It is quite evident to say that there are very few Womens Clothing online stores where you can buy Western Wear for Women comprising the premium material and elegant design that you are always seeking for. Basically, </p>
                </div>
            </div>
            <div>
                <div className='mb-[70px]'>
                    <TitleSection title={clothesFor ? `Buy ${clothesFor}'s Clothing at Best Price` : "Buy Clothing at Best Price"} />
                </div>
                <div className='bg-colorGrayFour w-full grid grid-cols-5 rounded-lg ml-8'>
                    <div className='col-span-4'>
                        <div className='border-b border-colorGrayFive pl-16 py-8 w-full'>
                            <h2 className='text-colorGrayOne text-[24px] font-bold'>{`Women's Clothing`}</h2>
                        </div>
                        <ul className='flex flex-col items-start gap-y-10 py-12 text-colorGrayTwo text-[20px] pl-16'>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                            <li><h1>Pick Any 4- Womens Plain T-shirt Combo</h1></li>
                        </ul>
                    </div>
                    <div className='border-l border-colorGrayFive col-span-1 flex flex-col items-center'>
                        <div className='border-b border-colorGrayFive py-8 w-full flex items-center justify-center'>
                            <h2 className='text-colorGrayOne text-[24px] font-bold'>Best Price</h2>
                        </div>
                        <ul className='flex flex-col items-center gap-y-10 py-12 text-colorGrayTwo text-[20px]'>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            <li><h1>EGP1000</h1></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutShop