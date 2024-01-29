import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const allowedChannels: Array<string> = [
  'appointment:fetch',
  'appointment:create',
  'appointment:update',
  'appointment:delete',
  'get-help',
  'expedient:fetch',
  'expedient:create',
  'expedient:update',
  'expedient:delete',
  'login',
  'logout',
  'medicalFile:fetch',
  'medicalFile:create',
  'patient:fetch',
  'patient:create',
  'patient:update',
  'patient:delete',
  'setup:create',
  'treatment:fetch',
  'treatment:create',
  'treatment:update',
  'treatment:delete',
  'user:fetch'
];

const electronAPI = {
  invoke: async (channel: string, ...args: any): Promise<any> => {
    if (!allowedChannels.includes(channel)) {
      throw new Error(`Channel ${channel} is not allowed`);
    }

    return ipcRenderer.invoke(channel, ...args);
  },
  send: (channel: string, ...args: any): void => {
    if (!allowedChannels.includes(channel)) {
      throw new Error(`Channel ${channel} is not allowed`);
    }

    ipcRenderer.send(channel, ...args);
  },
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any) => void): void => {
    if (!allowedChannels.includes(channel)) {
      throw new Error(`Channel ${channel} is not allowed`);
    }

    ipcRenderer.on(channel, listener);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
