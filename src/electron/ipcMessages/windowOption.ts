import { BrowserWindow, IpcMainInvokeEvent } from "electron";

const windowOption = (mainWindow: BrowserWindow): any => {
  return (_event: IpcMainInvokeEvent, option: string) => {
    switch (option) {
      case "minimize":
        mainWindow.minimize();
        break;
      case "maximize":
        mainWindow.maximize();
        break;
      case "unmaximize":
        mainWindow.unmaximize();
        break;
      case "close":
        mainWindow.close();
        break;
      default:
        //DO NOTHING~~~~
        break;
    }
  };
};

export default windowOption;
