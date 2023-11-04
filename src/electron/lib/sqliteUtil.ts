import { Database } from "sqlite3";

export default class SlqiteUtil {
    db
    constructor() {
        this.db = new Database(":memory:")
    }
    test() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE lorem (info TEXT)");

            const stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
            for (let i = 0; i < 10; i++) {
                stmt.run("Ipsum " + i);
            }
            stmt.finalize();
        });
    }
}
