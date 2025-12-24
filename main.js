const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

let win;

app.whenReady().then(() => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#050505",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile("index.html");
});

ipcMain.handle("save-file", async (event, data) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Save Milkplayer Data",
        defaultPath: "milkplayer-save.json"
    });

    if (canceled || !filePath) return false;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
});
