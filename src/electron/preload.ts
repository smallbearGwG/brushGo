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
  exceTaskImport: async (
    filePath: string,
    fileName: string,
  ) => {
    return ipcRenderer.invoke("exceTaskImport", filePath, fileName);
  },
  exceCommentImport: async (
    filePath: string,
    fileName: string,
  ) => {
    return ipcRenderer.invoke("exceCommentImport", filePath, fileName);
  },

  //==============================================================================//

  // onWindow: (callback: (event: IpcRendererEvent, state: string) => void) =>
  //   ipcRenderer.on("window", callback),
});
