import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  brushService: async (
    serviceName: string,
    requestHeader: string,
    requestData: string
  ) => {
    return ipcRenderer.invoke(
      "service",
      serviceName,
      requestHeader,
      requestData
    );
  },
  callClipboard: async (concat: string) => {
    return ipcRenderer.invoke("clipboard", concat);
  },
  windowOption: async (option: string) => {
    return ipcRenderer.invoke("window", option);
  },
  excelService: async (filePath: string, fileName: string, option: string) => {
    return ipcRenderer.invoke("excel", filePath, fileName, option);
  },

  ///////////////////////

  onWindow: (callback: (event: IpcRendererEvent, state: string) => void) =>
    ipcRenderer.on("window", callback),
});
