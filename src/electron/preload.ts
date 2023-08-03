import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  brushService: (...args: string[]) => {
    ipcRenderer.invoke("brush:service", ...args);
  },
});
