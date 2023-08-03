import path from "path";

import { LowSync } from "lowdb";
import { JSONFile } from "lowdb/node";

const dataPath = new JSONFile(path.join(__dirname, "data.json"));
console.log(path.join(__dirname, "data.json"))
const defaultData = { posts: [] };

const db = new LowSync(dataPath, defaultData);

db.read();
db.write();

export default db;
