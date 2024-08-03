import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { GoArrowRight } from "react-icons/go";

function CateCard({ cate }) {
    return (
        <div>
            <div className='h-[420px] overflow-hidden rounded-xl'>
                <Image src={cate.attributes.cateImage.data.attributes.url} width={cate.attributes.cateImage.data.attributes.width} height={cate.attributes.cateImage.data.attributes.height} className='w-full h-full' alt='category iamge' />
            </div>
            <Link href={`${cate.attributes.forMen ? `/shop/men?cate=${cate.attributes.cateName}` : `/shop/women?cate=${cate.attributes.cateName}`}`}>
                <div className='py-6'>
                    <div className='flex items-end justify-between'>
                        <h3 className='text-[18px] font-bold text-colorGrayOne'>{cate.attributes.cateName}</h3>
                        <GoArrowRight className=' text-colorGrayThree text-xl'/>
                    </div>
                    <span className='text-sm text-colorGrayThree'>Explore Now!</span>
                </div>
            </Link>
        </div>
    );
}

export default CateCard