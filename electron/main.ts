import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import notificationUtl from "./lib/notificationUtil";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用 Node.js API
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
  ipcMain.handle("notification", () => {
    notificationUtl("1", "2");
  });

  createWindow();
});
