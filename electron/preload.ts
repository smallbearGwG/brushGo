import { contextBridge, ipcRenderer } from "electron";

const brushService = async (
  serviceName: string,
  requestHeader: string,
  requestData: string
) => {
  return ipcRenderer.invoke(
    "brush:service",
    serviceName,
    requestHeader,
    requestData
  );
};

const clipboard = async (concat: string) => {
  return ipcRenderer.invoke("clipboard:text", concat);
};

contextBridge.exposeInMainWorld("electronAPI", { brushService, clipboard });
