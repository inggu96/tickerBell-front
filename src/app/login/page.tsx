"use client";

import Button from "@/components/button/Button";
import LoginForm from "@/components/form/LoginForm";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbMessageCircle2Filled } from "react-icons/tb";

const Index = () => {
  const [tab, setTab] = useState(-1);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });
  const router = useRouter();

  const click = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=http://localhost:3000/oauth/kakao`
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-200 ">
      <div className="flex justify-center w-full h-full my-auto mt-12 xl:gap-14 lg:justify-normal md:gap-5 ">
        <div className="flex flex-col items-center justify-center w-3/5 gap-12 p-12 mx-auto bg-white rounded-lg shadow lg:w-1/3 lg:p-12">
          <Image
            src="https://private-user-images.githubusercontent.com/122377401/287469285-4608a344-39ad-4d8d-ab53-201037272767.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDE1NDM5NDcsIm5iZiI6MTcwMTU0MzY0NywicGF0aCI6Ii8xMjIzNzc0MDEvMjg3NDY5Mjg1LTQ2MDhhMzQ0LTM5YWQtNGQ4ZC1hYjUzLTIwMTAzNzI3Mjc2Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMxMjAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMTIwMlQxOTAwNDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMzk0OThlZDgwMTQ5MWIzZjg2NjM2NDcyYTk3ODhlNTM0NTE1NGVjYzQyZmI4NmJiOWQyYzZlMTE2NjdkZjY1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.2dH6rZ0rfQDvcyb8dmxA3eNxQiFMt2VrACLIqnYjypA"
            alt="logo"
            width={250}
            height={200}
            objectFit="none"
          />

          <p className="mb-4 text-grey-700">
            아이디와 비밀번호를 입력해주세요.
          </p>
          <Button
            onClick={click}
            className={classNames(
              "bg-[#fae100] text-black flex flex-row items-center justify-center w-3/5 h-42 text-xl",
              {}
            )}
          >
            <TbMessageCircle2Filled className="flex items-center px-5 text-4xl font-bold text-black" />
            카카오 로그인
          </Button>

          <p className="flex items-center mx-4 mb-3 text-grey-600">or</p>
          <LoginForm />
          <p className="text-sm leading-relaxed text-center text-grey-900">
            개인정보 보호를 위해 공용 PC에서 사용 후 <br />
            SNS 계정의 로그아웃 상태를 반드시 확인해 주세요.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap my-5 -mx-3">
        <div className="w-full max-w-full mx-auto text-center sm:w-3/4">
          <p className="py-1 text-sm text-slate-500">
            copyright @2023 ticketbell
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
