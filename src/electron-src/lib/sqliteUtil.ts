import { Database } from "sqlite3";

export default class SlqiteUtil {
    db
    constructor() {
        this.db = new Database(":memory:")
    }
    test() {
        this.db.get('SELECT RANDOM() % 100 as result',
            (_, res) => console.log(res))
    }
}
