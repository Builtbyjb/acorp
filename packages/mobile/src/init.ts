import { hideSplashScreen, setStatusBarStyle } from './app-lifecycle';
import { requestNotificationPermission } from './notifications';
import { isNativePlatform } from './platform';

export interface NativeAppInitOptions {
  statusBarStyle?: 'light' | 'dark';
  requestNotifications?: boolean;
}

/**
 * Common native app startup initialization.
 * Safe to call on web (no-ops outside native).
 */
export async function initNativeApp(
  options: NativeAppInitOptions = {},
): Promise<void> {
  if (!isNativePlatform()) return;

  const { statusBarStyle = 'dark', requestNotifications = true } = options;

  hideSplashScreen();
  setStatusBarStyle(statusBarStyle);

  if (requestNotifications) {
    await requestNotificationPermission();
  }
}
