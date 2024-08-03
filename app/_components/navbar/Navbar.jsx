import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavButton from "./NavButton";
import NavLink from "./NavLink";
import Search from "./Search";
import getUserMeLoader from "@/app/_data/actions/getUserMeLoader";

async function Navbar() {
  const user = await getUserMeLoader();
  return (
    <div className="py-2 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col max-w-screen-xl mx-auto max-xl:px-6">
        <div className="flex items-center justify-between md:mb-4">
          <Search />
          <div className="flex-1 flex items-center justify-center">
            <Link href={"/"}>
              <Image src={"/logo.png"} width={93} height={45} alt="logo" />
            </Link>
          </div>
          <NavButton user={user} />
        </div>
        <div className="flex items-center justify-center max-lg:hidden">
          <nav>
            <NavLink />
          </nav>
        </div>
      </div>
      {/* <div style={{ clipPath: `${openMeun ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)'}` }} className='absolute max-sm:top-[60px] top-[70px] left-0 w-full bg-white shadow-lg pb-4 duration-500 lg:hidden'>
                <ul className='flex flex-col items-center gap-4 font-semibold text-lg text-colorGrayThree'>
                    {
                        navLink.map((link, i) => (
                            <li key={i}>
                                <Link href={link.path}>
                                    <h6 className={`first-letter:uppercase ${pathname === link.path && 'text-colorGrayOne'}`}>{link.name}</h6>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div style={{ clipPath: `${openSearch ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)'}` }} className='absolute max-sm:top-[55px] top-[70px] left-0 w-full bg-white shadow-lg pb-4 duration-500 md:hidden'>
                <div htmlFor="search" className='border-b flex items-center w-full px-2'>
                    <input type="text" name="searchInput" id="sreach" className='outline-none w-full placeholder:text-center' placeholder='What are you looking for?' />
                    <button className='text-colorGrayTwo text-xl flex items-center justify-center hover:bg-colorPink hover:text-colorGrayFive rounded-full p-2 duration-75'><IoSearchOutline className='bg-transparent' /></button>
                </div>
            </div> */}
    </div>
  );
}

export default Navbar;
