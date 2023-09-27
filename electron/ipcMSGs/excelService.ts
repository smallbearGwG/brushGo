import { IpcMainInvokeEvent } from "electron";
import xlsx from "node-xlsx";

const excelService = async (
  _event: IpcMainInvokeEvent,
  filePath: string,
  fileName: string,
  option: string
) => {
  const workSheetsFromFile = xlsx.parse(filePath);
  console.log(workSheetsFromFile)
};

export default excelService;
