"use client"
import React from 'react'
import TitleSection from '../TitleSection'
import Image from 'next/image';
import { GoArrowDown } from "react-icons/go";
import Link from 'next/link';

function BigSavingZone() {
    return (
        <div className='max-w-screen-xl mx-auto mb-[120px]'>
            <div className='mb-[70px]'>
                <TitleSection title={'Big Saving Zone'} />
            </div>
            <div className='flex flex-col gap-y-6 mb-[70px]'>
                <div className='flex items-center gap-x-6'>
                    <div className='flex-1 relative rounded-xl overflow-hidden'>
                        <div className='absolute left-4 top-1/2 -translate-y-1/2 text-white flex flex-col items-start gap-y-3'>
                            <h3 className='text-[25px] font-bold tracking-wide'>Hawaiian <span className='line-clamp-2'>Shirts</span></h3>
                            <p className=' text-[12px] font-semibold'>Dress up in summer vibe</p>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <p className=' text-[18px] font-bold'>UPTO 50% OFF</p>
                                <div className='flex flex-col items-center gap-y-5 w-fit'>
                                    <div className='animate-bounce text-3xl'><GoArrowDown /></div>
                                    <Link href={'/'}>
                                        <button className='text-[12px] font-medium px-6 py-2 border border-white rounded-md'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image src={'/bigSaveZone/bigSaveZone1.png'} width={400} height={394} alt='bigSaveZone' className='w-full' />
                    </div>
                    <div className='flex-1 relative rounded-xl overflow-hidden'>
                        <div className='absolute right-4 top-1/2 -translate-y-1/2 text-white flex flex-col items-end gap-y-3'>
                            <div className='text-[10px] font-bold bg-colorGrayOne rounded-md p-2'>Limited Stock</div>
                            <h3 className='text-[25px] font-bold tracking-wide'>Printed<span className='line-clamp-2'>T-Shirt</span></h3>
                            <p className=' text-[12px] font-semibold'>New Designs Every Week</p>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <p className=' text-[18px] font-bold'>UPTO 40% OFF</p>
                                <div className='flex flex-col items-center gap-y-5 w-fit'>
                                    <div className='animate-bounce text-3xl'><GoArrowDown /></div>
                                    <Link href={'/'}>
                                        <button className='text-[12px] font-medium px-6 py-2 border border-white rounded-md'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image src={'/bigSaveZone/bigSaveZone2.png'} width={400} height={394} alt='bigSaveZone' className='w-full' />
                    </div>
                    <div className=' flex-1 relative rounded-xl overflow-hidden'>
                        <div className='absolute right-4 top-1/2 -translate-y-1/2 text-colorGrayOne flex flex-col  gap-y-3'>
                            <h3 className='text-[25px] font-bold tracking-wide'>Cargo<span className='line-clamp-2'>Joggers</span></h3>
                            <p className=' text-[12px] font-semibold'>Move with style & comfort</p>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <p className=' text-[18px] font-bold'>UPTO 50% OFF</p>
                                <div className='flex flex-col items-center gap-y-5 w-fit'>
                                    <div className='animate-bounce text-3xl'><GoArrowDown /></div>
                                    <Link href={'/'}>
                                        <button className='text-[12px] font-medium px-6 py-2 border border-colorGrayOne rounded-md'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image src={'/bigSaveZone/bigSaveZone3.png'} width={400} height={394} alt='bigSaveZone' className='w-full' />
                    </div>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='flex-1 relative rounded-xl overflow-hidden'>
                        <div className='absolute left-2/3 top-1/2 -translate-y-1/2 text-colorGrayOne flex flex-col  gap-y-3'>
                            <h3 className='text-[25px] font-bold tracking-wide'>Urban<span className='line-clamp-2'>Shirts</span></h3>
                            <p className=' text-[12px] font-semibold'>Live In Confort</p>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <p className=' text-[18px] font-bold'>FLAT 60% OFF</p>
                                <div className='flex flex-col items-center gap-y-5 w-fit'>
                                    <div className='animate-bounce text-3xl'><GoArrowDown /></div>
                                    <Link href={'/'}>
                                        <button className='text-[12px] font-medium px-8 py-2 border border-colorGrayOne rounded-md'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image src={'/bigSaveZone/bigSaveZone4.png'} width={400} height={394} alt='bigSaveZone' className='w-full' />
                    </div>
                    <div className='flex-1 relative rounded-xl overflow-hidden'>
                        <div className='absolute left-2/3 top-1/2 -translate-y-1/2 text-colorGrayOne flex flex-col  gap-y-3'>
                            <h3 className='text-[25px] font-bold tracking-wide'>Cargo<span className='line-clamp-2'>Joggers</span></h3>
                            <p className=' text-[12px] font-semibold'>Move with style & comfort</p>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <p className=' text-[18px] font-bold'>UPTO 50% OFF</p>
                                <div className='flex flex-col items-center gap-y-5 w-fit'>
                                    <div className='animate-bounce text-3xl'><GoArrowDown /></div>
                                    <Link href={'/'}>
                                        <button className='text-[12px] font-medium px-8 py-2 border border-colorGrayOne rounded-md'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image src={'/bigSaveZone/bigSaveZone5.png'} width={400} height={394} alt='bigSaveZone' className='w-full' />
                    </div>
                </div>
            </div>
            <div className='flex items-start rounded-xl overflow-hidden'>
                <div className='flex-1 relative'>
                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white w-full'>
                        <div className='w-3/4 mx-auto flex flex-col items-start gap-y-8'>
                            <h1 className='text-[30px] font-bold w-fit'>WE MADE YOUR EVERYDAY <span className='line-clamp-2'>FASHION BETTER!</span></h1>
                            <p className='text-[20px] font-thin text-colorGrayThree'>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                            <Link href={'/'}><button className='bg-colorGrayFive text-colorGrayOne rounded-md px-8 py-2 w-fit'>Shop Now</button></Link>
                        </div>
                    </div>
                    <Image src={'/bigSaveZone/bigSaveZone6.png'} width={614} height={640} className='w-full h-[600]' alt='bigSaveZone' />
                </div>
                <div className='flex-1'>
                    <Image src={'/bigSaveZone/signup.png'} width={614} height={640} className='w-full rounded-r-xl' alt='bigSaveZone' />
                </div>
            </div>
        </div>
    );
}

export default BigSavingZone