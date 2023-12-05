export const seatPrice = (
  normal?: number,
  premium?: number,
  seatA?: boolean,
  seatB?: boolean,
  seatC?: boolean
) => {
  const seatprice: any = [];

  if (seatA) {
    seatprice.push(premium);
  } else {
    seatprice.push(normal);
  }
  if (seatB) {
    seatprice.push(premium);
  } else {
    seatprice.push(normal);
  }
  if (seatC) {
    seatprice.push(premium);
  } else {
    seatprice.push(normal);
  }

  return seatprice;
};
