import { IpcMainInvokeEvent } from "electron";
import xlsx from "node-xlsx";
import Task from "../../common/Task";
import Comment from "../../common/Comment";

const timeToTime = (julianDay: string) => {
  return new Date((Number(julianDay) - 25569) * 86400 * 1000);
};

const getShowTimes = (date: Date): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const excelService = async (
  _event: IpcMainInvokeEvent,
  filePath: string,
  _fileName: string,
  option: string
) => {
  const workSheetsFromFile = xlsx.parse(filePath);
  try {
    if (option === "task") {
      if (workSheetsFromFile.length > 0) {
        const tasks: Task[] = new Array<Task>();
        const taskSheet = workSheetsFromFile[0];
        for (let i = 0; i < taskSheet.data.length; i++) {
          const data = taskSheet.data[i];
          const time = timeToTime(data[2]);
          const showTime = getShowTimes(time);

          tasks.push({
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
          });
        }
        return tasks;
      }
    } else if (option === "comment") {
      if (workSheetsFromFile.length > 0) {
        const comments: Comment[] = [];
        for (let i = 1; i < workSheetsFromFile.length; i++) {
          const currentSheet = workSheetsFromFile[i];
          const mainComments: string[] = [];
          const appendComment: string[] = [];
          for (let j = 0; j < currentSheet.data.length; j++) {
            let data = currentSheet.data[j];
            if (data[0] !== undefined) {
              mainComments.push(data[0]);
              appendComment.push(data[1] == undefined ? "" : data[1]);
            }
          }
          comments.push({
            name: currentSheet.name,
            mainComment: mainComments,
            appendComment: appendComment,
          });
        }
        return comments;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default excelService;
