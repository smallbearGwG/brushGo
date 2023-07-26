import { app, BrowserWindow } from "electron";
import path from "node:path";

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
    hasShadow: false, // 展示阴影
    roundedCorners: false, // 阻止圆角
  });

  //取消菜单
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
