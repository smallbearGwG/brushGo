import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  win.loadURL(`file://${path.join(process.env.DIST, "index.html")}#/`);
  //取消菜单
  win.removeMenu();
  win.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  //无窗口打开时自动退出
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("notification", (event: IpcMainInvokeEvent, arg: []) => {});

  createWindow();
});
