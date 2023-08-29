import Shop from "../../common/Shop";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface ShopService {
  getAllShop: Function;
  getSingleShop: Function;
  addShop: Function;
  removeShop: Function;
}

const lowData = dataUtil<Shop[]>("shop");

class ShopServiceImpl implements ShopService {
  sName: string = "shopService";

  getAllShop(): Shop[] {
    lowData.read();
    const data = lowData.data;
    lowData.write();
    return data;
  }
  getSingleShop(name: string): Shop {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.name === name) {
        return currentData;
      }
    }
    return {};
  }
  addShop(newShopName: string): boolean {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.name === newShopName) {
        return false;
      }
    }
    data.push({
      uuid: uuid(),
      name: newShopName,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  }
  removeShop(shopUUid: string): boolean {
    lowData.read();
    for (let i = 0; i < lowData.data.length; i++) {
      const data = lowData.data[i];
      if (data.uuid === shopUUid) {
        lowData.data.splice(i, 1);
        lowData.write();
        return true;
      }
    }
    return false;
  }
}

export type { ShopService };
export default ShopServiceImpl;
