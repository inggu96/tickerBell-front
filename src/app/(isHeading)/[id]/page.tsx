// "use client";

import { getEventCategoryApi, getEventIdApi } from "@/api/events";
import Card from "@/components/item/Card";
import { useQuery } from "@tanstack/react-query";
import { useParams, useServerInsertedHTML } from "next/navigation";
import React from "react";

export function generateStaticParams() {
  const categorys = ["musical", "concert", "play", "classic", "sports"];
  return categorys.map((category) => ({
    slug: category,
  }));
}

// export function generateStaticParams() {
//   return [{ slug: ["a", "1"] }, { slug: ["b", "2"] }, { slug: ["c", "3"] }];
// }

const Index = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // const { data, isSuccess, isError, error } = useQuery({
  //   queryKey: ["event-category", slug],
  //   queryFn: () => getEventCategoryApi(1, slug.toString().toUpperCase(), ""),
  // });

  // console.log("카테고리 : ", data?.data.eventListResponses);

  return (
    <div className="grid grid-cols-6 gap-36 place-items-center mt-60">
      {/* {isSuccess &&
        data?.data.eventListResponses.map((item: any, index: any) => (
          <Card key={index} data={item} />
        ))} */}
      디테일{slug}
    </div>
  );
};
export default Index;
