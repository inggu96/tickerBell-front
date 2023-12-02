import cls from "classnames";
import { useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { LuMusic } from "react-icons/lu";
import { PiAlienBold, PiEqualizerBold } from "react-icons/pi";
import { IoIosFootball } from "react-icons/io";

type Props = {
  tab: string;
  setTab: (tabName: string) => void;
};

const SlideTab = ({ tab, setTab }: Props) => {
  return (
    <>
      <div className="mt-60">
        <div className="flex justify-center gap-8">
          <div
            onClick={() => setTab("rankingMusicalEventList")}
            className={cls(
              "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80",
              {
                "bg-primary text-white": tab === "rankingMusicalEventList",
                "text-black bg-white": tab !== "rankingMusicalEventList",
              }
            )}
          >
            <div className="flex justify-center text-3xl ">
              <PiEqualizerBold
                className={cls({
                  "text-white": tab === "rankingMusicalEventList",
                  "text-primary": tab !== "rankingMusicalEventList",
                })}
              />
            </div>
            <p className="text-lg text-center">뮤지컬</p>
          </div>

          <div
            onClick={() => setTab("rankingConcertEventList")}
            className={cls(
              "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80",
              {
                "bg-primary text-white": tab === "rankingConcertEventList",
                "text-black bg-white": tab !== "rankingConcertEventList",
              }
            )}
          >
            <div className="flex justify-center text-3xl">
              <CiMicrophoneOn />
            </div>
            <p className="text-lg text-center">콘서트</p>
          </div>

          <div
            onClick={() => setTab("rankingPlayEventList")}
            className={cls(
              "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80",
              {
                "bg-primary text-white": tab === "rankingPlayEventList",
                "text-black bg-white": tab !== "rankingPlayEventList",
              }
            )}
          >
            <div className="flex justify-center text-3xl ">
              <PiAlienBold
                className={cls({
                  "text-white": tab === "rankingPlayEventList",
                  "text-secondary": tab !== "rankingPlayEventList",
                })}
              />
            </div>
            <p className="text-lg text-center ">연극</p>
          </div>

          <div
            onClick={() => setTab("rankingClassicEventList")}
            className={cls(
              "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80",
              {
                "bg-primary text-white": tab === "rankingClassicEventList",
                "text-black bg-white": tab !== "rankingClassicEventList",
              }
            )}
          >
            <div className="flex justify-center text-3xl">
              <LuMusic />
            </div>
            <p className="text-lg text-center">클래식</p>
          </div>

          <div
            onClick={() => setTab("rankingSportsEventList")}
            className={cls(
              "flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm flex-col font-semibold shadow-xl w-80",
              {
                "bg-primary text-white": tab === "rankingSportsEventList",
                "text-black bg-white": tab !== "rankingSportsEventList",
              }
            )}
          >
            <div className="flex justify-center text-3xl">
              <IoIosFootball />
            </div>
            <p className="text-lg text-center">스포츠</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideTab;
