import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  notification: (message: string) =>
    ipcRenderer.invoke("notification", message),
});
