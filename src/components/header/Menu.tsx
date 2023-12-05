"use client";

import { userSelector } from "@/recoil/user";
import { getCookie, removeCookie } from "@/util/authCookie";
import { isDev } from "@/util/util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../button/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { BiUser } from "react-icons/bi";

const Menu = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const username = getCookie("username");

  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));

  const router = useRouter();
  const [dropMenu, setDropMenu] = useState(false);
  console.log("username", username);
  console.log("getRole", getRole);

  const toggleDropDown = () => {
    setDropMenu(!dropMenu);
  };

  const handleMyPageClick = (e: any) => {
    if (!getIsLogin) {
      e.preventDefault();
      alert("로그인 후 이용해주세요");
    }
  };

  const auth = () => {
    if (getIsLogin) {
      removeCookie("ticket-atk");
      removeCookie("ticket-rtk");
      setIsLogin(false);
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    console.log("getIsLogin", getIsLogin);
  }, [getIsLogin]);
  // useEffect(() => {
  //   if (!getIsLogin) {
  //     router.push("/login");
  //   }
  // }, [getIsLogin, router]);

  return (
    <div className="flex items-center gap-6 text-[14px]">
      {isDev && <Link href="/modal">모달 임시</Link>}

      {!getIsLogin && (
        <div className="gap-5">
          <Button className="text-black bg-white border w-100">
            <Link href="/regist">회원가입</Link>
          </Button>

          <Button className="font-bold w-100" onClick={auth}>
            로그인
          </Button>
        </div>
      )}

      {getIsLogin && (
        <div className="items-center ">
          <div className="relative ml-6">
            <div className="flex flex-row ">
              {getIsLogin && (
                <div className="flex items-center mr-5">
                  {username}님! 환영합니다.
                </div>
              )}
              <button
                aria-label="dropdown"
                className="relative flex items-center py-3 text-gray-600 border-b-2 border-transparent focus:outline-none focus:border-indigo-700 focus:text-indigo-700 hover:text-indigo-700"
                onClick={() => {
                  console.log(dropMenu);
                  toggleDropDown();
                }}
              >
                <div className="flex text-3xl transition duration-150 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:border-white">
                  <BiUser />
                </div>
                <div className="ml-2 ">
                  <FaAngleDown />
                </div>
              </button>
            </div>

            {dropMenu && (
              <ul className="absolute right-0 p-2 mt-16 bg-white border-r rounded shadow w-200 ">
                <li className="justify-center py-6 leading-3 text-center text-gray-600 cursor-pointer tex6-md hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                  <Link href="/mypage/modify" onClick={handleMyPageClick}>
                    마이페이지
                  </Link>
                </li>
                <li className="flex items-center justify-center py-6 mt-6 leading-3 text-center text-gray-600 cursor-pointer text-md hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                  <Link href="/mypage/reserve">예약확인/취소</Link>
                </li>
                <li className="flex items-center justify-center py-6 mt-6 leading-3 text-center text-gray-600 cursor-pointer text-md hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                  <Button className="font-bold w-100" onClick={auth}>
                    로그아웃
                  </Button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
      {getIsLogin && getRole === "ROLE_REGISTRANT" && (
        <Button>
          <Link href="/event_regist">이벤트 등록</Link>
        </Button>
      )}
    </div>
  );
};

export default Menu;
