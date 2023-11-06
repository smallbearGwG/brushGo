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
                        case "getCount":
                            return await taskService.getCount()
                        case "getPageTask":
                            return await taskService.getPageTask(requestData)
                        case "getSingleTask":
                            return await taskService.getSingleTask()
                        case "addTask":
                            return await taskService.addTask(requestData)
                        case "addTaskList":
                            return await taskService.addTaskList(requestData)
                        case "updateTask":
                            return await taskService.updateTask()
                        case "removeTask":
                            return await taskService.removeTask()
                    }
                    break;
                //=================================================//
                case "taskService":
                    break;
            }
        };
    }

}