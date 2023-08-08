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

contextBridge.exposeInMainWorld("electronAPI", { brushService });
