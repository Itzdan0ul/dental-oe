import { ipcMain, shell } from "electron";

ipcMain.on('get-help', (): void => {
  shell.openExternal('https://github.com/Itzdan0ul/dental-oe/issues')
});
