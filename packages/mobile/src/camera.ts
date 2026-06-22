import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isNativePlatform } from './platform';

export interface PickedImage {
  dataUrl?: string;
  webPath?: string;
  path?: string;
  format: string;
}

export async function pickImage(): Promise<PickedImage | null> {
  if (!isNativePlatform()) {
    return null;
  }

  const photo = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    quality: 90,
  });

  return {
    dataUrl: photo.dataUrl,
    webPath: photo.webPath,
    path: photo.path,
    format: photo.format,
  };
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const byteString = atob(dataUrl.split(',')[1]);
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
