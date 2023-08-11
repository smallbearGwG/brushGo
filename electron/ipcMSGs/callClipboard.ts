import { clipboard, IpcMainInvokeEvent } from "electron";

const callClipboard = async (event: IpcMainInvokeEvent, concat: string) => {
  clipboard.writeText(concat);
};

export default callClipboard;
