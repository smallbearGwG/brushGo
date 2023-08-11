import path from "path";
import fs from "fs";
import { app } from "electron";
import { LowSync, SyncAdapter } from "lowdb";

//数据文件的位置
let DIR_NAME = __dirname;

class DJsonFile<T> implements SyncAdapter<T> {
  filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
  read(): T | null {
    if (fs.existsSync(this.filename)) {
      const data = fs.readFileSync(this.filename);
      const jsonString = data.toString("utf-8");
      const jsonData = JSON.parse(jsonString);
      return jsonData as T;
    }
    return null;
  }
  write(data: T): void {
    const jsonString = JSON.stringify(data);
    const bufferData = Buffer.from(jsonString, "utf-8");
    fs.writeFile(this.filename, bufferData, (err) => {});
  }
}

const openData = <T>(dataName: string) => {
  const dataPath = new DJsonFile<T>(path.join(DIR_NAME, dataName + ".data"));
  const db = new LowSync<T>(dataPath, <T>[]);
  return db;
};

export default openData;
