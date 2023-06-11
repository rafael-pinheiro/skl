const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sql", {
  run: () => ipcRenderer.invoke("sql/run"),
});
