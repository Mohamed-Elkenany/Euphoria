"use client"
import React, { useState } from 'react'
import TitleSection from '../TitleSection'
import UserComment from '../useComment/UserComment';

function ProductDescription() {
    const [selection, setSelection] = useState('description');
    return (
        <div>
            <div className='py-12'>
                <TitleSection title={"Product Description"} />
            </div>
            <div className='flex items-start justify-between text-colorGrayThree font-semibold text-lg'>
                <div className='flex-1'>
                    <div className={`w-full mb-[40px] ${selection === "description" ? 'after:left-0 after:w-[50px]' : selection === "Question" ? 'after:left-2/3 after:w-[100px]' : 'after:left-1/3 after:w-[70px]'} flex items-center pb-4 relative after:absolute after:bottom-0 after:h-[3px] after:rounded-full after:bg-colorPink after:duration-200`}>
                        <label htmlFor="description" className='flex-1 text-nowrap cursor-pointer'>
                            <div>
                                <input onChange={(e) => setSelection(e.target.value)} className='hidden' type="radio" name="description" id="description" value={'description'} />
                                <h1 className={`${selection === "description" && 'text-colorGrayOne'}`}>Description</h1>
                            </div>
                        </label>
                        <label htmlFor="Usercomments" className='flex-1 text-nowrap cursor-pointer'>
                            <div>
                                <input onChange={(e) => setSelection(e.target.value)} className='hidden' type="radio" name="description" id="Usercomments" value={'userComments'} />
                                <h1 className={`${selection === "userComments" && 'text-colorGrayOne'}`}>User comments</h1>
                            </div>
                        </label>
                        <label htmlFor="Question" className='flex-1 text-nowrap cursor-pointer'>
                            <div>
                                <input onChange={(e) => setSelection(e.target.value)} className='hidden' type="radio" name="description" id="Question" value={'Question'} />
                                <h1 className={`${selection === "Question" && 'text-colorGrayOne'}`}>Question & Answer</h1>
                            </div>
                        </label>
                    </div>
                    <div className={`${selection==='description' ? 'block' : 'hidden'}`}>
                        <p className='line-clamp-4 text-[16px] text-colorGrayTwo font-normal'>100% Bio-washed Cotton – makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide  all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.</p>
                    </div>
                    <div className={`${selection==='userComments' ? 'block' : 'hidden'}`}>
                        <UserComment/>
                    </div>
                    <div className={`${selection==='Question' ? 'block' : 'hidden'}`}>
                        <p className='text-center text-[34px] text-colorGrayFour'>No Question Yet</p>
                    </div>
                    <div className='bg-colorGrayFour grid grid-cols-3 rounded-xl my-6'>
                        <div className='flex flex-col items-start gap-y-1 border-b border-colorGrayFive p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Fabric</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Bio-washed Cotton</h2>
                        </div>
                        <div className='flex flex-col items-start gap-y-1 border-b border-l border-colorGrayFive p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Pattern</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Printed</h2>
                        </div>
                        <div className='flex flex-col items-start gap-y-1 border-b border-l border-colorGrayFive p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Fit</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Regular-fit</h2>
                        </div>
                        <div className='flex flex-col items-start gap-y-1 p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Neck</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Round Neck</h2>
                        </div>
                        <div className='flex flex-col items-start border-l border-colorGrayFive gap-y-1 p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Sleeve</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Half-sleeves</h2>
                        </div>
                        <div className='flex flex-col items-start border-l border-colorGrayFive gap-y-1 p-6'>
                            <h4 className='text-[16px] font-normal text-colorGrayThree'>Style</h4>
                            <h2 className='text-colorGrayOne text-[16px] font-medium'>Casual Wear</h2>
                        </div>
                    </div>
                </div>
                <div className='pl-8'>
                    <video autoPlay={true} loop={true} style={{ width: '600px' }} className=' rounded-xl'>
                        <source src="/videoProduct.mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription