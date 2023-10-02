import path from "path";
import crypto from "crypto";
import fs from "fs";
import { LowSync, SyncAdapter } from "lowdb";
import { JSONFileSync } from "lowdb/node";

//数据文件的位置
const DIR_NAME = __dirname;
const SUFFIX = "data";

const key = crypto.createHash("sha256").update("youAreSuchABigPig").digest();
const FIXED_IV = "0123456789abcdef0123456789abcdef";
const iv = Buffer.from(FIXED_IV, "hex");

const encrypt = (data: string): string => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

function decrypt(encryptedData: string) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

class DJsonFile<T> implements SyncAdapter<T> {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }
  read(): T | null {
    if (!fs.existsSync(this.fileName)) {
      return null;
    }
    const fData = fs.readFileSync(this.fileName, "utf-8");
    const decodeData = decrypt(fData);
    const data = JSON.parse(decodeData);
    return data as T;
  }
  write(data: T): void {
    const jsonStr = JSON.stringify(data);
    const encodeData = encrypt(jsonStr);
    fs.writeFileSync(this.fileName, encodeData, "utf-8");
  }
}

const dataUtil = <T>(dataName: string) => {
  const dataPath = new JSONFileSync<T>(
    path.join(DIR_NAME, `${dataName}.${SUFFIX}`)
  );
  const db = new LowSync<T>(dataPath, <T>[]);
  return db;
};

export default dataUtil;
