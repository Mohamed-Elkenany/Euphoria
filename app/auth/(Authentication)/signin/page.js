import React from 'react'
import Image from 'next/image'
import SigninForm from '@/app/_components/signinForm/SigninForm';


function SignIn() {
  
  return (
    <div className='flex items-center'>
      <div className='flex-1 pr-24 max-md:hidden'>
        <Image src={'/signIn.png'} width={695} height={956} alt='signIn image' className='max-w-full' />
      </div>
      <div className='flex-1 pt-12 max-md:px-12'>
        <SigninForm />
      </div>
    </div>
  );
}

export default SignIn