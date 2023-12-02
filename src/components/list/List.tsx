"use client";

import { getEventAllApi } from "@/api/events";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Card from "../item/Card";
import Spinner from "../spinner/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import Item from "../item/Item";
import Skeleton from "../Skeleton/Skeleton";

type ListType = {
  category: string;
  type?: string;
  className?: string;
};

export const List = ({ category, type, className }: ListType) => {
  const [ref, isView] = useInView();
  // 받은 카테고리가 있다면 카테고리. 없다면 전체

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["event-all-list"],
    queryFn: ({ pageParam = 0 }) => getEventAllApi({ category, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: any,
      allPages: any,
      lastPageParam: any,
      allPageParams: any
    ) => {
      // console.log('lastPage: ', lastPage);
      // console.log('allPages: ', allPages);
      // console.log('lastPageParam: ', lastPageParam);
      // console.log('allPageParams: ', allPageParams);
      return allPages.length + 1;
    },
  });

  // 무한 스크롤
  useEffect(() => {
    if (isView && hasNextPage) fetchNextPage();
  }, [isView]);

  // console.log('data', data, status);

  return (
    <div className={className}>
      <>
        {status === "pending" && (
          <div>
            <Skeleton />
          </div>
        )}
        {status === "success" && (
          <div className="grid grid-cols-6 gap-x-16 gap-y-36 place-items-center mt-60">
            {data &&
              data?.pages.map(
                (item: any) =>
                  item &&
                  item?.content.map((data: any, index: any) => (
                    <Card key={index} data={data} type={type} />
                  ))
              )}
            <div ref={ref} />
          </div>
        )}
      </>
    </div>
  );
};
