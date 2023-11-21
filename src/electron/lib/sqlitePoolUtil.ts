import { Database } from "sqlite3";
import { app } from "electron";

const DIR_NAME = app.getPath("userData");
const SUFFIX = "db";

interface SqliteUtilConfig {
    count: number
}

class SlqitePoolUtil {
    config: SqliteUtilConfig
    pool: Array<Database>
    constructor(config: SqliteUtilConfig) {
        //初始化
        SqliteInit(this.createConnection())

        this.config = config;
        this.pool = new Array<Database>()

        //create pool
        for (let i = 0; i < config.count; i++) {
            this.pool.push(this.createConnection())
        }
    }
    createConnection(): Database {
        const databaseName = DIR_NAME + `/brushDB.${SUFFIX}`;
        console.log("current location is " + databaseName)
        return new Database(databaseName)
    }
    getConnection(): Database | null {
        if (this.pool.length > 0) {
            return this.pool.pop()!
        } else if (this.pool.length < this.config.count) {
            return this.createConnection()
        } else {
            return null
        }
    }

    releaseConnection(conn: Database) {
        if (this.pool.length < this.config.count) {
            this.pool.push(conn);
        } else {
            conn.close();
        }
    }

}

const SqliteInit = (db: Database) => {
    db.get("SELECT name FROM sqlite_master WHERE type='table'", function (err, row) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(row)
            if (!row) {
                //第一次创建数据库
                console.log("the first open application init sqlite")
                firstCreateDatabaseCallFunction(db);
            }
        }
    });
    db.close
}

const firstCreateDatabaseCallFunction = (db: Database) => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        uuid TEXT PRIMARY KEY,
        operator TEXT,
        shop TEXT,
        time TEXT,
        showTime TEXT,
        orderNumber TEXT,
        orderId TEXT,
        amount TEXT,
        gift TEXT,
        expenditureChannel TEXT,
        note TEXT,
        operationPhone TEXT,
        phoneNumber TEXT,
        productName TEXT,
        keywords TEXT,
        jdToTbId TEXT,
        createTime DATETIME,
        updateTime DATETIME
      );`
    );

}

export type { SqliteUtilConfig }
export { SqliteInit }
export default SlqitePoolUtil
