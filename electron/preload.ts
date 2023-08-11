import { contextBridge, ipcRenderer } from "electron";

const brushService = async (
  serviceName: string,
  requestHeader: string,
  requestData: string
) => {
  return ipcRenderer.invoke("service", serviceName, requestHeader, requestData);
};

const callClipboard = async (concat: string) => {
  return ipcRenderer.invoke("clipboard", concat);
};

const windowOption = async (option: string) => {
  return ipcRenderer.invoke("window", option);
};

contextBridge.exposeInMainWorld("electronAPI", {
  brushService,
  callClipboard,
  windowOption,
});
