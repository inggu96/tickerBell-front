"use client";

import { userInfoApi } from "@/api/users";
import { parseJwt } from "@/hooks/useParseJwt";
import { userSelector } from "@/recoil/user";
import { getCookie, removeCookie } from "@/util/authCookie";
import { epochConvert } from "@/util/epochConverter";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

// 로그인 체크용 컴포넌트
const LoginCheck = () => {
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const setRole = useSetRecoilState(userSelector("role"));
  const setName = useSetRecoilState(userSelector("name"));
  const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie("ticket-atk");
    const refreshToken = getCookie("ticket-rtk");

    if (accessToken && refreshToken) {
      userInfoApi(accessToken)
        .then((res) => {
          setRole(res?.data.role);
          setName(res?.data.name);
          setIsLogin(true);
        })
        .catch(() => {
          removeCookie("ticket-atk");
          removeCookie("ticket-rtk");
          setIsLogin(false);
          router.push("/login");
        });
    } else {
      setIsLogin(false);
      removeCookie("ticket-atk");
      removeCookie("ticket-rtk");
    }
  }, [setIsLogin, setRole, setName, router]);

  return null;
};

export default LoginCheck;
