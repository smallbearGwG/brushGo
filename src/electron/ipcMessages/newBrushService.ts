import { IpcMainInvokeEvent } from "electron";
import SlqitePoolUtil from "../lib/sqlitePoolUtil"
import TaskService from "../newService/taskService"

export default class brushService {
    sqliteConnPoll: SlqitePoolUtil;
    constructor(sqliteConnPoll: SlqitePoolUtil) {
        this.sqliteConnPoll = sqliteConnPoll;
    }
    async ipcCAll() {
        return async (
            _event: IpcMainInvokeEvent,
            serviceName: string,
            requestHeader: string,
            requestData: any
        ): Promise<any> => {
            switch (serviceName) {
                //=================================================//
                case "taskService":
                    const taskService = new TaskService(this.sqliteConnPoll)
                    switch (requestHeader) {
                        case "getAllTask":
                            return await taskService.getAllTask()
                        case "getSingleTask":
                            return taskService.getSingleTask()
                        case "addTask":
                            return taskService.addTask(requestData)
                        case "addTaskList":
                            return taskService.addTaskList(requestData)
                        case "updateTask":
                            return taskService.updateTask()
                        case "removeTask":
                            return taskService.removeTask()
                            break;
                    }
                    break;
                //=================================================//
                case "taskService":
                    break;
            }
        };
    }

}