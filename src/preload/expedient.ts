import { ipcMain } from "electron";

ipcMain.handle('expedient:fetch', async (): Promise<Array<Expedient>> => {
  const { getExpedients } = await import('../main/app/database/managers/expedient');

  return getExpedients();
});

ipcMain.handle('expedient:create', async (_, expedient: Expedient): Promise<boolean> => {
  const { createExpedient } = await import('../main/app/database/managers/expedient');

  return createExpedient(expedient);
});

ipcMain.handle('expedient:update', async (_, expedient: Expedient): Promise<boolean> => {
  const { updateExpedient } = await import('../main/app/database/managers/expedient');

  return updateExpedient(expedient);
});

ipcMain.handle('expedient:delete', async (_, id: number): Promise<boolean> => {
  const { deleteExpedient } = await import('../main/app/database/managers/expedient');

  return deleteExpedient(id);
});
