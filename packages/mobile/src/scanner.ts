import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';
import { isNativePlatform } from './platform';

export async function scanQr(): Promise<string | null> {
  if (!isNativePlatform()) {
    return null;
  }

  const { camera } = await BarcodeScanner.requestPermissions();
  if (camera !== 'granted') {
    throw new Error('Camera permission denied');
  }

  const { barcodes } = await BarcodeScanner.scan({
    formats: [BarcodeFormat.QrCode],
  });

  if (barcodes.length > 0) {
    return barcodes[0].displayValue || barcodes[0].rawValue || null;
  }
  return null;
}

export async function stopScanning(): Promise<void> {
  if (!isNativePlatform()) return;
  await BarcodeScanner.stopScan();
}
