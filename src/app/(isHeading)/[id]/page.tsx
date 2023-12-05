'use client';

import { getEventCategoryApi, getEventIdApi } from '@/api/events';
import Card from '@/components/item/Card';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation'
import React from 'react'

const Category = () => {
  const { id } = useParams();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-category", id],
    queryFn: () => getEventCategoryApi(1, id.toString().toUpperCase(), ""),
  });

  console.log('카테고리 : ', data?.data.eventListResponses);

  return (
    <div className="grid grid-cols-6 gap-36 place-items-center mt-60">
      {
        isSuccess && data?.data.eventListResponses.map((item: any, index: any) => (
          <Card key={index} data={item}/>
        ))
      }
    </div>
  )
}

export default Category