import { IpcMainInvokeEvent } from "electron";
import xlsx from "node-xlsx";
import Comment from "../../common/Comment";

const SHEET_NUMBER = 1;
const COMMENT_NUMBER = 2;

const exceImport = async (
  _event: IpcMainInvokeEvent,
  filePath: string,
  _fileName: string
) => {
  const workSheetsFromFile = xlsx.parse(filePath);
  try {
    if (workSheetsFromFile.length > 0) {
      const comments: Comment[] = [];
      for (let i = SHEET_NUMBER; i < workSheetsFromFile.length; i++) {
        const currentSheet = workSheetsFromFile[i];
        const mainComment: string[] = [];
        const appendComment: string[] = [];
        for (let j = COMMENT_NUMBER; j < currentSheet.data.length; j++) {
          let data = currentSheet.data[j];
          if (data[0] !== undefined) {
            mainComment.push(data[0] == undefined ? "" : data[0]);
            appendComment.push(data[1] == undefined ? "" : data[1]);
          }
        }
        comments.push({
          name: currentSheet.name,
          mainComment: mainComment,
          appendComment: appendComment,
        });
      }
      return comments;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default exceImport;
