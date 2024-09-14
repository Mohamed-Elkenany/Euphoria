"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function NavLink() {
    const pathname = usePathname();
    const navLink = [
        {
            name: "shop",
            path: '/shop'
        },
        {
            name: "men",
            path: '/shop/men'
        },
        {
            name: "women",
            path: '/shop/women'
        },
        {
            name: "euphoria Home",
            path: '/'
        },
        {
            name: "sports",
            path: '/shop/sports'
        },
        {
            name: "sale",
            path: '/shop/sale'
        },
        {
            name: "about Us",
            path: '/about_us'
        },
    ];
    return (
        <ul className='flex items-center max-sm:justify-center max-sm:flex-col gap-8 font-medium max-sm:text-base text-lg text-colorGrayThree'>
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
    );
}

export default NavLink