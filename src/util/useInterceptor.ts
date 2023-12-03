"use client";

import { parseJwt } from "@/hooks/useParseJwt";
import axios from "axios";
import { getCookie, setCookie } from "./authCookie";
import { epochConvert } from "./epochConverter";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

// apiInstance.interceptors.request.use(
//   async (config) => {
//     if (typeof getCookie("ticket-atk") === "string") {
//       if (epochConvert(parseJwt(getCookie("ticket-atk").exp))) {
//         removeCookie("ticket-rtk");
//         removeCookie("ticket-atk");
//         // window.location.href = '/'
//       } else {
//         config.headers["Authorization"] = `Bearer ${getCookie("ticket-atk")}`;
//         return config;
//       }
//     }
//     if (
//       getCookie("ticket-atk") == undefined &&
//       getCookie("ticket-trk") != undefined
//     ) {
//       return config;
//     }
//     if (getCookie("ticket-atk") == undefined) {
//       // removeCookie("ticket-atk");
//       return config;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("ticket-atk");
    if (accessToken && !epochConvert(parseJwt(accessToken).exp)) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiInstance.interceptors.response.use(
//   (response) => {
//     const res = response.data;
//     return res;
//   },
//   async function (err) {
//     console.log("err", err);

//     // 유효하지 않은 토큰
//     if (err.response && err.response.status === 400) {
//       // const router = useRouter();
//       // router.push("/");

//       return err.response.data;
//     }

//     // atk 만료 or인증실패
//     if (err.response && err.response.status === 401) {
//       // removeCookie("ticket-atk");
//       // 토큰 재발급 요청, apiInstance가 아닌 axios로 요청하기
//       removeCookie("ticket-atk");
//       if (getCookie("ticket-trk") !== "undefined") {
//         console.log("cc", process.env.NEXT_PUBLIC_API_URL);
//         console.log("atk: ", getCookie("ticket-atk"));
//         console.log("rtk: ", getCookie("ticket-rtk"));
//         const data = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/reissue`,
//           {
//             refreshToken: `${getCookie("ticket-rtk")}`,
//             headers: {
//               accept: "*/*",
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("갱신", data.data.accessToken);
//         //  갱신
//         removeCookie("ticket-atk");
//         setCookie("ticket-atk", `${data.data.accessToken}`);

//         // 헤더에 담긴 토큰 값 변경
//         err.config.headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${data.data.accessToken}`,
//           // 이 위치에 토큰값 넣기
//         };

//         // 재요청
//         const originalResponse = await axios.request(err.config);
//         return originalResponse.data;
//       }
//       return Promise.reject(err);
//     }

//     // atk가 undefined일때 500
//     if (err.response && err.response.status === 500) {
//       // removeCookie("ticket-atk");
//     }
//     if (err.response && err.response.status === 404) {
//       // console.log("err", err.response.data.data);
//       //  return Promise.reject(new Error("요청 데이터가 없습니다"));
//       // return Promise.reject(err);
//       return Promise.resolve();
//       // return;
//     }
//   }
// );

apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("ticket-rtk");
      if (refreshToken) {
        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/reissue`,
          {
            refreshToken: refreshToken,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCookie("ticket-atk", data.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        return apiInstance(originalRequest);
      }
    }
    return Promise.reject(err);
  }
);
export default apiInstance;
