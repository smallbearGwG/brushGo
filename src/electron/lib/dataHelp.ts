import path from "path";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

//数据文件的位置
const DIR_NAME: string = __dirname;

const openData = <T>(dataName: string) => {
  const dataPath = new JSONFileSync<T>(path.join(DIR_NAME, dataName + ".json"));
  const db = new LowSync<T>(dataPath, <T>[]);
  return db;
};

export default openData;
