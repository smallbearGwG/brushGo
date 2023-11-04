import path from "path";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { app } from "electron";

//数据文件的位置
const DIR_NAME = app.getPath("userData");
const SUFFIX = "data";

const dataUtil = <T>(dataName: string) => {
  const dataPath = new JSONFileSync<T>(
    path.join(DIR_NAME, `${dataName}.${SUFFIX}`)
  );
  const db = new LowSync<T>(dataPath, <T>[]);
  return db;
};

export default dataUtil;