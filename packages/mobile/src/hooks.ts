import { useEffect } from 'react';
import { onNativeBackButton } from './app-lifecycle';

/**
 * Registers the Android hardware back button on native platforms.
 * On web this is a no-op. The callback receives { canGoBack } and should
 * return true if it handled the event (preventing default exit behavior).
 */
export function useNativeBackButton(
  callback: (info: { canGoBack: boolean }) => boolean | void,
): void {
  useEffect(() => {
    return onNativeBackButton(callback);
  }, [callback]);
}
