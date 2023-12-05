"use client";

import React from "react";
import { SideBarItem } from "./SideBarItem";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";
import { sideData } from "./SideBarMenu";
import LogoutButton from "../button/LogoutButton";

export const SideBar = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));

  return (
    <aside className="flex min-w-250 min-h-[calc(100vh-60px)]   flex-col items-center justify-center border-r border-gray-200">
      <ul>
        {getRole === "ROLE_USER" || getIsLogin
          ? sideData.show.map((route, key) => (
              <SideBarItem key={key} route={route} />
            ))
          : sideData.to.map((route, key) => (
              <SideBarItem key={key} route={route} />
            ))}
      </ul>
    </aside>
  );
};
