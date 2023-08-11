import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import handleBrushService from "./ipcmessages/handleBrushService";
import handleClipboard from "./ipcmessages/handleClipboard";
import handleWindow from "./ipcmessages/handleWindow";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, //窗口无边框
    center: true, //是否一打开时居中
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${path.join(process.env.DIST, "index.html")}#/`);
  //取消菜单
  mainWindow.removeMenu();
  mainWindow.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("service", handleBrushService);
  ipcMain.handle("clipboard", handleClipboard);
  ipcMain.handle("window", handleWindow(mainWindow!));
});
