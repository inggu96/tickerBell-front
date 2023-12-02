import React from "react";
import Slider, { Settings } from "react-slick";
import { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { day } from "@/util/day";
import Image from "next/image";

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
                  {title === "랭킹" && (
                    <div className="bottom-0 left-0 z-50 mb-2 ml-2 text-5xl font-bold text-red">
                      {index + 1}
                    </div>
                  )}
                  <div className="relative m-auto rounded-lg w-200 h-250">
                    <Image
                      src={item.thumbNailUrl}
                      alt={item.name}
                      fill
                      objectFit="contain"
                      className="rounded-lg "
                    />
                  </div>
                  <div>{item.name}</div>
                  <div>{day(item.startEvent)}</div>
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
