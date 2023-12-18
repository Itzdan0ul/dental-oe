import { ipcMain } from "electron";

ipcMain.handle("treatment:fetch", async (): Promise<Array<Treatment>> => {
  const { getTreatments } = await import("../main/app/database/managers/treatment");
  
  const treatments: Array<Treatment> = await getTreatments();

  return treatments;
});

ipcMain.handle("treatment:create", async (_, treatment: Treatment): Promise<boolean> => {
  const { createTreatment } = await import("../main/app/database/managers/treatment");

  const result: boolean = await createTreatment(treatment);

  return result;
});

ipcMain.handle("treatment:update", async (_, treatment: Treatment): Promise<boolean> => {
  const { updateTreatment } = await import("../main/app/database/managers/treatment");

  const result: boolean = await updateTreatment(treatment);

  return result;
});

ipcMain.handle("treatment:delete", async (_, id: number): Promise<boolean> => {
  const { deleteTreatment } = await import("../main/app/database/managers/treatment");

  const result: boolean = await deleteTreatment(id);

  return result;
});
