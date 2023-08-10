import { clipboard, IpcMainInvokeEvent } from "electron";

const handleClipboard = async (event: IpcMainInvokeEvent, concat: string) => {
  clipboard.writeText(concat);
};

export default handleClipboard;
