"use client";

import { userSelector } from "@/recoil/user";
import { removeCookie } from "@/util/authCookie";
import { isDev } from "@/util/util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../button/Button";

const Menu = () => {
  const getRole = useRecoilValue(userSelector("role"));

  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));
  const router = useRouter();

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

  return (
    <div className="flex gap-6 text-[14px]">
      {isDev && <Link href="/modal">모달 임시</Link>}
      {getIsLogin && getRole === "ROLE_REGISTRANT" && (
        <Link href="/event_regist">이벤트 등록</Link>
      )}
      {!getIsLogin && (
        <div>
          <Button className="text-black bg-white border w-100">
            <Link href="/regist">회원가입</Link>
          </Button>
        </div>
      )}
      <div>
        <Button className="font-bold w-100" onClick={auth}>
          {getIsLogin ? "로그아웃" : "로그인"}
        </Button>
      </div>
      {getIsLogin && (
        <Link href="/mypage/reserve" onClick={handleMyPageClick}>
          마이페이지
        </Link>
      )}
      {getIsLogin && <Link href="/reserve">예약확인/취소</Link>}
    </div>
  );
};

export default Menu;
