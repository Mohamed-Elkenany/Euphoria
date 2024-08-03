"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
function SliderForProduct({ arrayOfImage }) {
    const [mainImage, setMainImage] = useState(arrayOfImage[0]);
    useEffect(() => {
       setMainImage(arrayOfImage[0]) 
    },[arrayOfImage])
    return (
        <div className="slider-container flex items-center gap-x-7">
            <div className='flex flex-col gap-y-4'>
                {
                    arrayOfImage.map((image, i) => (
                        <div key={i}>
                            <button onClick={() => setMainImage(image)} className={`w-[60px] p-1 rounded ${mainImage===image ? 'border-2 border-colorGrayOne' : ''}`}>
                                <Image src={image.attributes.url} width={image.attributes.width} height={image.attributes.height} alt='product image' className='w-full rounded' />
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className='rounded'>
                <Image src={mainImage.attributes.url} width={mainImage.attributes.width} height={mainImage.attributes.height} alt='product image' className='w-full rounded' />
            </div>
        </div>
    );
}

export default SliderForProduct