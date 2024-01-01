"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbHome } from "react-icons/tb";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const path = usePathname();
  const [currentPath, setCurrentPath] = useState(path);

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  const isActive = (path: any) =>
    currentPath === path ? "text-blue-500" : "text-gray-500";

  return (
    <div className="fixed bottom-0 z-auto w-full bg-white border-t border-gray-200 h-50">
      <div className="grid h-full grid-cols-3 mx-auto mt-5 ">
        <div
          className={`inline-flex flex-col items-center justify-center px-5  group ${isActive(
            "/"
          )}`}
        >
          <Link href="/">
            <div className="flex flex-col items-center text-center">
              <p className="w-20 h-20 mb-1 text-xl text-center">
                <TbHome />
              </p>
              <p className="text-sm ">둘러보기</p>
            </div>
          </Link>
        </div>
        <div
          className={`inline-flex flex-col items-center justify-center px-5  group ${isActive(
            "/search"
          )}`}
        >
          <Link href="/search">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-1 text-xl text-center 0">
                <FaSearch />
              </div>
              <div className="text-sm  ">검색하기</div>
            </div>
          </Link>
        </div>
        <div
          className={`inline-flex flex-col items-center justify-center px-5  group ${isActive(
            "/login"
          )}`}
        >
          <Link href="/login">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-1 text-xl text-center 0">
                <FaRegCircleUser />
              </div>
              <div className="text-sm  ">로그인</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
