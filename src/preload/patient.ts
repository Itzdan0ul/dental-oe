import { ipcMain } from 'electron';

ipcMain.handle('patient:fetch', async (): Promise<Array<Patient>> => {
  const { getPatients } = await import('../main/app/database/managers/patient');

  const patients: Array<Patient> = await getPatients();

  return patients;
});

ipcMain.handle('patient:create', async (_, patient: Patient): Promise<boolean> => {
  const { createPatient } = await import('../main/app/database/managers/patient');

  const result: boolean = await createPatient(patient);

  return result;
});

ipcMain.handle('patient:update', async (_, patient: Patient): Promise<boolean> => {
  const { updatePatient } = await import('../main/app/database/managers/patient');

  const result: boolean = await updatePatient(patient);

  return result;
});

ipcMain.handle('patient:delete', async (_, id: number): Promise<boolean> => {
  const { deletePatient } = await import('../main/app/database/managers/patient');

  const result: boolean = await deletePatient(id);

  return result;
});
