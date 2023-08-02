import path from "path";
import { app } from "electron";

import { LowSync } from "lowdb";
import { JSONFile } from "lowdb/node";

const dataPath = new JSONFile(path.join(app.getPath("userData"), "data.json"));
const defaultData = { posts: [] };

const db = new LowSync(dataPath, defaultData);

db.read();
db.write();

export default db;
