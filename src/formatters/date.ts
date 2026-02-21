/**
 * Date and Time Formatting for Brazilian Locale
 *
 * Format dates and times according to Brazilian conventions
 */

const LOCALE_PT_BR = 'pt-BR';

/**
 * Format date
 * @param date - Date string or Date object
 * @param format - Format style: 'short' (default), 'long', or 'full'
 */
export function formatDate(
  date: string | Date,
  format?: 'short' | 'long' | 'full'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };

  const options = formatOptions[format || 'short'];

  return new Intl.DateTimeFormat(LOCALE_PT_BR, options).format(dateObj);
}

/**
 * Format time
 * @param date - Date string or Date object
 */
export function formatTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(LOCALE_PT_BR, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Format date and time
 * @param date - Date string or Date object
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(LOCALE_PT_BR, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - Date string or Date object
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const units: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  let value = diffInSeconds;
  for (const [threshold, unit] of units) {
    if (Math.abs(value) < threshold) {
      const rtf = new Intl.RelativeTimeFormat(LOCALE_PT_BR, { numeric: 'auto' });
      return rtf.format(-Math.round(value), unit);
    }
    value /= threshold;
  }

  return formatDate(dateObj);
}
