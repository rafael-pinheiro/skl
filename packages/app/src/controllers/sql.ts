import { ipcMain } from "electron";
import { runSQL } from "data-server";

ipcMain.handle("sql/run", runSQL);
