"use client";

import { eventSlideApi } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Slide from "../slide/Slide";
import SlideTab from "./SlideTab";

const SlideList = () => {
  const [tab, setTab] = useState("rankingMusicalEventList");

  const { data, isSuccess, isError, error, isFetched, status, errorUpdatedAt } =
    useQuery({
      queryKey: ["main-slide"],
      queryFn: () => eventSlideApi(),
    });
  console.log(
    `${errorUpdatedAt}, ${status}, ${isFetched}, isError: ${isError}  error : ${error} data: ${data}`
  );
  console.log("data", data);

  return (
    <>
      <SlideTab setTab={setTab} tab={tab} />
      {!isError && isSuccess && (
        <div className="mt-60">
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
