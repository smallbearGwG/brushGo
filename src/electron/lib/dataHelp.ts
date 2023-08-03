import path from "path";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

//数据文件的位置
const DIR_NAME: string = __dirname;
//数据文件为空时的默认数据
const DEFAULTDATA = {};

const openData = (dataName: string) => {
  const dataPath = new JSONFile(path.join(DIR_NAME, dataName + ".json"));
  const db = new Low(dataPath, DEFAULTDATA);
  return db;
};

export default openData;
