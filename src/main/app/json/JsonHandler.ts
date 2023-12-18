import path from 'path';
import fs from 'fs-extra';
import { SETTINGS_DIR } from '../../constants';

class JsonHandler {
  private readonly settingsFile: string = path.join(SETTINGS_DIR, 'settings.json');

  public constructor() {
    if (!fs.existsSync(this.settingsFile)) {
      fs.createFileSync(this.settingsFile);
      const scheme = {
        theme: 'light',
      };

      this.writeInJsonFile(scheme);
    }
  }

  public readJsonFile(): {} {
    return fs.readJSONSync(this.settingsFile);
  }

  public writeInJsonFile(settingsScheme: {}): void {
    fs.writeJSONSync(this.settingsFile, settingsScheme, { spaces: 2 });
  }
}

export default JsonHandler;
