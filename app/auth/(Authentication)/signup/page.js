import Image from 'next/image'
import SignUpForm from '@/app/_components/signUpForm/SignUpForm';

function SignUp() {
    return (
        <div className='flex pt-[105px]'>
            <div className='flex-1 pr-24 max-md:hidden'>
                <Image priority src={'/signup.png'} width={695} height={956} alt='signIn image' className='w-full' />
            </div>
            <div className='flex-1 pt-12 max-md:px-12'>
                <SignUpForm/>
            </div>
        </div>
    );
}

export default SignUp