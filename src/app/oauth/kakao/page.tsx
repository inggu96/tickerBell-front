"use client";
import apiInstance from "@/util/useInterceptor";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { atom, useRecoilState } from "recoil";
import { userState } from "@/recoil/user";
import { setCookie } from "@/util/authCookie";
import { toast } from "react-toastify";

const Index = () => {
  const [valid, setValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // code 추출부분
    const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
    console.log("카카오 코드", KAKAO_CODE);
    const postCode = async () => {
      try {
        // 인가코드 서버로 보내주기
        const response = await apiInstance.get(`/login/oauth2/code/kakao`, {
          params: { code: KAKAO_CODE },
        });

        console.log("응답", response);

        // 회원가입 유무 판단
        // 이미 있는 계정이라면 서버에서 액세스 토큰 받고 홈으로 이동한다.
        if (response.data.isMember == true) {
          try {
            setCookie("ticket-atk", response.data.accessToken);
            router.push("/");
            toast.success("로그인되었습니다!");
          } catch (e: any) {
            console.log(e.response);
          }
        } else {
          setValid(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    postCode();
  }, []);

  return <div>{valid && <div>회원가입</div>}</div>;
};

export default Index;
