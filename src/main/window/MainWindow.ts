import { PRELOAD_FILE } from '../constants';
import { BrowserWindow, screen } from 'electron';

class MainWindow extends BrowserWindow {
  private static instance: MainWindow | null;

  constructor() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    super({
      width,
      height,
      show: false,
      webPreferences: {
        devTools: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local',
        sandbox: true,
        spellcheck: false,
        enableWebSQL: false,
        preload: PRELOAD_FILE,
        contextIsolation: true,
        webSecurity: true,
      },
    });

    this.webContents.openDevTools({ mode: 'undocked' });

    this.maximize();
    this.removeMenu();

    this.handleWindowEvents();
  }

  public static getInstance(): MainWindow {
    if (!MainWindow.instance) {
      MainWindow.instance = new MainWindow();
    }

    return MainWindow.instance;
  }

  private handleWindowEvents(): void {
    this.once('ready-to-show', (): void => {
      this.show();
    });
  }
}

export default MainWindow;
