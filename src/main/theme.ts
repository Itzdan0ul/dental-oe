import { nativeTheme } from 'electron';
import JsonAttributeHandler from './app/json/JsonAttributeHandler';

export const getPreferedColorScheme = (): string => {
  return nativeTheme.themeSource;
};

export const setPrefererColorScheme = (theme: 'system' | 'light' | 'dark'): void => {
  nativeTheme.themeSource = theme;
};

export const savePreferedColorScheme = (theme: 'system' | 'light' | 'dark'): void => {
  JsonAttributeHandler.setAttribute('theme', theme);
};
