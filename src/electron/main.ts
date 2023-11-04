import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

import brushService from "./ipcMSGs/brushService";
import callClipboard from "./ipcMSGs/callClipboard";
import windowOption from "./ipcMSGs/windowOption";
import exceTaskImport from "./ipcMSGs/excelTaskImport";
import excelCommentImport from "./ipcMSGs/excelCommentImport";

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    frame: false, //窗口无边框
    center: true, //是否一打开时居中
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  };

  // mainWindow.removeMenu();
  return mainWindow;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  const mainWindow = createWindow();

  //窗体最大化还原监听
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window", "maximize");
  });
  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window", "unmaximize");
  });

  //ipcMessage消息监听
  ipcMain.handle("service", brushService());
  ipcMain.handle("clipboard", callClipboard);
  ipcMain.handle("window", windowOption(mainWindow!));
  ipcMain.handle("exceTaskImport", exceTaskImport);
  ipcMain.handle("exceCommentImport", excelCommentImport);
});
