
import Link from 'next/link';
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { MdPhoneIphone } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

import Image from 'next/image';

function Footer() {
    return (
        <div className='bg-colorGrayOne'>
            <div className='max-w-screen-xl mx-auto pt-16'>
                <div className='w-full flex items-start justify-around text-colorGrayFour mb-28'>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-[28px] font-bold mb-12'>Need Help</h1>
                        <div>
                            <ul className='text-[18px] font-medium text-colorGrayThree flex flex-col gap-y-5'>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Contact Us</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Track Order</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Returns & Refunds</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>{`FAQ's`}</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Career</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-[28px] font-bold mb-12'>Company</h1>
                        <div>
                            <ul className='text-[18px] font-medium text-colorGrayThree flex flex-col gap-y-5'>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>About Us</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>euphoria Blog</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>euphoriastan</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Collaboration</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Media</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-[28px] font-bold mb-12'>More Info</h1>
                        <div>
                            <ul className='text-[18px] font-medium text-colorGrayThree flex flex-col gap-y-5'>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Term and Conditions</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Privacy Policy</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Shipping Policy</Link></li>
                                <li className='hover:text-colorGrayFive'><Link href={'/'}>Sitemap</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-[28px] font-bold mb-12'>Location</h1>
                        <div>
                            <ul className='text-[18px] font-medium text-colorGrayThree flex flex-col gap-y-5'>
                                <li className='hover:text-colorGrayFive'>support@euphoria.in</li>
                                <li className='hover:text-colorGrayFive'>Eklingpura Chouraha, Ahmedabad Main Road</li>
                                <li className='hover:text-colorGrayFive'>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex items-end px-12'>
                    <div className='flex-[3] flex items-center gap-4'>
                        <button className='flex items-center justify-center p-2 text-colorGrayOne bg-colorGrayFour rounded-lg text-xl'><FaFacebookF/></button>
                        <button className='flex items-center justify-center p-2 text-colorGrayOne bg-colorGrayFour rounded-lg text-xl'><FaXTwitter/></button>
                        <button className='flex items-center justify-center p-2 text-colorGrayOne bg-colorGrayFour rounded-lg text-xl'><FaInstagram/></button>
                        <button className='flex items-center justify-center p-2 text-colorGrayOne bg-colorGrayFour rounded-lg text-xl'><GrLinkedinOption/></button>
                    </div>
                    <div className='flex-[2] pl-20 text-colorGrayFive'>
                        <h1 className='text-[28px] font-bold mb-12'>Download The App</h1>
                        <div className='flex items-center gap-x-12'>
                            <div className='flex items-center gap-2 text-colorGrayFive'>
                                <div>
                                    <Image src={'/Group.png'} width={31} height={34} className='w-full' alt='google play'/>
                                </div>
                                <div>
                                    <p className='text-[10px]'>android app on</p>
                                    <p className='text-[18px]'>Google Play</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='text-[35px]'>
                                    <MdPhoneIphone/>
                                </div>
                                <div>
                                    <p className='text-[10px]'>Available on the</p>
                                    <p className='text-[18px]'>App Store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' border-b border-t border-colorGrayThree w-full mt-12 flex items-center justify-between px-12 text-colorGrayThree py-6'>
                    <h1 className='text-[24px] font-bold'>Popular Categories</h1>
                    <button><SlArrowDown/></button>
                </div>
                <div className='text-center py-12'>
                    <h1 className='text-[18px] font-bold text-colorGrayTwo'>Copyright © 2024 Euphoria Folks Pvt Ltd. All rights reserved.</h1>
                </div>
            </div>
        </div>
    );
}

export default Footer