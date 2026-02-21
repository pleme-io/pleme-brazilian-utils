/**
 * Brazilian Phone Number Formatting and Validation
 *
 * Formats:
 * - Mobile: (##) 9####-#### (11 digits, 3rd digit must be 9)
 * - Landline: (##) ####-#### (10 digits, 3rd digit must be 2-5)
 *
 * Valid area codes (DDD): 11-99 (excluding 10, 20, 30, etc.)
 * The first digit of the area code must be 1-9, second can be 1-9
 */

/**
 * Valid Brazilian area codes (DDD)
 * All two-digit codes from 11-99 where neither digit is 0
 */
const VALID_AREA_CODES = new Set([
  // São Paulo
  '11', '12', '13', '14', '15', '16', '17', '18', '19',
  // Rio de Janeiro / Espírito Santo
  '21', '22', '24', '27', '28',
  // Minas Gerais
  '31', '32', '33', '34', '35', '37', '38',
  // Paraná / Santa Catarina
  '41', '42', '43', '44', '45', '46', '47', '48', '49',
  // Rio Grande do Sul
  '51', '53', '54', '55',
  // Distrito Federal / Goiás / Tocantins / Mato Grosso / Mato Grosso do Sul
  '61', '62', '63', '64', '65', '66', '67', '68', '69',
  // Bahia / Sergipe
  '71', '73', '74', '75', '77', '79',
  // Pernambuco / Alagoas / Paraíba / Rio Grande do Norte
  '81', '82', '83', '84', '85', '86', '87', '88', '89',
  // Pará / Amazonas / Roraima / Amapá / Acre / Rondônia / Maranhão / Piauí / Ceará
  '91', '92', '93', '94', '95', '96', '97', '98', '99',
]);

/**
 * Remove all non-digit characters from a string
 */
export function cleanPhoneDigits(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.replace(/\D/g, '');
}

/**
 * Format Brazilian phone number
 * Supports both mobile (11 digits) and landline (10 digits)
 */
export function formatPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  const cleaned = cleanPhoneDigits(phone);

  if (cleaned.length === 11) {
    // Mobile: (##) 9####-####
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    // Landline: (##) ####-####
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  return phone;
}

/**
 * Apply phone mask as user types (progressive formatting)
 * Returns formatted string suitable for real-time input masking
 */
export function phoneMask(value: string): string {
  const cleaned = cleanPhoneDigits(value);

  if (cleaned.length === 0) {
    return '';
  }
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  if (cleaned.length <= 10) {
    // Landline format during typing
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  // Mobile format (11 digits)
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}

/**
 * Validate Brazilian phone number (lenient)
 * Only checks digit count: 10 (landline) or 11 (mobile) digits
 *
 * @param phone - Phone number string (with or without formatting)
 * @returns true if valid length
 */
export function validatePhone(phone: string): boolean {
  const digits = cleanPhoneDigits(phone);
  return digits.length === 10 || digits.length === 11;
}

/**
 * Validate Brazilian phone number (strict)
 * Checks:
 * - Valid area code (DDD): Must be a valid Brazilian area code
 * - Mobile: 11 digits, 3rd digit must be 9
 * - Landline: 10 digits, 3rd digit must be 2-5
 *
 * @param phone - Phone number string (with or without formatting)
 * @returns true if valid Brazilian phone number
 */
export function validatePhoneStrict(phone: string): boolean {
  const digits = cleanPhoneDigits(phone);

  // Check length
  if (digits.length !== 10 && digits.length !== 11) {
    return false;
  }

  // Check area code
  const areaCode = digits.slice(0, 2);
  if (!VALID_AREA_CODES.has(areaCode)) {
    return false;
  }

  // Check phone format based on length
  if (digits.length === 11) {
    // Mobile: 3rd digit must be 9
    const thirdDigit = digits.charAt(2);
    if (thirdDigit !== '9') {
      return false;
    }
  } else {
    // Landline: 3rd digit must be 2-5
    const thirdDigit = parseInt(digits.charAt(2), 10);
    if (thirdDigit < 2 || thirdDigit > 5) {
      return false;
    }
  }

  return true;
}

/**
 * Get validation error message for Brazilian phone number
 * Returns specific error message or null if valid
 *
 * @param phone - Phone number string (with or without formatting)
 * @returns Error message or null if valid
 */
export function getPhoneValidationError(phone: string): string | null {
  const digits = cleanPhoneDigits(phone);

  if (!digits || digits.length === 0) {
    return 'Telefone é obrigatório';
  }

  if (digits.length < 10) {
    return 'Telefone deve ter pelo menos 10 dígitos';
  }

  if (digits.length > 11) {
    return 'Telefone deve ter no máximo 11 dígitos';
  }

  // Check area code
  const areaCode = digits.slice(0, 2);
  if (!VALID_AREA_CODES.has(areaCode)) {
    return 'DDD inválido';
  }

  // Check phone format based on length
  if (digits.length === 11) {
    const thirdDigit = digits.charAt(2);
    if (thirdDigit !== '9') {
      return 'Celular deve começar com 9';
    }
  } else {
    const thirdDigit = parseInt(digits.charAt(2), 10);
    if (thirdDigit < 2 || thirdDigit > 5) {
      return 'Telefone fixo inválido';
    }
  }

  return null;
}

/**
 * Check if area code (DDD) is valid
 *
 * @param areaCode - Two-digit area code
 * @returns true if valid Brazilian area code
 */
export function isValidAreaCode(areaCode: string): boolean {
  return VALID_AREA_CODES.has(areaCode);
}

/**
 * Extract area code from phone number
 *
 * @param phone - Phone number string
 * @returns Area code or empty string if invalid
 */
export function extractAreaCode(phone: string): string {
  const digits = cleanPhoneDigits(phone);
  if (digits.length >= 2) {
    return digits.slice(0, 2);
  }
  return '';
}
