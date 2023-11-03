import Task from "../../common/Task";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface TaskService {
  getAllTask: Function;
  getSingleTask: Function;
  addTask: Function;
  addTaskList: Function;
  updateTask: Function;
  removeTask: Function;
}

const lowData = dataUtil<Task[]>("task");

class TaskServiceImpl implements TaskService {
  sName: string = "taskService";
  getAllTask(): Task[] {
    lowData.read();
    const data = lowData.data;
    // lowData.write();
    return data;
  }
  getSingleTask(orderId: string): Task | null {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.orderId === orderId) {
        return currentData;
      }
    }
    return null;
  }
  addTask(newTask: Task) {
    lowData.read();
    const data = lowData.data;
    data.push({
      uuid: uuid(),
      operator: newTask.operator,
      shop: newTask.shop,
      time: newTask.time,
      showTime: newTask.showTime,
      orderNumber: newTask.orderNumber,
      orderId: newTask.orderId,
      amount: newTask.amount,
      gift: newTask.gift,
      expenditureChannel: newTask.expenditureChannel,
      note: newTask.note,
      operationPhone: newTask.operationPhone,
      phoneNumber: newTask.phoneNumber,
      productName: newTask.productName,
      keywords: newTask.keywords,
      jdToTbId: newTask.jdToTbId,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
  }
  addTaskList(newTaskList: Task[]) {
    lowData.read();
    const data = lowData.data;
    data.push(...newTaskList);
    lowData.write();
  }
  updateTask() {}
  removeTask() {}
}

export type { TaskService };
export default TaskServiceImpl;
