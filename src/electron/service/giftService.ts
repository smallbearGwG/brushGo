import openData from "../lib/dataHelp";

interface GiftService {
  getAllGift: Function;
  getSingleGift: Function;
  addGift: Function;
  removeGift: Function;
}

const lowData = openData("gift");

const service: GiftService = {
  getAllGift: () => {
    lowData.read();
    return lowData.data;
  },
  getSingleGift: (giftName: string) => {
    lowData.read();
  },
  addGift: (giftName: string) => {},
  removeGift: (giftName: string) => {},
};

export type { GiftService };
export default service;
