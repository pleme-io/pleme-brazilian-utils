/**
 * Credit Card Number Formatting
 *
 * Format credit card numbers with spaces
 */

/**
 * Remove all non-digit characters from a string
 */
function cleanDigits(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.replace(/\D/g, '');
}

/**
 * Format credit card number (#### #### #### ####)
 */
export function formatCardNumber(number: string): string {
  if (!number || typeof number !== 'string') {
    return '';
  }
  const cleaned = cleanDigits(number);
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}
