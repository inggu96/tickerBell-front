"use client";

import { getEventIdApi } from "@/api/events";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Index = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-id", params.id],
    queryFn: () => getEventIdApi(params.id),
  });

  console.log("data", data?.data);

  const totalCost = numberOfPeople * data?.data.normalPrice;

  if (isSuccess) {
    return (
      <div>
        {modal && (
          <EventDetailModal
            totalCost={totalCost}
            place={data?.data.place}
            name={data?.data.name}
            normalPrice={data?.data.normalPrice}
            className="w-1/2"
            dimClick={false}
            numberOfPeople={numberOfPeople}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            setOnModal={() => setModal(false)}
          />
        )}
        <Header />
        <div className="flex flex-col justify-center lg:flex-row">
          <div className="flex flex-col w-full h-auto py-8 bg-white border-t lg:flex-row lg:w-1/2 md:w-8/12 lg:px-8 lg:py-14 md:py-10 lg:h-screen">
            <div className="w-2/4">
              <picture>
                <img
                  src={data?.data.thumbNailUrl}
                  alt=""
                  className="object-cover object-center w-full"
                />
              </picture>
            </div>
            <div className="w-2/4">
              <ul className="grid grid-cols-2 gap-12 p-12">
                <li className="font-bold">이벤트명</li>
                <li>{data?.data.name}</li>
                <li className="font-bold">장소</li>
                <li>{data?.data.place}</li>
                <li className="font-bold">배우명</li>
                <li>{data?.data.castings}</li>
                <li className="font-bold">관람연령</li>
                <li>
                  {data?.data.isAdult ? <p>성인관람</p> : <p>전체관람</p>}
                </li>
                <li className="font-bold">가격</li>
                <li className="font-bold">{data?.data.normalPrice}</li>
                <li></li>
                <li className="font-bold">{data?.data.premiumPrice}</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-20 px-4 py-6 shadow lg:w-1/4 md:w-8/12 lg:h-screen lg:px-8 md:px-7 lg:py-20 md:py-10">
            <p className="text-3xl font-black leading-9 text-gray-800 lg:text-4xl">
              {data?.data.name}
            </p>
            <div className="mx-auto">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                inline
              />

              {/* 이전날짜는 막기 공연기간동안만 예약이 되게  */}
            </div>
            <div>
              <input
                type="number"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                min="1"
                max="10"
              />
              <p className="text-2xl leading-normal text-gray-800">총액</p>
              <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                {totalCost}원
              </p>
            </div>
            <Button className="w-full" onClick={() => setModal(true)}>
              예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    return <div>에러 발생: {error.message}</div>;
  } else {
    return <div>로딩 중...</div>;
  }
};
export default Index;

// NOTE 추후에 api가 나온다면 params로 받기
// export async function getStaticPaths() {
// const { data: posts } = await axios.get(`${ROOT_API}/todos`);

// const paths = posts.map((post: any) => ({
//   params: { id: post.id.toString() },
// }));

// return {
//   paths,
//   fallback: true,
// };
// }

// export async function getStaticProps({ params }: any) {
// const { data: todoItem } = await axios.get(`${ROOT_API}/todos/${params.id}`);

// return {
//   props: {
//     todoItem
//   },
//   revalidate: 60,
// };
// }
