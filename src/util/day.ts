import dayjs from "dayjs";

export const openDay = (date: any) => {
  const today = dayjs();
  const isTodayBeforeOtherDate = today.isBefore(date);
};

export const day = (date: any) => {
  return dayjs(date).format("YY-MM-DD HH:mm");
};

export const weekDay = (week: number) => {
  const today = dayjs();
  return today.add(week * 7, "day");
};

export const today = () => {
  const now = dayjs();
  const todayDate = now.format("YY-MM-DD HH:mm");
  return todayDate;
};

export const date = (date: any) => {
  return dayjs(date).format("YY-MM-DD");
};

export const calenderDateType = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD");
};

export const dayCompare = (dateA: any, dateB: any) => {
  const date1 = dayjs(dateA, "YY-MM-DD HH:mm");
  const date2 = dayjs(dateB, "YY-MM-DD HH:mm");

  if (date1.isBefore(date2)) {
    // console.log("date1이 date2보다 이전.");
    return true;
  } else if (date1.isAfter(date2)) {
    // console.log("date1이 date2보다 이후.");
    return false;
  } else {
    // console.log("같은 날짜");
    return null;
  }
};
