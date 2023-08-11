import { BrowserWindow, ipcMain } from "electron";

import brushService from "./ipcMSGs/brushService";
import callClipboard from "./ipcMSGs/callClipboard";
import windowOption from "./ipcMSGs/windowOption";

const ipcMainDispatch = (mainWindow: BrowserWindow) => {
  //
  ipcMain.handle("service", brushService);
  //
  ipcMain.handle("clipboard", callClipboard);
  //
  ipcMain.handle("window", windowOption(mainWindow!));
};

export default ipcMainDispatch;
