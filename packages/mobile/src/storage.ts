import { Preferences } from '@capacitor/preferences';
import { isNativePlatform } from './platform';

export async function getItem(key: string): Promise<string | null> {
  if (isNativePlatform()) {
    const { value } = await Preferences.get({ key });
    return value ?? null;
  }
  return localStorage.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  if (isNativePlatform()) {
    await Preferences.set({ key, value });
  } else {
    localStorage.setItem(key, value);
  }
}

export async function removeItem(key: string): Promise<void> {
  if (isNativePlatform()) {
    await Preferences.remove({ key });
  } else {
    localStorage.removeItem(key);
  }
}

/**
 * Zustand-compatible async storage backend.
 * Falls back to localStorage on web and Preferences on native.
 */
export const zustandStorage = {
  getItem: async (name: string): Promise<string | null> => getItem(name),
  setItem: async (name: string, value: string): Promise<void> => setItem(name, value),
  removeItem: async (name: string): Promise<void> => removeItem(name),
};
