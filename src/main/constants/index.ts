import path from 'path';
import { app } from 'electron';

export const SOURCE_FILE = 'http://127.0.0.1:3102/#';
export const DATABASE_FILE = path.join(app.getPath('appData'), 'dental-oe', 'dental-oe.db');
export const TEMPS_FILES_DIR = path.join(app.getPath('temp'));
export const PRELOAD_FILE = path.join(__dirname, '..', 'preload.js');
export const APP_ICONS_DIR = path.join(app.getPath('appData'), 'dental-oe', 'icons');
export const SETTINGS_DIR = path.join(app.getPath('appData'), 'dental-oe', 'settings');
export const FILES_DIR = path.join(app.getPath('appData'), 'dental-oe', 'files');
