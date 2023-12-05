export const onlyDate = (dateString: string): string => {
  return dateString.split("T")[0];
};
