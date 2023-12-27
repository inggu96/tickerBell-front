"use client";

import { getEventCategoryApi, getEventIdApi } from "@/api/events";
import Card from "@/components/item/Card";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  usePathname,
  useRouter,
  useServerInsertedHTML,
} from "next/navigation";
import React from "react";

// export function generateStaticParams() {
//   const categorys = ["musical", "concert", "play", "classic", "sports"];
//   return categorys.map((category) => ({
//     slug: category,
//   }));
// }

// export function generateStaticParams() {
//   return [{ slug: ["a", "1"] }, { slug: ["b", "2"] }, { slug: ["c", "3"] }];
// }

const Index = () => {
  const path = usePathname();
  const id = path.slice(1);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-category", id],
    queryFn: () => getEventCategoryApi(1, id.toString().toUpperCase(), ""),
  });

  // console.log("카테고리 : ", data?.data.eventListResponses);

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
