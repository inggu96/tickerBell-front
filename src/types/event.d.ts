interface FormData {
  name: string;
  startEvent: Date;
  endEvent: Date;
  dailyStartEvent: Date;
  eventTime: number;
  availablePurchaseTime: Date;
  normalPrice: number;
  premiumPrice: number;
  saleDegree: number;
  castings: { name: string }[];
  hosts: { name: string }[];
  place: string;
  description: string;
  isAdult: string;
  isSpecialA: boolean;
  isSpecialB: boolean;
  isSpecialC: boolean;
  category: string;
  tags: { name: string }[];
  thumbnailUrl: string;
  imageUrls: string[];
}

interface ImageFormSubmitValue {
  atk: string;
  thumbNailImage: File;
  eventImages: File[];
}
