import { Share } from '@capacitor/share';
import { isNativePlatform } from './platform';

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: string[];
}

export async function share(options: ShareOptions): Promise<void> {
  if (isNativePlatform()) {
    await Share.share({
      title: options.title,
      text: options.text,
      url: options.url,
      files: options.files,
    });
    return;
  }

  if (navigator.share) {
    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url,
    });
    return;
  }

  if (options.url) {
    window.open(options.url, '_blank');
  }
}

export async function shareText(text: string, title?: string): Promise<void> {
  await share({ title, text });
}
