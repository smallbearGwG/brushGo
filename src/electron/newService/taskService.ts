import Task from "src/common/Task";
import SlqitePoolUtil from "../lib/sqlitePoolUtil";
import uuid from "../lib/uuid";
import SqliteExecuteUtil from "../lib/sqliteExecuteUtil";

interface TaskService {
    getAllTask: Function;
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

    async getAllTask(): Promise<any> {
        const conn = this.sqliteConnPoll.getConnection();
        const sql = `SELECT * FROM tasks`
        if (conn) {
            const result = await SqliteExecuteUtil.all(conn, sql)
            console.log(result)
            return result
        }
    }
    getSingleTask() { }
    addTask(newTask: Task) {
        const conn = this.sqliteConnPoll.getConnection();
        if (conn) {
            const sql = `INSERT INTO tasks (uuid, operator, shop, time, showTime, orderNumber, orderId, amount, gift, expenditureChannel, note, operationPhone, phoneNumber, productName, keywords, jdToTbId, createTime, updateTime)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
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
            conn.run(sql, values, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });

            this.sqliteConnPoll.releaseConnection(conn)
        }
    }
    addTaskList(newTaskList: Array<Task>) {
        newTaskList.forEach(task => {
            this.addTask(task)
        })
    }
    updateTask() { }
    removeTask() { }
}

export default TaskServiceImple