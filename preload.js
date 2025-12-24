const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("milk", {
    saveFile: (data) => ipcRenderer.invoke("save-file", data)
});
