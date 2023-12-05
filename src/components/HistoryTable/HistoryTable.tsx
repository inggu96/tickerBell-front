"use client";

import { userReserveListApi } from "@/api/ticketing";
import { paginateSelector } from "@/recoil/paginate";
import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Pagination from "../pagination/Pagination";
import Tab from "../tab/Tab";
import "./historytable.scss";
import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import { EventColumns, UserColumns } from "./TableData";

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

  const data = memberData?.data;

  console.log("예약 내역 : ", data);

  return (
    <>
      {data && data?.totalElements > 0 ? (
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
                    data?.content.map((row: any, key: any) => (
                      <HistoryTableBody key={key} row={row} />
                    ))}
                </tbody>
              </table>
            </div>
            {/* <Pagination
              pageCount={Math.ceil(data && data?.data.totalCount / 10)}
              handlePageChange={handlePageChange}
              paginatekey="historyTable"
            /> */}
          </div>
        </>
      ) : (
        "내역이 없습니다"
      )}
    </>
  );
};
