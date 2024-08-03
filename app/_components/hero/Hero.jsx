"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';
import  hero1 from "@/public/heroBanner/hero1.webp";
import  hero2 from "@/public/heroBanner/hero2.webp";
function Hero() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };
    return (
        <div className='max-w-screen-xl mx-auto mb-[120px]'>
            <div className="slider-container mb-[30px] rounded-lg overflow-hidden">
                <Slider {...settings} className='outline-none'>
                    <div className='relative h-[750px]'>
                        <div className='absolute bottom-[100px] left-0 w-full flex flex-col items-center justify-center'>
                            <div className=' w-fit mx-auto text-center'>
                                <h1 className='uppercase text-[70px] text-white font-bold tracking-tighter'>summer 2024</h1>
                                <h1 className='uppercase text-[40px] text-white font-medium tracking-tighter'>NEW LOWER PRICES</h1>
                            </div>
                            <p className='text-white text-center mb-4'>Set the mood for the season</p>
                            <Link href={'/shop/women'}><button className='flex items-center justify-center px-3 py-2 bg-colorPink text-white'>{`Women's Shop`}</button></Link>
                        </div>
                        <Image src={hero1} width={2052} height={1368} alt='hero banner' className='w-full h-full rounded-lg' />
                    </div>
                    <div className='relative h-[750px]'>
                        <div className='absolute bottom-[100px] left-0 w-full flex flex-col items-center justify-center'>
                            <div className=' w-fit mx-auto text-center'>
                                <h1 className='uppercase text-[70px] text-white font-bold tracking-tighter'>summer 2024</h1>
                                <h1 className='uppercase text-[40px] text-white font-medium tracking-tighter'>NEW LOWER PRICES</h1>
                            </div>
                            <p className='text-white text-center mb-4'>Set the mood for the season</p>
                            <Link href={'/shop/men'}><button className='flex items-center justify-center px-3 py-2 bg-colorPink text-white'>{`Men's Shop`}</button></Link>
                        </div>
                        <Image src={hero2} width={2052} height={1368} alt='hero banner' priority={true} className='w-full h-full rounded-lg' />
                    </div>
                </Slider>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex-1 relative rounded-lg overflow-hidden'>
                    <div className='absolute left-8 top-0 h-full text-white flex flex-col items-start justify-around py-[40px]'>
                        <h6 className='font-extrabold tracking-wide text-[18xx]'>Low Price</h6>
                        <div>
                            <h1 className='text-[34px] font-extrabold mb-4'>High Coziness</h1>
                            <span className='text-[16px] font-medium'>UPTO 50% off</span>
                        </div>
                        <h3 className='text-[16px] font-medium underline'>Explor Items</h3>
                    </div>
                    <Image src={'/heroBanner/hero3.jpg'} width={605} height={357} alt='hero image' className='w-full rounded-lg'/>
                </div>
                <div className='flex-1 relative rounded-lg overflow-hidden'>
                <div className='absolute left-8 top-0 h-full text-white flex flex-col items-start justify-around py-[40px]'>
                        <h6 className='font-extrabold tracking-wide text-[18xx]'>Low Price</h6>
                        <div>
                            <h1 className='text-[34px] font-extrabold mb-4'>Breezy Summer <span className='line-clamp-2'>Style</span></h1>
                            <span className='text-[16px] font-medium'>UPTO 50% off</span>
                        </div>
                        <h3 className='text-[16px] font-medium underline'>Explor Items</h3>
                    </div>
                    <Image src={'/heroBanner/hero4.jpg'} width={605} height={357} alt='hero image' className='w-full rounded-lg'/>
                </div>
            </div>
        </div>
    );
}

export default Hero