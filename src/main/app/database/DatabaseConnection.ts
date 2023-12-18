import { DATABASE_FILE } from '../../constants';
import sqlite, { Database } from 'better-sqlite3';

class DatabaseConnection {
  private readonly connection: Database;

  constructor() {
    this.connection = sqlite(DATABASE_FILE);
  }

  public createDatabaseFile(filePath: string): void {
    this.connection.exec(filePath);
  }

  public executeNonQuery(query: string, params?: Object): void {
    try {
      if (params) {
        this.connection.prepare(query).run(params);
      } else {
        this.connection.prepare(query).run();
      }
    } catch (error: unknown) {
      throw error;
    }
  }

  public executeQuery(query: string, params?: Object): any[] {
    try {
      if (params) {
        return this.connection.prepare(query).all(params);
      } else {
        return this.connection.prepare(query).all();
      }
    } catch (error: unknown) {
      throw error;
    }
  }

  public close(): void {
    this.connection.close();
  }
}

export default DatabaseConnection;
