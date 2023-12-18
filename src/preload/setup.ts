import { ipcMain } from 'electron';
import { SOURCE_FILE } from '../main/constants';
import MainWindow from '../main/window/MainWindow';

ipcMain.once('setup:create', async (_, user: User): Promise<void> => {
  const { createSystemUser } = await import('../main/app/database/managers/setup');

  const isCreated: boolean = await createSystemUser(user);

  if (isCreated) {
    MainWindow.getInstance().loadURL(`${SOURCE_FILE}/login`);
  }
});
