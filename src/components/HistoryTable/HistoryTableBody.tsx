"use client";

import { userSelector } from "@/recoil/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../button/Button";
import ReserveModal from "../portalModal/reserveModal/ReserveModal";
import { day, dayCompare, today } from "@/util/day";
import { epochConvertReverse } from "@/util/epochConverter";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userDeleteReserverIdApi,
  userDeleteResigsterIdApi,
} from "@/api/ticketing";
import "./historytable.scss";
import { paginateSelector } from "@/recoil/paginate";

interface HistoryTableBodyProps {
  row: IEventHistoryTableReserverType;
}

export const HistoryTableBody: React.FC<HistoryTableBodyProps> = ({ row }) => {
  const {
    startEvent,
    eventName,
    casting,
    place,
    isCancelled,
    ticketHolderCounts,
    eventId,
    ticketingId,
  } = row;
  const queryClient = useQueryClient();
  const getRole = useRecoilValue(userSelector("role"));
  const getPaging = useRecoilValue(paginateSelector);
  const [onModal, setOnModal] = useState(false);
  const date = new Date();
  const [role, setRole] = useState("");

  useEffect(() => {
    // switch (getRole) {
    //   case 'ROLE_REGISTRANT':
    //     break;
    //   default:
    //     break;
    // }
  }, [getRole]);

  const deleteReserverMutation = useMutation({
    mutationFn: (id: number) => userDeleteReserverIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event-reservelist", getPaging],
      });
    },
  });

  const deleteResisterMutation = useMutation({
    mutationFn: (id: number) => userDeleteResigsterIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event-reservelist", getPaging],
      });
    },
  });

  const cancleEvent = (id: any, ticketingId: any) => {
    if (
      !confirm(
        `이벤트 ${
          getRole === "ROLE_REGISTRANT" ? "등록을" : "예매를"
        } 취소할까요?`
      )
    ) {
      // 아니오
    } else {
      // 예
      if (getRole === "ROLE_REGISTRANT") {
        console.log("예약자 일때");
        deleteResisterMutation.mutate(id);
      } else if (getRole === "ROLE_USER") {
        console.log("회원");
        deleteReserverMutation.mutate(ticketingId);
      } else {
        // 비회원 예매 취소
      }
    }
  };

  // console.log("r", row);

  return (
    <>
      {onModal && (
        <ReserveModal
          className="w-800 m-h-600"
          dimClick={true}
          setOnModal={() => setOnModal(false)}
          eventId={row.eventId}
        />
      )}
      <tr
        className="text-sm text-center text-gray-900 border-b"
        onClick={(e) => {
          e.stopPropagation();
          setOnModal(true);
        }}
      >
        <td className="px-6 py-4 truncate max-w-200 min-w-200">{eventName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{casting}</td>
        <td className="px-6 py-4 whitespace-nowrap">{day(startEvent)}</td>
        <td className="px-6 py-4 truncate whitespace-nowrap max-w-400 min-w-400">
          {place}
        </td>
        <td className="px-6 py-4 whitespace-nowrap w-60">
          {isCancelled
            ? dayCompare(date, startEvent)
              ? "취소됨"
              : "진행됨"
            : "진행예정"}
          {/* {!isCancelled && dayCompare(date, startEvent) ? '진행됨' : '진행예정'} */}
        </td>
        {ticketHolderCounts !== null && (
          <td className="px-6 py-4 min-w-100">{ticketHolderCounts}명</td>
        )}
        <td className="px-6 py-4 whitespace-nowrap">
          <Button
            className="border"
            onClick={(e: any) => {
              e.stopPropagation();
              cancleEvent(eventId, ticketingId);
            }}
          >
            {getRole === "ROLE_REGISTRANT" ? "등록" : "예매"} 취소
          </Button>
        </td>
      </tr>
    </>
  );
};
