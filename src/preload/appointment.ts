import { ipcMain } from 'electron';

ipcMain.handle('appointment:fetch', async (): Promise<Array<Appointment>> => {
  const { getAppointments } = await import('../main/app/database/managers/appointment');

  const appointments: Array<Appointment> = await getAppointments();

  return appointments;
});

ipcMain.handle('appointment:create', async (_, appointment: Appointment): Promise<boolean> => {
  const { createAppointment } = await import('../main/app/database/managers/appointment');

  const result: boolean = await createAppointment(appointment);

  return result;
});

ipcMain.handle('appointment:update', async (_, appointment: Appointment): Promise<boolean> => {
  const { updateAppointment } = await import('../main/app/database/managers/appointment');

  const result: boolean = await updateAppointment(appointment);

  return result;
});

ipcMain.handle('appointment:delete', async (_, id: number): Promise<boolean> => {
  const { deleteAppointment } = await import('../main/app/database/managers/appointment');

  const result: boolean = await deleteAppointment(id);

  return result;
});
