"use client"
import React from 'react'
import { FaBagShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import TitleSection from '../TitleSection';
import { logoutAction } from '@/app/_data/actions/auth-actions';
function MyAccountSidebar() {
  const pathname = usePathname();
  const user = useSelector(state => state.rootReducer.userSlice?.user);
  const navLink = [
    {
      path: "/my_account/my_orders",
      name: "My Orders",
      icon: <FaBagShopping />,
    },
    {
      path: "/my_account/wishlist",
      name: "Wishlist",
      icon: <CiHeart />,
    },
    {
      path: "/my_account/Personal_Info",
      name: "My Info",
      icon: <GoPerson />,
    },
  ];
  return (
    <div className='pr-8 w-1/4'>
      <div className='mb-5'>
        <div className='text-[20px]'>
        <TitleSection title={user?.user.username} textSize={25} />
        </div>
        <p className='mt-5 text-[14px] font-normal text-colorGrayTwo tracking-wider'>Welcome to your Account</p>
      </div>
      <nav>
        {
          navLink.map((nav, i) => (
            <div key={i} className='mb-2'>
              <Link href={nav.path}>
                <button className={`relative after:left-0 after:top-0 after:h-full after:w-1 after:bg-colorPink after:rounded-t-xl after:rounded-b-xl tracking-wider ${pathname === nav.path ? 'bg-colorGrayFour text-colorGrayOne after:absolute' : 'text-colorGrayThree'} w-full flex items-center gap-x-4 text-[18px] font-medium py-2 rounded-r-xl pl-6 duration-200`}>
                  <div className='text-[24px]'>{nav.icon}</div>
                  <h5>{nav.name}</h5>
                </button>
              </Link>
            </div>
          ))
        }
        <button onClick={()=>logoutAction()} className={`w-full flex items-center gap-x-6 text-[18px] font-medium py-3 rounded-r-xl pl-6 text-colorGrayThree`}>
          <div className='text-[24px]'><MdOutlineLogout/></div>
          <h5>Sign Out</h5>
        </button>
      </nav>
    </div>
  );
}

export default MyAccountSidebar