import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isNativePlatform } from './platform';

export function hideSplashScreen(): void {
  if (!isNativePlatform()) return;
  SplashScreen.hide().catch(() => {
    // ignore
  });
}

export function setStatusBarStyle(style: 'light' | 'dark'): void {
  if (!isNativePlatform()) return;
  StatusBar.setStyle({ style: style === 'dark' ? Style.Dark : Style.Light }).catch(
    () => {
      // ignore
    },
  );
}

export function onNativeBackButton(
  callback: (event: { canGoBack: boolean }) => boolean | void,
): () => void {
  if (!isNativePlatform()) {
    return () => {
      // no-op on web
    };
  }

  const listener = App.addListener('backButton', ({ canGoBack }) => {
    const handled = callback({ canGoBack });
    if (!handled && !canGoBack) {
      // Allow OS default only when nothing to go back to.
      return;
    }
    // If handled or there is history, prevent default app exit.
  });
  return () => {
    listener.then((l) => l.remove());
  };
}

export function onAppStateChange(
  callback: (state: { isActive: boolean }) => void,
): () => void {
  if (!isNativePlatform()) {
    const handler = () => callback({ isActive: document.visibilityState === 'visible' });
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }

  const listener = App.addListener('appStateChange', callback);
  return () => {
    listener.then((l) => l.remove());
  };
}
