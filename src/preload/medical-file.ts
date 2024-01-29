import fs from 'fs-extra';
import { dialog, ipcMain } from 'electron';
import MainWindow from '../main/window/MainWindow';
import { FILES_DIR } from '../main/constants';

ipcMain.handle('medicalFile:fetch', async (_, expedientId: number): Promise<Array<MedicalFile>> => {
  const { getMedicalFiles } = await import('../main/app/database/managers/medical-file');

  const MedicalFiles: Array<MedicalFile> = await getMedicalFiles(expedientId);

  return MedicalFiles;
});

ipcMain.handle('medicalFile:create', async (_, expedientId: number): Promise<boolean> => {
  const response = await dialog.showOpenDialog(MainWindow.getInstance(), {
    message: 'Select a file',
    properties: ['openFile'],
    filters: [{ name: '*.jpg, *.jpeg, *.png, *.webp, *.svg', extensions: ['jpg', 'jpeg', 'png', 'webp', 'svg'] }],
  });

  if (response.canceled) {
    return false;
  }

  fs.copySync(response.filePaths[0], `${FILES_DIR}${response.filePaths[0].split('\\').pop()!}`, { overwrite: true });

  const { createMedicalFile } = await import('../main/app/database/managers/medical-file');

  const medicalFile: any = {
    name: response.filePaths[0].split('\\').pop()!,
    path: `${FILES_DIR}${response.filePaths[0].split('\\').pop()!}`,
    expedientId,
  };

  await createMedicalFile(medicalFile);

  return true;
});
