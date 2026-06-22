import { LocalNotifications } from '@capacitor/local-notifications';
import { isNativePlatform } from './platform';

export interface LocalNotification {
  id: number;
  title: string;
  body: string;
  scheduleAt: Date;
}

export async function scheduleNotification(
  notification: LocalNotification,
): Promise<void> {
  if (!isNativePlatform()) return;

  await LocalNotifications.schedule({
    notifications: [
      {
        id: notification.id,
        title: notification.title,
        body: notification.body,
        schedule: { at: notification.scheduleAt },
      },
    ],
  });
}

export async function cancelNotification(id: number): Promise<void> {
  if (!isNativePlatform()) return;
  await LocalNotifications.cancel({ notifications: [{ id }] });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNativePlatform()) return true;
  const result = await LocalNotifications.requestPermissions();
  return result.display === 'granted';
}
