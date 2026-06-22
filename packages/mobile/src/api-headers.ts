import { getRefreshToken } from './secure-storage';
import { isNativePlatform } from './platform';

export function getMobileHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};

  if (isNativePlatform()) {
    headers['X-Mobile-Client'] = 'true';
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      headers['Authorization'] = `Bearer ${refreshToken}`;
    }
  }

  return headers;
}

export function mergeMobileHeaders(
  existing?: Record<string, string>,
): Record<string, string> {
  return { ...existing, ...getMobileHeaders() };
}
