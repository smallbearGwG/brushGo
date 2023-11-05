import { IpcMainInvokeEvent } from "electron";
import xlsx from "node-xlsx";
import Task from "../../common/Task";

const timeToTime = (originDateString: string) => {
  return new Date((Number(originDateString) - 25569) * 86400 * 1000);
};

const getShowTimes = (date: Date): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const exceImport = async (
  _event: IpcMainInvokeEvent,
  filePath: string,
  _fileName: string
) => {
  const workSheetsFromFile = xlsx.parse(filePath);
  try {
    if (workSheetsFromFile.length > 0) {
      const tasks: Task[] = new Array<Task>();
      const taskSheet = workSheetsFromFile[0];
      for (let i = 0; i < taskSheet.data.length; i++) {
        const data = taskSheet.data[i];
        const time = timeToTime(data[2]);
        const showTime = getShowTimes(time);
        tasks.push({
          uuid: "",
          operator: data[0],
          shop: data[1],
          time: time.toString(),
          showTime: showTime,
          orderNumber: data[3],
          orderId: data[4],
          amount: data[5],
          gift: data[6],
          expenditureChannel: data[7],
          note: data[8],
          operationPhone: data[9],
          phoneNumber: data[10],
          productName: data[11],
          keywords: data[12],
          jdToTbId: data[13],
          createTime: new Date(),
          updateTime: new Date(),
        });
      }
      return tasks;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default exceImport;
