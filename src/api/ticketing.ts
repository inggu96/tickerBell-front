import apiInstance from "@/util/useInterceptor";
// '예매'가 포함된 api

// 비회원: 예매
export async function noneUserReserveApi(
  selectedSeat: [],
  eventId: number,
  name: string,
  phone: number
) {
  const res = await apiInstance.post("/ticketing-nonMember", {
    selectedSeat: selectedSeat,
    eventId: eventId,
    name: name,
    phone: phone,
  });
  return res;
}
// 비회원: 예매 내역
export async function noneUserReserveListApi(
  name: string,
  phone: number,
  page: number
) {
  const res = await apiInstance.get("/ticketing-nonMember", {
    params: { name: name, phone: phone, page: page, size: 10 },
  });
  return res;
}
// 비회원: 예매 취소
export async function noneUserReserveDeleteApi(
  eventId: number,
  name: string,
  phone: number
) {
  const res = await apiInstance.delete(`/ticketing-nonMember/${eventId}`, {
    params: { name: name, phone: phone },
  });
  return res;
}

// 예매
export async function userReserveApi(
  atk: string,
  selectedSeat: string[],
  selectedDate: string,
  eventId: string,
  paymentId: number
) {
  try {
    const res = await apiInstance.post(
      "/ticketing",
      {
        selectedSeat,
        eventId,
        selectedDate,
        paymentId,
      },
      {
        headers: {
          Authorization: `Bearer ${atk}`,
        },
      }
    );
    console.log("예매 성공:", res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 회원: 예매 내역 or 등록 내역 조회
export async function userReserveListApi(atk: string, page: number) {
  const res = await apiInstance.get("/api/member/my", {
    headers: {
      Authorization: `Bearer ${atk}`,
    },
    params: { page: page, size: 10 },
  });
  return res;
}

// 예매 내역 삭제
export async function userDeleteReserverIdApi(id: number) {
  const res = await apiInstance.delete(`/ticketing/${id}`, {});
  return res;
}

// 등록 내역 삭제
export async function userDeleteResigsterIdApi(id: number) {
  const res = await apiInstance.post(`/api/event/cancel/${id}`, {});
  return res;
}

export async function reserveEventSeatReturnApi(id: number) {
  const res = await apiInstance.post(`/selectted-seat/${id}`, {});
  return res;
}
