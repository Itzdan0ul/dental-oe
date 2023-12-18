import './preload';

import path from 'path';
import http from 'http';
import fs from 'fs-extra';
import App from './main/App';
import { app } from 'electron';
import { config } from 'dotenv';
import express, { Express } from 'express';
import JsonHandler from './main/app/json/JsonHandler';
import { APP_ICONS_DIR, SETTINGS_DIR } from './main/constants';

const initApp = (): void => {
  const app: Express = express();

  const server = http.createServer(app);

  app.use(express.static(path.join(__dirname, 'renderer', 'dist')));

  server.listen(3102);

  new App().init();
};

const ensureDirsExist = (): void => {
  if (!fs.existsSync(APP_ICONS_DIR) || !fs.existsSync(SETTINGS_DIR)) {
    fs.copySync(path.join(__dirname, '..', 'resources', 'icons'), APP_ICONS_DIR);

    fs.mkdirSync(SETTINGS_DIR);

    new JsonHandler();
  }
};

// const setupEnv = async (): Promise<void> => {
//   let envPath: string | undefined = process.env.NODE_ENV;

//   if (envPath === 'development') {
//     envPath = path.join(__dirname, '..', '.env.development');
//   } else if (envPath === 'local') {
//     envPath = path.join(__dirname, '..', '.env.local');
//   } else {
//     envPath = path.join(__dirname, '..', '.env');
//   }

//   config({ path: envPath });
// };

const setupEventListeners = (): void => {
  app.on('web-contents-created', (_, webContents: Electron.WebContents): void => {
    webContents.on('will-navigate', (event: Electron.Event): void => {
      event.preventDefault();
    });
  });
};

const startApp = (): void => {
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
