import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

import BrushService from "./ipcMessages/newBrushService";
import callClipboard from "./ipcMessages/callClipboard";
import windowOption from "./ipcMessages/windowOption";
import exceTaskImport from "./ipcMessages/excelTaskImport";
import excelCommentImport from "./ipcMessages/excelCommentImport";
import SlqitePoolUtil from "./lib/sqlitePoolUtil";

const sqliteConnPoll = new SlqitePoolUtil({ count: 10 })

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    // frame: false, //窗口无边框
    center: true, //是否一打开时居中
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    show: false,
  });
  mainWindow.once("ready-to-show", ()=>{
    mainWindow.show()
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  };

  // mainWindow.removeMenu();
  return mainWindow;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(async () => {
  const mainWindow = createWindow();

  //窗体最大化还原监听
  // mainWindow.on("maximize", () => {
  //   mainWindow.webContents.send("window", "maximize");
  // });
  // mainWindow.on("unmaximize", () => {
  //   mainWindow.webContents.send("window", "unmaximize");
  // });

  //TODO:赶快给老子改了
  const brushService = new BrushService(sqliteConnPoll);
  ipcMain.handle("service", await brushService.ipcCAll());
  ipcMain.handle("clipboard", callClipboard);
  ipcMain.handle("window", windowOption(mainWindow));
  ipcMain.handle("exceTaskImport", exceTaskImport);
  ipcMain.handle("exceCommentImport", excelCommentImport);
});
