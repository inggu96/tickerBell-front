"use client";

import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Pagination from "../pagination/Pagination";
import Tab from "../tab/Tab";
import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import { EventColumns, UserColumns } from "./TableData";
import { noneUserReserveListApi, userReserveListApi } from "@/api/ticketing";
import { paginateSelector } from "@/recoil/paginate";
import "./historytable.scss";

export const HistoryTable = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const [tabnumber, setTabnumber] = useState(0);
  const getPaging = useRecoilValue(paginateSelector);

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  // 회원 - 등록자, 예약자
  const { data: memberData, isSuccess: memberDataSuccess } = useQuery({
    queryKey: ["event-reservelist", getPaging],
    queryFn: () => userReserveListApi(getCookie("ticket-atk"), getPaging),
    enabled: typeof getCookie("ticket-atk") === "string",
  });

  // 비회원
  const {
    data: nonmemberData,
    isSuccess: nonmemberDataSuccess,
    isError,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["event-reservelist", getPaging],
    queryFn: () =>
      noneUserReserveListApi(
        getCookie("ticket-atk")?.name,
        getCookie("ticket-atk")?.phone,
        getPaging
      ),
    enabled: typeof getCookie("ticket-atk") === "object",
  });

  const data =
    typeof getCookie("ticket-atk") === "string" ? memberData : nonmemberData;
  const userType =
    typeof getCookie("ticket-atk") === "string" ? "myPageResponse" : "content";

  // console.log('예약 내역', getnonMemberatom, nonmemberData);
  console.log("rq error : ", data, isFetched);

  return (
    <>
      {data && data?.data.totalCount > 0 ? (
        <>
          <Tab
            tabName={"historyTable"}
            className="mb-20"
            tabNumber={setTabnumber}
          />
          <div className="historytable">
            <div className="min-h-460">
              <table>
                <thead className="bg-gray-200 border-b">
                  {columns.map((column, key) => (
                    <HistoryTableHeader key={key} column={column} />
                  ))}
                </thead>
                <tbody>
                  {data &&
                    data?.data.myPageResponse.map((row: any, key: any) => (
                      <HistoryTableBody key={key} row={row} />
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              pageCount={Math.ceil(data && data?.data.totalCount / 10)}
              // handlePageChange={handlePageChange}
              // paginatekey="historyTable"
            />
          </div>
        </>
      ) : (
        "내역이 없습니다"
      )}
    </>
  );
};
