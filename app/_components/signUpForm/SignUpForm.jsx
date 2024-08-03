"use client"
import React, { useState } from 'react'
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import Link from 'next/link';
import { registerActions } from '@/app/_data/actions/auth-actions';
import { useFormState } from 'react-dom';
import { TbBrandGithubFilled } from 'react-icons/tb';
import Image from 'next/image';
import ValidationError from '../validationError/ValidationError';

const INITIAL_STATE = {
    data: null
};

function SignUpForm() {
    const [formState, actionForm] = useFormState(registerActions, INITIAL_STATE);
    const [showPassword, SetShowPassword] = useState(false);
    const handleShowPassword = (e) => {
    e.preventDefault()
    SetShowPassword(showPassword => !showPassword);
    }
    return (
        <div>
            <div>
                <h1 className='text-[34px] max-md:text-[28px] text-colorGrayOne font-bold relative after:absolute after:h-2/3 after:w-2 after:bg-colorPink after:top-1/2 after:-translate-y-1/2 after:-left-4 after:rounded-full'>Sign Up Page</h1>
                <p className='text-colorGrayThree text-sm mt-2'>Sign up for free to access to in any of our products </p>
            </div>
            <div className='md:pr-[300px]'>
                <div className='border-b py-20 mb-12 relative'>
                    {
                        formState?.message &&
                        <div className='mb-2 text-[14px] tracking-wider font-medium text-red-600 text-center'>
                            <h1>{formState.message}</h1>
                        </div>
                    }
                    {
                        formState?.errorbackend &&
                        <div className='mb-2 text-[14px] tracking-wider font-medium text-red-600 text-center'>
                            <h1>{formState.errorbackend}</h1>
                        </div>
                    }
                    <span className='absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4'>Or</span>
                    <button className='flex items-center justify-center gap-2 text-colorPink mb-6 outline outline-colorPink outline-1 w-full rounded-lg py-4 hover:outline-none hover:bg-colorPink hover:text-colorGrayFive duration-100'>
                        <div>
                            <Image src={'/google.png'} width={21} height={20} alt='google' className='w-full' />
                        </div>
                        <h3>Continue With Google</h3>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-colorPink outline outline-colorPink outline-1 w-full rounded-lg py-4 hover:outline-none hover:bg-colorPink hover:text-colorGrayFive duration-100'>
                        <TbBrandGithubFilled className='text-colorGrayOne text-xl' />
                        <h3>Continue With Github</h3>
                    </button>
                </div>
                <div>
                    <div>
                        {
                            formState?.backendError &&
                            <div className='mb-2 text-[14px] tracking-wider font-medium text-red-600 text-center'>
                                <h1>{formState.backendError}wwwwwwwwww</h1>
                            </div>
                        }
                        <form action={actionForm} className='flex flex-col gap-y-4'>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='username' className='text-sm text-colorGrayOne font-semibold mb-2'>User name</label>
                                <input type='text' id='username' name='username' className='w-full outline outline-1 outline-colorGrayTwo focus:outline-colorPink rounded-lg py-3 px-4' />
                                {
                                    formState?.zodErrors?.username &&
                                    <ValidationError errorMessage={formState.zodErrors.username[0]} />
                                }
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='email' className='text-sm text-colorGrayOne font-semibold mb-2'>email address</label>
                                <input type='email' id='email' name='email' className='w-full outline outline-1 outline-colorGrayTwo focus:outline-colorPink rounded-lg py-3 px-4' />
                                {
                                    formState?.zodErrors?.email &&
                                    <ValidationError errorMessage={formState.zodErrors.email[0]} />
                                }
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <label htmlFor='password' className='text-sm text-colorGrayOne font-semibold mb-2'>Password</label>
                                    <button onClick={handleShowPassword}>
                                        {
                                            showPassword ?
                                                <div className='flex items-center text-colorGrayTwo'>
                                                    <BsEyeSlash className='mr-1' />
                                                    <h6>Hidden Password</h6>
                                                </div>
                                                :
                                                <div className='flex items-center text-colorGrayTwo'>
                                                    <BsEye className='mr-1' />
                                                    <h6>Show Password</h6>
                                                </div>
                                        }
                                    </button>
                                </div>
                                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full outline outline-1 outline-colorGrayTwo focus:outline-colorPink rounded-lg py-3 px-4' />
                                {
                                    formState?.zodErrors?.password &&
                                    <ValidationError errorMessage={formState.zodErrors.password[0]} />
                                }
                                <div className='flex items-end w-full mt-2'>
                                    <p className=' text-colorGrayThree text-xs'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                </div>
                            </div>
                            <div>
                                <fieldset>
                                    <div className="space-y-2">
                                        <label htmlFor="Option1" className="flex cursor-pointer items-start gap-4">
                                            <div className="flex items-center">
                                                &#8203;
                                                <input type="checkbox" className="size-4 rounded border-gray-300" id="Option1" />
                                            </div>

                                            <div>
                                                <strong className="font-medium text-colorGrayTwo text-sm select-none">Agree to our <span className='text-colorPink underline'>Terms of use</span> and <span className='text-colorPink underline'>Privacy Policy</span></strong>
                                            </div>
                                        </label>

                                        <label htmlFor="Option2" className="flex cursor-pointer items-start gap-4">
                                            <div className="flex items-center">
                                                &#8203;
                                                <input type="checkbox" className="size-4 rounded border-gray-300" id="Option2" />
                                            </div>

                                            <div>
                                                <strong className="font-medium text-colorGrayTwo text-sm select-none">Subscribe to our monthly newsletter </strong>
                                            </div>
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div className='pb-4'>
                                    <input type='submit' value={'Sign Up'} className='px-6 py-2 bg-colorPink rounded-lg text-white cursor-pointer' />
                                    <p className='mt-1 text-sm text-colorGrayOne'>Already have an  account? <span className='underline text-colorPink'><Link href={'/auth/signin'}>Sign In</Link></span></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm