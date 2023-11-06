import { Database } from "sqlite3";

export default class SqliteExecuteUtil {

    /**
     * synchronous execution sqlite3's run
     * @param conn 
     * @param sql 
     * @param parame 
     * @returns 
     */
    static async run(conn: Database, sql: string, parame?: any): Promise<any> {
        return new Promise(() => {
            conn.run(sql, parame)
        })
    }

    /**
     * synchronous execution sqlite3's get
     * @param conn 
     * @param sql 
     * @param parame 
     * @returns 
     */
    static async get(conn: Database, sql: string, parame?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            conn.get(sql, parame, function (err: any, rows: unknown) {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        })
    }

    /**
     * synchronous execution sqlite3's all
     * @param conn 
     * @param sql 
     * @param parame 
     * @returns 
     */
    static async all(conn: Database, sql: string, parame?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            conn.all(sql, parame, function (err: any, rows: unknown) {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        })
    }

    static async runList(conn: Database, sql: string, parames?: Array<any>) {
        return new Promise(() => {
            conn.serialize(() => {
                const stmt = conn.prepare(sql)
                for (let parame of parames!) {
                    stmt.run(parame)
                }

            })
        })
    }
}