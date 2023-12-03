"use client";

import { userInfoApi, userLoginApi } from "@/api/users";
import { userSelector } from "@/recoil/user";
import { setCookie } from "@/util/authCookie";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import Button from "../button/Button";
import axios from "axios";
import { parseJwt } from "@/hooks/useParseJwt";
import Link from "next/link";
import { toast } from "react-toastify";

const LoginForm = () => {
  // const [sms, setSms] = useState(0);
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const setUserInfo = useSetRecoilState(userSelector("role"));
  const setName = useSetRecoilState(userSelector("name"));

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

  // console.log('회원가입 폼 : ', watch(), isRegistration)

  const onSubmit = (data: any) => {
    // 회원

    userLoginApi(data.username, data.password)
      .then((res) => {
        setIsLogin(true);
        userInfoApi(res.data.accessToken).then((res) => {
          setUserInfo("isRegistrationTrue" ? "ROLE_REGISTRANT" : "ROLE_USER");
          // setUserInfo(res?.data.username);
        });

        setCookie("ticket-atk", res.data.accessToken, {
          path: "/",
          secure: "/",
        });
        setCookie("ticket-rtk", res.data.refreshToken, {
          path: "/",
          secure: "/",
        });
        setCookie("username", parseJwt(res.data.accessToken).username, {
          path: "/",
          secure: true,
          maxAge: 24 * 60 * 60,
        });
        console.log(data);
        router.push("/");
        toast.success("로그인되었습니다!");
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/emitter/subscribe`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
              "Content-Type": "text/event-stream",
              Connection: "keep-alive",
              // "Cache-Control": "no-cache",
            },
          })
          .then((res) => console.log("sse test: ", res));
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="flex items-center w-full xl:p-10">
      <form
        className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-10">
            <div className="flex flex-col gap-6">
              <input
                type="text"
                id="username"
                placeholder="아이디를 입력해주세요"
                maxLength={10}
                className="w-full px-3 py-3 border rounded-lg h-42 border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("username", {
                  required: "아이디는 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
              />
            </div>
            {errors.username && (
              <small role="alert">{errors.username.message}</small>
            )}
          </div>

          <div className="mb-10">
            <div className="flex flex-col gap-6">
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                minLength={6}
                className="w-full px-3 py-3 border rounded-lg h-42 border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 6,
                    message: "6자리 이상 입력해주세요.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message: "영어와 숫자를 포함해주세요",
                  },
                })}
              />
            </div>
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </div>

          <Button className="bottom-0 mb-12 h-42" full type="submit">
            로그인
          </Button>
          <Button
            className="text-black bg-white border h-42"
            type="button"
            full
          >
            <Link href="/regist">회원가입</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
