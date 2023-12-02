import { LastPlace } from "@/util/addressUtils";
import { onlyDate } from "@/util/onlyDate";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from "./Arrow";

type sliderProps = {
  title?: string;
  data?: any;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
  viewCount?: number;
};

const Slide = ({
  title,
  data,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
  viewCount = 5,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: Number(viewCount),
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      // gap:
    }),
    [autoplay, loop, speed]
  );

  // console.log('slidedata', data);
  return (
    <div className="mt-40">
      {data && data !== null ? (
        <>
          {title && <h4 className="text-center">{title}</h4>}
          <div className={className}>
            <Slider {...settings}>
              {data?.map((item: any, index: any) => (
                <Link href={`/detail/${item.eventId}`} key={index}>
                  {title === "이달의 랭킹" && (
                    <div className="absolute bottom-0 z-10 font-bold text-white translate-x-[-50px] font-shadow text-8xl p-100 ">
                      {index + 1}
                    </div>
                  )}
                  <div className="relative m-auto w-200 h-250 ">
                    <Image
                      src={item.thumbNailUrl}
                      alt={item.name}
                      fill
                      objectFit="contain"
                      className="transition duration-300 rounded-xl drop-shadow-lg hover:-translate-y-4"
                    />
                  </div>
                  <div className="py-12 px-22">
                    <div className="text-3xl font-bold">{item.name}</div>
                    <div>{item.place ? LastPlace(item.place) : ""}</div>
                    <div className="text-sm text-gray-500">
                      {onlyDate(item.startEvent)}
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Slide;
