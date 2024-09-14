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
    <div className="max-md:pt-2 md:py-2 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between sm:mb-4">
          <div className="flex-1 max-md:hidden">
          <Search />
          </div>
          <div className="md:flex-1 flex items-center justify-center max-sm:w-16">
            <Link href={"/"}>
              <Image src={"/logo.png"} width={93} height={45} alt="logo" />
            </Link>
          </div>
          <NavButton user={user} />
        </div>
        <div className="flex items-center justify-center max-sm:hidde">
          <nav>
            <NavLink />
          </nav>
        </div>
        <div className="w-full pt-2 lg:hidden">
          <Search/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
