import apiInstance from "@/util/useInterceptor";

type allEventType = {
  category: string;
  pageParam: number;
  offset?: number;
};

// 이벤트 리스트
export async function getEventAllApi({
  category,
  pageParam = 0,
  offset = 18,
}: allEventType) {
  if (category !== "") {
    try {
      const res = await apiInstance.get(`/api/events/${category}`, {
        params: { page: pageParam, size: offset },
      });
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    // NOTE: try catch 사용시 useInfiniteQuery 기능 불가.
    // try {
    // } catch (error) {
    //   throw error;
    // }
    const res = await apiInstance
      .get("/api/events", {
        params: { page: pageParam, size: 18 },
      })
      .then((response) => response.data)
      .then((item) => item)
      .catch((err) => console.log("err", err));
    return res;
  }
}

// 메인 이벤트 슬라이드
export async function eventSlideApi() {
  try {
    const res = await apiInstance.get("/api/main", {});
    return res;
  } catch (error) {
    throw error;
  }
}

// 이벤트 등록
export async function postEventApi(atk: string, data: any) {
  try {
    const res = await apiInstance.post("/api/event", data, {
      headers: {
        Authorization: `Bearer ${atk}`,
      },
    });
    console.log("이벤트 등록성공:", res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 이벤트 이미지 등록
export async function postEventImageApi(formDataValues: ImageFormSubmitValue) {
  try {
    const { atk, thumbNailImage, eventImages } = formDataValues;
    const formData = new FormData();
    formData.append("thumbNailImage", thumbNailImage);

    eventImages.forEach((file) => {
      formData.append("eventImages", file);
    });

    const response = await apiInstance.post("/api/image", formData, {
      headers: {
        Authorization: `Bearer ${atk}`,
      },
    });
    console.log("업로드 성공:", response);
    return response;
  } catch (error) {
    console.error(error);
    console.error("업로드 중 에러 발생:", error);
    throw error;
  }
}

// 이벤트 id 정보
export async function getEventIdApi(id: any) {
  try {
    const res = await apiInstance.get(`/api/event/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 카테고리별 보여주기
export async function getEventCategoryApi(
  currentPage: number,
  category: any,
  selectText: string
) {
  try {
    const res = await apiInstance.get(`/api/events/${category}`, {
      params: { page: currentPage - 1, size: 10, sort: category },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
