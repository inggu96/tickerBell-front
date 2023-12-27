"use client";

import { getEventCategoryApi, getEventIdApi } from "@/api/events";
import Card from "@/components/item/Card";
import apiInstance from "@/util/useInterceptor";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  usePathname,
  useRouter,
  useServerInsertedHTML,
} from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  // usePathname 훅을 사용할 수 없으므로, 라우트 경로를 직접 입력합니다.
  const id = "app/(isHeading)/[id]/page.tsx";
  // fetch 함수를 await 키워드로 기다립니다.
  const res = await apiInstance.get(`/api/event/${id}`);
  const data = res.data;
  const slugs = data.map((item: any) => item.slug);
  return slugs.map((slug: any) => ({
    slug,
  }));
}
const Index = () => {
  const path = usePathname();
  const id = path.slice(1);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-category", id],
    queryFn: () => getEventCategoryApi(1, id.toString().toUpperCase(), ""),
  });

  console.log("카테고리 : ", data?.data.eventListResponses);

  return (
    <div className="grid grid-cols-6 gap-36 place-items-center mt-60">
      {isSuccess &&
        data?.data.eventListResponses.map((item: any, index: any) => (
          <Card key={index} data={item} />
        ))}
      디테일{id}
    </div>
  );
};
export default Index;
