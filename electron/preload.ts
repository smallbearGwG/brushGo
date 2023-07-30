import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  notification: () => ipcRenderer.invoke("notification"),
});
