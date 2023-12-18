import { ipcMain } from 'electron';

ipcMain.handle('user:fetch', async (): Promise<Array<User>> => {
  const { getUsers } = await import('../main/app/database/managers/user');

  const users: Array<User> = await getUsers();

  return users;
});
