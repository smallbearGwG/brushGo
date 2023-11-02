import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

import brushService from "./ipcMSGs/brushService";
import callClipboard from "./ipcMSGs/callClipboard";
import windowOption from "./ipcMSGs/windowOption";
import exceTaskImport from "./ipcMSGs/excelTaskImport";
import excelCommentImport from "./ipcMSGs/excelCommentImport";
import SlqiteUtil from "./lib/sqliteUtil";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    frame: false, //窗口无边框
    center: true, //是否一打开时居中
    icon: path.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.join(process.env.DIST, "index.html")}#/`);
  }
  mainWindow.removeMenu();
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

  ipcMain.handle("service", brushService());
  ipcMain.handle("clipboard", callClipboard);
  ipcMain.handle("window", windowOption(mainWindow!));
  ipcMain.handle("exceTaskImport", exceTaskImport);
  ipcMain.handle("exceCommentImport", excelCommentImport);

  new SlqiteUtil().test()
});
