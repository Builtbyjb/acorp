import { SecureStorage } from '@aparajita/capacitor-secure-storage';
import { isNativePlatform } from './platform';

const REFRESH_TOKEN_KEY = 'refresh_token';

let inMemoryRefreshToken: string | null = null;
let refreshTokenLoaded = false;
let refreshTokenLoadPromise: Promise<void> | null = null;

export async function loadRefreshToken(): Promise<void> {
  if (!isNativePlatform()) {
    inMemoryRefreshToken = null;
    refreshTokenLoaded = true;
    return;
  }

  if (refreshTokenLoaded) return;
  if (refreshTokenLoadPromise) return refreshTokenLoadPromise;

  refreshTokenLoadPromise = (async () => {
    try {
      inMemoryRefreshToken = await SecureStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      inMemoryRefreshToken = null;
    } finally {
      refreshTokenLoaded = true;
    }
  })();

  return refreshTokenLoadPromise;
}

export function getRefreshToken(): string | null {
  return inMemoryRefreshToken;
}

export async function setRefreshToken(token: string | null): Promise<void> {
  inMemoryRefreshToken = token;
  if (!isNativePlatform()) return;
  if (token === null) {
    try {
      await SecureStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch {
      // ignore
    }
  } else {
    await SecureStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
}

export async function clearRefreshToken(): Promise<void> {
  inMemoryRefreshToken = null;
  if (!isNativePlatform()) return;
  try {
    await SecureStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // ignore
  }
}
