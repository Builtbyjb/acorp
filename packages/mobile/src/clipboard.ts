import { Clipboard } from '@capacitor/clipboard';
import { isNativePlatform } from './platform';

export async function copyToClipboard(text: string): Promise<void> {
  if (isNativePlatform()) {
    await Clipboard.write({ string: text });
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for older/non-secure browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
