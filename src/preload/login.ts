import { ipcMain } from 'electron';
import MainWindow from '../main/window/MainWindow';
import { SOURCE_FILE } from '../main/constants';

ipcMain.handle('login', async (_, user: User): Promise<boolean> => {
  const { login } = await import('../main/app/database/managers/login');

  const loginSuccessful: boolean = await login(user);

  if (loginSuccessful) {
    MainWindow.getInstance().loadURL(`${SOURCE_FILE}/dashboard/home`);

    return loginSuccessful;
  }

  return loginSuccessful;
});

ipcMain.on('logout', (): void => {
  MainWindow.getInstance().loadURL(`${SOURCE_FILE}/login`);
});
