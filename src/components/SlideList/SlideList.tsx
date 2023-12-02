"use client";

import React, { useEffect, useState } from "react";
import Slide from "../slide/Slide";
import { eventSlideApi } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import cls from "classnames";
import { PiEqualizerBold } from "react-icons/pi";
import { LuMusic } from "react-icons/lu";
import { CiMicrophoneOn } from "react-icons/ci";
import { PiAlienBold } from "react-icons/pi";

const SlideList = () => {
  const [tab, setTab] = useState("rankingMusicalEventList");

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["main-slide"],
    queryFn: () => eventSlideApi(),
  });

  console.log("data", data);

  return (
    <>
      {!isError && isSuccess && (
        <div className="mt-60">
          <div className="flex justify-center gap-8">
            {data?.data["rankingMusicalEventList"] !== null && (
              <div
                onClick={() => setTab("rankingMusicalEventList")}
                className={cls(
                  "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80 ",
                  {
                    "bg-primary text-white": tab === "rankingMusicalEventList",
                  }
                )}
              >
                <div className="flex justify-center text-3xl text-primary ">
                  <PiEqualizerBold
                    className={
                      tab === "rankingMusicalEventList"
                        ? "text-white"
                        : "text-primary"
                    }
                  />
                </div>
                <p className="text-lg text-center">뮤지컬</p>
              </div>
            )}
            {data?.data["rankingConcertEventList"] !== null && (
              <div
                onClick={() => setTab("rankingConcertEventList")}
                className={cls(
                  "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80 ",
                  {
                    "bg-primary text-white": tab === "rankingConcertEventList",
                  }
                )}
              >
                <div className="flex justify-center text-3xl">
                  <CiMicrophoneOn />
                </div>
                <p className="text-lg text-center">콘서트</p>
              </div>
            )}
            {data?.data["rankingPlayEventList"] !== null && (
              <div
                onClick={() => setTab("rankingPlayEventList")}
                className={cls(
                  "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80 ",
                  {
                    "bg-primary text-white": tab === "rankingPlayEventList",
                  }
                )}
              >
                <div className="flex justify-center text-3xl text-secondary">
                  <PiAlienBold
                    className={
                      tab === "rankingPlayEventList"
                        ? "text-white"
                        : "text-secondary"
                    }
                  />
                </div>
                <p className="text-lg text-center ">연극</p>
              </div>
            )}
            {data?.data["rankingClassicEventList"] !== null && (
              <div
                onClick={() => setTab("rankingClassicEventList")}
                className={cls(
                  "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80 ",
                  {
                    "bg-primary text-white": tab === "rankingClassicEventList",
                  }
                )}
              >
                <div className="flex justify-center text-3xl">
                  <LuMusic />
                </div>
                <p className="text-lg text-center">클래식</p>
              </div>
            )}
            {data?.data["rankingSportsEventList"] !== null && (
              <div
                onClick={() => setTab("rankingSportsEventList")}
                className={cls(
                  "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80 ",
                  {
                    "bg-primary text-white": tab === "rankingSportsEventList",
                  }
                )}
              >
                스포츠
              </div>
            )}
          </div>
          <Slide data={data?.data[tab]} title="이달의 랭킹" viewCount={5} />
          <Slide data={data?.data["saleEventList"]} title="세일" autoplay />
          <Slide data={data?.data["deadLineEventList"]} title="마감임박" />
          <Slide data={data?.data["recommendEventList"]} title="추천!" />
        </div>
      )}
    </>
  );
};

export default SlideList;
