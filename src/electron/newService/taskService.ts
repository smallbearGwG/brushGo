import Task from "src/common/Task";
import SlqitePoolUtil from "../lib/sqlitePoolUtil";
import uuid from "../lib/uuid";
import SqliteExecuteUtil from "../lib/sqliteExecuteUtil";

interface TaskService {
    getCount: Function;
    getPageTask: Function;
    getSingleTask: Function;
    addTask: Function;
    addTaskList: Function;
    updateTask: Function;
    removeTask: Function;
}

class TaskServiceImple implements TaskService {
    sqliteConnPoll: SlqitePoolUtil;
    constructor(sqliteConnPoll: SlqitePoolUtil) {
        this.sqliteConnPoll = sqliteConnPoll
    }
    async getCount(): Promise<number> {
        const conn = this.sqliteConnPoll.getConnection();
        const sql = `SELECT COUNT(1) FROM tasks`
        if (conn) {
            const result = await SqliteExecuteUtil.get(conn, sql)
            this.sqliteConnPoll.releaseConnection(conn)
            return result
        }
        return 0
    }

    async getPageTask(requestData: any): Promise<any> {
        const { limit, offset }: { limit: number, offset: number } = requestData;
        const conn = this.sqliteConnPoll.getConnection();
        const sql = `SELECT * FROM tasks LIMIT ? OFFSET ?`
        if (conn) {
            const result = await SqliteExecuteUtil.all(conn, sql, [limit, offset])
            this.sqliteConnPoll.releaseConnection(conn)
            return result
        }
    }
    async getSingleTask() { }
    async addTask(newTask: Task) {
        const conn = this.sqliteConnPoll.getConnection();
        if (conn) {
            const sql = `INSERT INTO tasks (uuid, operator, shop, time, showTime, orderNumber, orderId, amount, gift, expenditureChannel, note, operationPhone, phoneNumber, productName, keywords, jdToTbId, createTime, updateTime)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const handledTak = [
                uuid(),
                newTask.operator,
                newTask.shop,
                newTask.time,
                newTask.showTime,
                newTask.orderNumber,
                newTask.orderId,
                newTask.amount,
                newTask.gift,
                newTask.expenditureChannel,
                newTask.note,
                newTask.operationPhone,
                newTask.phoneNumber,
                newTask.productName,
                newTask.keywords,
                newTask.jdToTbId,
                new Date(),
                new Date()]
            await SqliteExecuteUtil.run(conn, sql, handledTak);
            this.sqliteConnPoll.releaseConnection(conn)
        }
    }
    async addTaskList(newTaskList: Array<Task>) {
        const conn = this.sqliteConnPoll.getConnection();
        if (conn) {
            const sql = `INSERT INTO tasks (uuid, operator, shop, time, showTime, orderNumber, orderId, amount, gift, expenditureChannel, note, operationPhone, phoneNumber, productName, keywords, jdToTbId, createTime, updateTime)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const handledTak: Array<any> = new Array()

            newTaskList.forEach(task => {
                handledTak.push([
                    uuid(),
                    task.operator,
                    task.shop,
                    task.time,
                    task.showTime,
                    task.orderNumber,
                    task.orderId,
                    task.amount,
                    task.gift,
                    task.expenditureChannel,
                    task.note,
                    task.operationPhone,
                    task.phoneNumber,
                    task.productName,
                    task.keywords,
                    task.jdToTbId,
                    new Date(),
                    new Date()
                ])
            })
            await SqliteExecuteUtil.runList(conn, sql, handledTak);
            this.sqliteConnPoll.releaseConnection(conn)
        }
    }
    async updateTask() { }
    async removeTask() { }
}

export default TaskServiceImple