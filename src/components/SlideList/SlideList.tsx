"use client";

import React, { useEffect, useState } from "react";
import Slide from "../slide/Slide";
import { eventSlideApi } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import cls from 'classnames';

const SlideList = () => {
  const [tab, setTab] = useState('rankingMusicalEventList');

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["main-slide"],
    queryFn: () => eventSlideApi(),
  });

  return (
    <div className="mt-60">
      {!isError && isSuccess &&
        <>
          <div className="flex justify-center gap-8">
            <div onClick={() => setTab('rankingMusicalEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
              "bg-primary text-white": tab === 'rankingMusicalEventList'
            })}>뮤지컬</div>
            <div onClick={() => setTab('rankingConcertEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
              "bg-primary text-white": tab === 'rankingConcertEventList'
            })}>콘서트</div>
            <div onClick={() => setTab('rankingPlayEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
              "bg-primary text-white": tab === 'rankingPlayEventList'
            })}>여가</div>
            <div onClick={() => setTab('rankingClassicEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
              "bg-primary text-white": tab === 'rankingClassicEventList'
            })}>클래식</div>
            <div onClick={() => setTab('rankingSportsEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
              "bg-primary text-white": tab === 'rankingSportsEventList'
            })}>스포츠</div>
          </div>
          <Slide data={data?.data[tab]} title="랭킹" viewCount={data?.data[tab].length} />
          <Slide data={data?.data['saleEventList']} title="세일" autoplay />
          <Slide data={data?.data['deadLineEventList']} title="마감임박" />
          <Slide data={data?.data['recommendEventList']} title="추천!" />
        </>
      }
      {/* <div className='flex'>
        {filterdata.map((item: any) => (
          <div key={item.id}>
            <Link href={`/reserve/${item.id}`}>
              {item.place}
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SlideList;
