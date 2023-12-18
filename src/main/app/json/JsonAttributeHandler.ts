import JsonHandler from './JsonHandler';

class JsonAttributeHandler {
  public static getAttribute(key: string, defaultValue?: any): string {
    const settings: {} = new JsonHandler().readJsonFile();

    return settings[key] || defaultValue;
  }

  public static setAttribute(key: string, value: string): void {
    const jsonHandler: JsonHandler = new JsonHandler();
    const schema = jsonHandler.readJsonFile();

    Object.assign(schema, { [key]: value });

    jsonHandler.writeInJsonFile(schema);
  }
}

export default JsonAttributeHandler;
