import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='py-[200px] flex flex-col items-center justify-center'>
      <div className='relative w-[200px]'>
        <div className=' absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[200px] font-bold flex items-center gap-x-1'>
          <h1 className=' text-colorGrayOne'>4</h1>
          <h1 className=' text-colorGrayFive'>0</h1>
          <h1 className=' text-colorGrayOne rotate-[30deg]'>4</h1>
        </div>
        <Image src={'/errorPage.jpg'} width={181} height={257} className='w-full rounded-bl-[120px]' alt='error image'/>
      </div>
      <div className='text-center mt-6'>
        <h1 className='text-[34px] font-bold text-colorGrayOne'>Oops! Page not found</h1>
        <p className='text-center w-[500px] mt-2 mb-12 text-colorGrayThree'>The page you are looking for might have been removed or temporarily unavailable.</p>
        <Link href={'/'}><button className='bg-colorPink text-colorGrayFive px-12 py-3 rounded-lg'>Back to HomePage</button></Link>
      </div>
    </div>
  )
}

export default NotFound