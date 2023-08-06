import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import giftService from "./service/giftService";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

function createWindow() {
  let win: BrowserWindow = new BrowserWindow({
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
  //dispatch
  ipcMain.handle("brush:service", hbrushService);

  createWindow();
});

const hbrushService = async (
  event: IpcMainInvokeEvent,
  serviceName: string,
  requestHeader: string,
  requestData: any
) => {
  const serviceFunction = getServiceInMap(serviceName, requestHeader);
  if (serviceFunction) {
    const paramCount = (serviceFunction as (...args: any[]) => any).length;
    if (paramCount > 0) {
      return serviceFunction(requestData);
    } else {
      return serviceFunction();
    }
  }
  return undefined;
};

/**
 * 拿到对应的service方法
 */
const getServiceInMap = (
  serviceName: string,
  requestHeader: string
): Function | undefined => {
  const serviceMap = new Map<string, Map<string, Function>>();

  const giftServiceMap = new Map<string, Function>();
  giftServiceMap.set("getAllGift", giftService.getAllGift);
  giftServiceMap.set("getSingleGift", giftService.getSingleGift);
  giftServiceMap.set("addGift", giftService.getSingleGift);
  giftServiceMap.set("updateGift", giftService.updateGift);
  giftServiceMap.set("removeGift", giftService.removeGift);

  serviceMap.set("giftService", giftServiceMap);
  if (serviceMap.get(serviceName)) {
    const functionsMap = serviceMap.get(serviceName) as Map<string, Function>;
    if (functionsMap.get(requestHeader)) {
      const func = functionsMap.get(requestHeader);
      return func;
    }
    return undefined;
  }
  return undefined;
};
