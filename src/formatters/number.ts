/**
 * Number Formatting Utilities
 *
 * Format numbers according to Brazilian conventions
 */

const LOCALE_PT_BR = 'pt-BR';

/**
 * Format number with thousand separators
 * @param value - Number to format
 * @param decimals - Optional number of decimal places
 */
export function formatNumber(value: number, decimals?: number): string {
  const options: Intl.NumberFormatOptions = {};

  if (decimals !== undefined) {
    options.minimumFractionDigits = decimals;
    options.maximumFractionDigits = decimals;
  }

  return new Intl.NumberFormat(LOCALE_PT_BR, options).format(value);
}

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
