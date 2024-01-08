import './preload';

import path from 'path';
import http from 'http';
import fs from 'fs-extra';
import { pathToFileURL } from 'url';
import App from './main/App';
import { app, protocol, net } from 'electron';
import express, { Express } from 'express';
import JsonHandler from './main/app/json/JsonHandler';
import { APP_ICONS_DIR, FILES_DIR, SETTINGS_DIR } from './main/constants';

const initApp = (): void => {
  const app: Express = express();

  const server = http.createServer(app);

  app.use(express.static(path.join(__dirname, 'renderer', 'dist')));

  server.listen(3102);

  new App().init();

  protocol.handle('app', (request: Request): any => {
    return net.fetch('file://' + request.url.slice('app://'.length), { headers: request.headers, method: request.method });
  });
};

const ensureDirsExist = (): void => {
  if (!fs.existsSync(APP_ICONS_DIR) || !fs.existsSync(SETTINGS_DIR) || !fs.existsSync(FILES_DIR)) {
    fs.copySync(path.join(__dirname, '..', 'resources', 'icons'), APP_ICONS_DIR);

    fs.mkdirSync(SETTINGS_DIR);
    fs.mkdirSync(FILES_DIR);

    new JsonHandler();
  }
};

const setupEventListeners = (): void => {
  app.on('web-contents-created', (_, webContents: Electron.WebContents): void => {
    webContents.on('will-navigate', (event: Electron.Event): void => {
      event.preventDefault();
    });
  });
};

const startApp = (): void => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        secure: true,
        standard: true,
        supportFetchAPI: true,
      },
    },
  ]);

  app
    .whenReady()
    .then(initApp)
    .catch((error: unknown): void => {
      throw error;
    });
};

const initialize = async (): Promise<void> => {
  ensureDirsExist();
  setupEventListeners();
  startApp();
};

initialize();
