import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomArrowProps } from "react-slick";
export const NextArrow = ({ onClick }: CustomArrowProps) => (
  <div
    className="absolute right-0 z-10 flex items-center justify-center w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow cursor-pointer top-1/2"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-4xl text-primary" />
  </div>
);

export const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <div
    className="absolute left-0 z-10 flex items-center justify-center w-32 h-32 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow cursor-pointer top-1/2"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-4xl text-primary" />
  </div>
);
