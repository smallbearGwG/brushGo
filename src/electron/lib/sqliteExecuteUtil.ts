import { Database } from "sqlite3";

export default class SqliteExecuteUtil {
    static all(conn: Database, sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            conn.all(sql, function (err, rows) {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        })
    }
}