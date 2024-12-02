'use client';
import React from "react";

import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname();
    return (
        <nav className="flex justify-center items-center space-x-8 py-4 bg-white shadow-md">
         <a
        href="/"
        className={`text-lg font-semibold border-b-4 border-transparent pb-2 transition duration-300 ${
          pathname === '/' ? 'text-gray-700' : 'text-gray-500'
        } hover:text-[#93A267] hover:border-[#93A267]`}
      >
        Trang chủ
      </a>
      <a
        href="/news"
        className={`text-lg font-semibold border-b-4 border-transparent pb-2 transition duration-300 ${
          pathname === '/news' ? 'text-gray-700' : 'text-gray-500'
        } hover:text-[#93A267] hover:border-[#93A267]`}
      >
        Tin tức
      </a>
      <a
        href="/handbook"
        className={`text-lg font-semibold border-b-4 border-transparent pb-2 transition duration-300 ${
          pathname === '/handbook' ? 'text-gray-700' : 'text-gray-500'
        } hover:text-[#93A267] hover:border-[#93A267]`}
      >
        Cẩm nang
      </a>
      <a
        href="/product"
        className={`text-lg font-semibold border-b-4 border-transparent pb-2 transition duration-300 ${
          pathname === '/product' ? 'text-gray-700' : 'text-gray-500'
        } hover:text-[#93A267] hover:border-[#93A267]`}
      >
        Chợ
      </a>
      <a
        href="/cart"
        className={`text-lg font-semibold border-b-4 border-transparent pb-2 transition duration-300 ${
          pathname === '/market' ? 'text-gray-700' : 'text-gray-500'
        } hover:text-[#93A267] hover:border-[#93A267]`}
      >
        Giỏ hàng
      </a>
      </nav>
    
    )
}

export default Navbar;


