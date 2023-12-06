"use client";

import Card from "@/components/item/Card";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const Index = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const SEARCH = gql`
    query Search($keyword: String!) {
      getEventByName(name: $keyword) {
        eventId
        name
        startEvent
        endEvent
        saleDegree
        normalPrice
        premiumPrice
        discountNormalPrice
        discountPremiumPrice
        category
        thumbNailUrl
        castings
        place
        isAdult
      }
      getEventByPlace(place: $keyword) {
        eventId
        name
        startEvent
        endEvent
        saleDegree
        normalPrice
        premiumPrice
        discountNormalPrice
        discountPremiumPrice
        category
        thumbNailUrl
        castings
        place
        isAdult
      }
    }
  `;

  const { loading, error, data } = useQuery(SEARCH, {
    variables: { keyword: keyword || "" },
  });

  // console.log('data', data);

  return (
    <div>
      {keyword &&
      data?.getEventByPlace.length === 0 &&
      data?.getEventByName.length === 0 ? (
        <div className="flex items-center justify-center h-20">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="flex items-center justify-center h-20">
          {keyword} 검색한 내용입니다 !
        </div>
      )}
      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-x-16 gap-y-36 place-items-center mt-60">
        {keyword !== null &&
          data?.getEventByName.length > 0 &&
          data.getEventByName.map((item: any, index: any) => (
            <Card data={item} key={index} />
          ))}
        {keyword !== null &&
          data?.getEventByPlace.length > 0 &&
          data.getEventByPlace.map((item: any, index: any) => (
            <Card data={item} key={index} />
          ))}
        {keyword === null &&
          data?.getEventByName.length > 0 &&
          data.getEventByName.map((item: any, index: any) => (
            <Card data={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Index;
