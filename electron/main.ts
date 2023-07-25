import { app, BrowserWindow } from "electron";
import path from "node:path";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    width: 1024,
    height: 768,
  });

  win.removeMenu();
  win.loadURL(path.join(process.env.DIST, "index.html"));
}

app.on("window-all-closed", () => {
  //无窗口打开时自动退出
  if (process.platform !== "darwin") app.quit();
  win = null;
});

app.whenReady().then(() => {
  createWindow();
});
