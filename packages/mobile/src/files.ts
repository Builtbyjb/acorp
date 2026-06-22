import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { isNativePlatform } from './platform';
import { share } from './share';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export interface SaveFileResult {
  path: string;
  mimeType?: string;
}

export async function saveBlob(
  blob: Blob,
  fileName: string,
  mimeType?: string,
): Promise<SaveFileResult> {
  if (!isNativePlatform()) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return { path: url };
  }

  const base64 = await blobToBase64(blob);
  const contentType = mimeType || blob.type || 'application/octet-stream';

  const result = await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Cache,
    recursive: true,
  });

  return { path: result.uri, mimeType: contentType };
}

export async function openFile(path: string, mimeType?: string): Promise<void> {
  if (!isNativePlatform()) {
    // Web: try opening via window.open, otherwise the save dialog already handled it.
    window.open(path, '_blank');
    return;
  }
  await FileOpener.open({
    filePath: path,
    contentType: mimeType,
    openWithDefault: true,
  });
}

export async function saveAndOpenFile(
  blob: Blob,
  fileName: string,
  mimeType?: string,
): Promise<void> {
  const saved = await saveBlob(blob, fileName, mimeType);
  await openFile(saved.path, saved.mimeType);
}

export async function saveAndShareFile(
  blob: Blob,
  fileName: string,
  title?: string,
  mimeType?: string,
): Promise<void> {
  const saved = await saveBlob(blob, fileName, mimeType);
  if (isNativePlatform()) {
    await share({ title, files: [saved.path] });
  } else {
    await openFile(saved.path, saved.mimeType);
  }
}
