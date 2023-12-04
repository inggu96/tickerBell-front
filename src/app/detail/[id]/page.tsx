"use client";

import { getEventIdApi } from "@/api/events";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";
import { seatPrice } from "@/hooks/useSeat";
import { day, formatDate } from "@/util/day";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Index = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const {
    data: eventIdData,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["event-id", params.id],
    queryFn: () => getEventIdApi(params.id),
  });
  const data = eventIdData?.data;

  console.log("data", data);

  useEffect(() => {
    console.log("selectedSeats", selectedSeats);
  }, [selectedSeats]);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  console.log("data", data?.data);

  // const totalCost = numberOfPeople * data?.data.normalPrice;
  // const lastPartOfPlace = data.place ? LastPlace(data.place) : "";
  if (isSuccess) {
    const price = seatPrice(
      data.discountNormalPrice,
      data.discountPremiumPrice,
      data.isSpecialSeatA,
      data.isSpecialSeatB,
      data.isSpecialSeatC
    );
    const timeParts = data?.dailyStartEvent.split(":");
    let hour = parseInt(timeParts[0], 10);
    let ampm = "오전";

    if (hour >= 12) {
      ampm = "오후";
      hour = hour > 12 ? hour - 12 : hour;
    }

    const formatedTime = `${ampm} ${hour}시 ${timeParts[1]}분`;
    return (
      <div>
        {modal && (
          <EventDetailModal
            className="w-1/2"
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            setOnModal={() => setModal(false)}
            price={price}
            selectDate={startDate}
            eventId={params.id}
          />
        )}
        <Header />
        <div className="flex flex-col justify-center mx-auto mt-40 rounded-lg shadow lg:flex-row max-w-1280">
          <div className="w-full">
            <div className="flex flex-col w-full gap-40 h-1/2 lg:flex-row md:w-8/12">
              <div className="relative min-w-300 h-400 ">
                <Image
                  src={data.thumbNailUrl}
                  alt={data.name}
                  fill
                  objectFit="contain"
                />
              </div>
              <div>
                <ul className="flex flex-col gap-10 sm:px-30 ">
                  <li className="flex">
                    <p className="text-2xl font-black leading-9 text-gray-800 lg:text-4xl">
                      {data?.name}
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">
                      공연시간
                    </p>
                    <p className="text-left flex-grow-3 w-170 whitespace-nowrap">
                      <span className="font-bold">기간 중</span> {formatedTime}{" "}
                      ~ 90분간 진행
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">
                      공연기간
                    </p>
                    <p className="text-left flex-grow-3 w-170 whitespace-nowrap">
                      {formatDate(data.startEvent)} ~{" "}
                      {formatDate(data.endEvent)}
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">
                      이벤트명
                    </p>
                    <p className="text-left flex-grow-3 w-170">{data.name}</p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">
                      관람연령
                    </p>
                    <p className="text-left flex-grow-3 w-170">
                      {data.isAdult ? "성인관람" : "전체관람"}
                    </p>
                  </li>

                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">가격</p>
                    <p className="text-left flex-grow-3 w-170">
                      일반좌석 {data.discountNormalPrice}
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 "></p>
                    <p className="text-left flex-grow-3 w-170">
                      프리미엄좌석 {data.discountNormalPrice}
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">
                      배우명
                    </p>
                    <p className="text-left flex-grow-3 w-170">
                      {data.castings}
                    </p>
                  </li>
                  <li className="flex">
                    <p className="font-bold flex-grow-1 w-90 min-w-80 ">장소</p>
                    <p className="text-left flex-grow-3 w-170">{data.place}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-20 px-4 my-10 bg-white rounded-lg shadow-lg py-22 ">
              <div className="flex mb-4 h-30">
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "details"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  상세내용
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "notice"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("notice")}
                >
                  유의사항
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "refund"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("refund")}
                >
                  취소 및 환불 안내
                </button>
              </div>
              <div>
                {activeTab === "details" && (
                  <div className="p-20">
                    <p>{data.description}</p>
                    <p>
                      * 관람연령: 8세 이상 입장가능 <br />
                      ※ 2015년 이전 출생자부터, 증빙서류 확인​ 예정 <br />
                      * 예매매수 : 1인 2매 제한 <br />* “​무통장입금”​ 결제가
                      제한됩니다.
                      <br />
                      * 예매 티켓은 현장 수령만 가능합니다. 티켓 수령 시
                      신분증과 예매내역서를 지참하여야 합니다.
                      <br /> - 신분증: 주민등록증, 운전면허증, 여권,
                      주민등록등본 - 예매자 예매확인서: 사진, 예매창, 인쇄본 등{" "}
                      <br />* 양도 티켓의 경우에도 티켓 수령시 예매내역서와
                      예매자(양도자)의 신분증(사본가능)을 확인합니다. <br />*
                      수성아트피아 리모델링 공사로 인해 방문예매는 불가하며,
                      전화예매의 경우 유선 상의 예매자 등록 절차가 있으므로{" "}
                      <br />
                      이로 인한 좌석 미선점에 대한 부분은 책임지지 않습니다.{" "}
                      <br />* 예매마감 : 공연 당일 12시 * 취소마감 : 공연 전일
                      17시​
                    </p>
                  </div>
                )}
                {activeTab === "notice" && (
                  <div className="p-20">
                    <p>
                      {" "}
                      <p>
                        ※ 유의사항 확인 후 내용을 지우고 새로 작성해 주세요.
                        <br />
                        안전하고 깨끗한 거래 서비스를 제공하기 위해 아래 내용을
                        포함한 상품은 모니터링 삭제됩니다.
                        <br /> 1. 티켓의 원가가 포함되지 않은 상품
                        <br /> 2. 판매 등록 시 개인정보(연락처, 메신저 ID)를
                        기재한 상품 <br />
                        3. 무료 티켓 및 초대권
                        <br /> 4. 구매자에게 이동 요구하는 상품 및 이동 실패 시
                        환불 불가 상품 <br />
                        5. 좌석 이동 등의 목적으로 티켓(좌석)만 전달하여 입장이
                        불가능한 상품 위 내용의 상품을 거래 진행하는 경우,
                        취소될 수 있으며 판매자 페널티가 부여됩니다.
                      </p>
                    </p>
                  </div>
                )}
                {activeTab === "refund" && (
                  <div className="p-20">
                    <p>취소 및 환불 안내 내용이 여기에 표시됩니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-20 px-4 py-6 shadow lg:w-1/4 md:w-8/12 lg:h-screen lg:px-8 md:px-7 lg:py-20 md:py-10">
            <div className="mx-auto">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date(data.availablePurchaseTime)}
                maxDate={new Date(data.endEvent)}
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
                max="2"
              />
              <p className="text-2xl leading-normal text-gray-800">총액</p>
              <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                {/* {totalCost}원 */}
              </p>
            </div>
            <div>
              상영일자 및 시간
              <div>{`${day(startDate)}`}</div>
              <div>{`${data.dailyStartEvent}`}</div>
            </div>
            <Button className="w-full" onClick={() => setModal(true)}>
              예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
export default Index;
