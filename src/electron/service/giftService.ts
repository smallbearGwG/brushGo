import Gift from "../datas/gift";
import openData from "../lib/dataHelp";
import uuid from "../lib/uuid";

interface GiftService {
  getAllGift: Function;
  getSingleGift: Function;
  addGift: Function;
  removeGift: Function;
}

const lowData = openData<Gift[]>("gift");

const service: GiftService = {
  getAllGift: () => {
    lowData.read();
    const data = lowData.data;
    return data;
  },
  getSingleGift: (giftName: string) => {
    lowData.read();
  },
  addGift: (giftName: string) => {
    //todo：名称重复
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.name === giftName) {
        //名称重复
        return false;
      }
    }
    data.push({
      uuid: uuid(),
      name: giftName,
      state: false,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  },
  removeGift: (giftName: string) => {},
};

export type { GiftService };
export default service;
