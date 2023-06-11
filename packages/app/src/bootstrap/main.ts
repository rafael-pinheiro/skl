import { join } from "node:path";
import { app, BrowserWindow } from "electron";

import "../controllers/sql";

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, "/renderer.js"),
    },
  });

  win.maximize();

  win.webContents.openDevTools();

  win.loadURL("http://localhost:3001/");
});

// quitting the app when no windows are open on non-macOS platforms
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
