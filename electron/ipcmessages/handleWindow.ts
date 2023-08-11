import { BrowserWindow, IpcMainInvokeEvent } from "electron";

const handleWindow = (mainWindow: BrowserWindow): any => {
  return (event: IpcMainInvokeEvent, option: string): any => {
    switch (option) {
      case "state":
        return mainWindow.isMaximized();
      case "minimize":
        mainWindow.minimize();
        break;
      case "maximize":
        mainWindow.maximize();
        break;
      case "restore":
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

export default handleWindow;
