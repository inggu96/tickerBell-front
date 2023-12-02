"use client";

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useEffect } from "react";
// import { ON_NOTI } from "store/Notification";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "../../util/authCookie";

const Sse = () => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (getCookie("ticket-atk")) {
      const sse = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/emitter/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("ticket-atk")}`,
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            // "Cache-control": 'no-cache'
          },
          heartbeatTimeout: 10 * 60 * 1000, // NOTE: 백보단 시간 짧게
          withCredentials: true,
        }
      );

      sse.onopen = (event: any) => {
        if (event.status === 200) {
          console.log("sse 연결됨");
        }
      };

      sse.onmessage = (event: any) => {
        const isJson = (str: any) => {
          try {
            const json = JSON.parse(str);
            return json && typeof json === "object";
          } catch (e) {
            return false;
          }
        };
        if (isJson(event.data)) {
          console.log("sse 메시지 수신됨");
          // queryClient.invalidateQueries(["alaram"]);
          // queryClient.invalidateQueries(["alaramUnRead"]);
          // dispatch(ON_NOTI());
          // setGetMessage(true);
        }
      };
      if (getCookie("ticket-atk") === null) {
        sse.close();
      }
    }
    // return (sse:any) => {
    //   if (!getCookie('ticket-atk') === null) {
    //     sse.close();
    //   }
    // }
  }, [getCookie("ticket-atk")]);

  return null;
};

export default Sse;
