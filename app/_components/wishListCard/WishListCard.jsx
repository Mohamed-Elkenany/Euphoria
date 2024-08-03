import Image from 'next/image';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

function WishListCard({ product, removeFromWishlist }) {
    
  return (
    <div className='flex items-center justify-between border-b border-colorGrayFour pb-8 mb-8'>
      <div className='flex gap-x-3'>
        <div className='flex items-center gap-x-3 h-full'>
          <button onClick={() => removeFromWishlist(product.id)} className='flex items-center justify-center p-2 text-2xl text-colorGrayTwo hover:bg-colorGrayFour duration-100 rounded-full'><IoClose /></button>
          <div className='w-[100px] rounded-md overflow-hidden'>
            <Image src={product.imageColor?.url} width={product.imageColor?.width} height={product.imageColor?.height} alt='product image' className='w-full object-center' />
          </div>
        </div>
        <div className='flex flex-col justify-around text-colorGrayTwo'>
          <h3 className='text-[20px]'>{product.productName}</h3>
          <h4>Color: {product.color}</h4>
          <h4>{product.brandName}</h4>
        </div>
      </div>
      <div className='flex items-center gap-x-20'>
        <h5 className='text-[18px] text-colorGrayTwo'>EGP {product.price}</h5>
        <Link href={`/shop/${product.forMen ? 'men' : 'women'}/${product.id}`}>
          <button className=' bg-colorPink text-colorGrayFive px-4 py-2 rounded text-[16px]'>
              Show Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WishListCard