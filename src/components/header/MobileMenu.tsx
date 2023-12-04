import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="fixed bottom-0 z-auto w-full bg-white border-t border-gray-200 h-50">
      <div className="grid h-full grid-cols-3 mx-auto mt-5 ">
        <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-1 text-xl text-center text-gray-500 dark:text-gray-400 hover:text-blue-600">
                <IoHome />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 ">
                둘러보기
              </div>
            </div>
          </Link>
        </div>
        <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-1 text-xl text-center text-gray-500 dark:text-gray-400 hover:text-blue-600">
                <FaSearch />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 ">
                검색하기
              </div>
            </div>
          </Link>
        </div>
        <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-1 text-xl text-center text-gray-500 dark:text-gray-400 hover:text-blue-600">
                <FaRegCircleUser />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 ">
                로그인
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
