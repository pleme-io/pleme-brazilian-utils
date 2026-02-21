/**
 * CPF (Cadastro de Pessoas Físicas) Formatting and Validation
 *
 * Brazilian individual taxpayer registry identification
 * Format: ###.###.###-##
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
 * Format CPF (###.###.###-##)
 * Supports progressive formatting as user types
 */
export function formatCPF(cpf: string): string {
  if (!cpf) {
    return '';
  }
  const cleaned = cleanDigits(String(cpf));

  if (cleaned.length === 0) {
    return '';
  }

  // Progressive formatting based on length
  if (cleaned.length <= 3) {
    return cleaned;
  }
  if (cleaned.length <= 6) {
    return cleaned.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }
  if (cleaned.length <= 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }
  // Full formatting for 10-11 digits
  return cleaned.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

/**
 * Validate CPF using check digit algorithm
 */
export function validateCPF(cpf: string): boolean {
  const digits = cleanDigits(cpf);

  if (digits.length !== 11) {
    return false;
  }

  // Check if all digits are the same (invalid CPF pattern)
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]!, 10) * (10 - i);
  }

  let remainder = sum % 11;
  const checkDigit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(digits[9]!, 10) !== checkDigit1) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]!, 10) * (11 - i);
  }

  remainder = sum % 11;
  const checkDigit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(digits[10]!, 10) === checkDigit2;
}
