import MainWindow from './window/MainWindow';
import { setPrefererColorScheme } from './theme';
import { SOURCE_FILE, DATABASE_FILE } from './constants';
import JsonAttributeHandler from './app/json/JsonAttributeHandler';
import path from 'path';
import DatabaseConnection from './app/database/DatabaseConnection';

class App {
  public constructor() {
    const theme = JsonAttributeHandler.getAttribute('theme') as 'light' | 'dark' | 'system';

    setPrefererColorScheme(theme);
  }

  public async init(): Promise<void> {
    const { existsSync, readFileSync, createFile } = await import('fs-extra');

    if (!existsSync(DATABASE_FILE)) {
      MainWindow.getInstance().loadURL(`${SOURCE_FILE}/setup`);

      createFile(DATABASE_FILE, async (error) => {
        if (error) {
          throw error;
        }

        const readQuery = readFileSync(path.join(__dirname, '..', '..', 'schema', 'dental-oe.sql'), 'utf-8');

        const connection: DatabaseConnection = new DatabaseConnection();

        connection.createDatabaseFile(readQuery);
      });
      return;
    }

    MainWindow.getInstance().loadURL(`${SOURCE_FILE}/login`);
  }
}

export default App;
