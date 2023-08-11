import { app, BrowserWindow } from "electron";
import path from "path";
import ipcMainDispatch from "./ipcMainDispatch";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, //窗口无边框
    center: true, //是否一打开时居中
    icon: path.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${path.join(process.env.DIST, "index.html")}#/`);
  //取消菜单
  mainWindow.removeMenu();
  mainWindow.webContents.openDevTools();

  return mainWindow;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  const mainWindow = createWindow();
  ipcMainDispatch(mainWindow);
});
