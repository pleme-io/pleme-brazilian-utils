/**
 * Payment Card Validation
 *
 * Generic card validation functions (not Brazil-specific)
 * Includes Luhn algorithm for card numbers, expiry date validation, CVV validation
 */

/**
 * Remove all non-digit characters
 */
function cleanDigits(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.replace(/\D/g, '');
}

/**
 * Validate credit card number using Luhn algorithm
 * @param number - Card number (with or without formatting)
 * @returns true if valid card number
 * @example
 * validateCardNumber("4532015112830366") // true (Visa test card)
 * validateCardNumber("1234567890123456") // false (fails Luhn check)
 */
export function validateCardNumber(number: string): boolean {
  const cleaned = cleanDigits(number);

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Luhn algorithm: iterate from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!, 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate card expiry date (month/year)
 * @param month - Expiry month (1-12 or "01"-"12")
 * @param year - Expiry year (2-digit or 4-digit)
 * @returns true if card has not expired
 * @example
 * validateCardExpiry("12", "25") // true (if current date is before Dec 2025)
 * validateCardExpiry("01", "2020") // false (expired)
 */
export function validateCardExpiry(month: string, year: string): boolean {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0-indexed

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  // Validate month range
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }

  // Convert 2-digit year to 4-digit (e.g., 25 → 2025)
  const fullYear = expYear < 100 ? 2000 + expYear : expYear;

  // Check if expired
  if (fullYear < currentYear) {
    return false;
  }
  if (fullYear === currentYear && expMonth < currentMonth) {
    return false;
  }

  return true;
}

/**
 * Validate CVV (Card Verification Value)
 * @param cvv - CVV code
 * @param cardBrand - Optional card brand ("amex" requires 4 digits, others require 3)
 * @returns true if valid CVV length
 * @example
 * validateCVV("123") // true
 * validateCVV("1234", "amex") // true
 * validateCVV("123", "amex") // false (AmEx requires 4 digits)
 */
export function validateCVV(cvv: string, cardBrand?: string): boolean {
  const cleaned = cleanDigits(cvv);

  if (cardBrand?.toLowerCase() === 'amex') {
    return cleaned.length === 4;
  }

  return cleaned.length === 3;
}
