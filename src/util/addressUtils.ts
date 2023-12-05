export const LastPlace = (place: string) => {
  const lastSpaceIndex = place.lastIndexOf(" ");
  return place.substring(lastSpaceIndex + 1);
};
