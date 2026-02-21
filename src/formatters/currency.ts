/**
 * Brazilian Currency Formatting
 *
 * Format currency values in Brazilian Real (BRL)
 */

const LOCALE_PT_BR = 'pt-BR';
const CURRENCY_BRL = 'BRL';

/**
 * Format currency in Brazilian Real
 * @param cents - Amount in cents (e.g., 1000 = R$ 10,00)
 */
export function formatCurrency(cents: number): string {
  const amount = Number(cents) / 100;
  return new Intl.NumberFormat(LOCALE_PT_BR, {
    style: 'currency',
    currency: CURRENCY_BRL,
  }).format(amount);
}

/**
 * Format currency without symbol
 * @param cents - Amount in cents (e.g., 1000 = 10,00)
 */
export function formatCurrencyNoSymbol(cents: number): string {
  const amount = Number(cents) / 100;
  return new Intl.NumberFormat(LOCALE_PT_BR, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 * @param value - Decimal value (e.g., 0.15 = 15%)
 * @param decimals - Number of decimal places (default: 0)
 */
export function formatPercentage(value: number, decimals = 0): string {
  return new Intl.NumberFormat(LOCALE_PT_BR, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Parse a Brazilian currency string to number (in cents)
 * @param value - Currency string (e.g., "R$ 100,00" or "100,00")
 * @returns Value in cents
 * @example
 * parseCurrency("R$ 100,00") // 10000
 * parseCurrency("1.234,56") // 123456
 */
export function parseCurrency(value: string): number {
  // Remove currency symbol (R$), spaces, and thousand separators
  const cleanValue = value
    .replace(/R\$\s?/g, '') // Remove R$ symbol
    .replace(/\./g, '') // Remove thousand separators (dots)
    .replace(/,/g, '.') // Replace decimal comma with dot

  const reais = parseFloat(cleanValue);
  return Math.round(reais * 100); // Convert to cents
}

/**
 * Format installment information (Brazilian e-commerce pattern)
 * @param totalCents - Total value in cents
 * @param installments - Number of installments
 * @param interestRate - Monthly interest rate (e.g., 0.0199 for 1.99%, default: 0)
 * @returns Formatted installment string
 * @example
 * formatInstallments(10000, 3) // "3x de R$ 33,34 sem juros"
 * formatInstallments(10000, 12, 0.0199) // "12x de R$ 94,56 com juros"
 */
export function formatInstallments(
  totalCents: number,
  installments: number,
  interestRate = 0
): string {
  if (installments <= 1) {
    return formatCurrency(totalCents);
  }

  let installmentValue: number;

  if (interestRate === 0) {
    // No interest
    installmentValue = totalCents / installments;
  } else {
    // With interest (compound)
    const total = totalCents * (1 + interestRate) ** installments;
    installmentValue = total / installments;
  }

  const formatted = formatCurrency(Math.ceil(installmentValue));
  const interestText = interestRate === 0 ? 'sem juros' : 'com juros';

  return `${installments}x de ${formatted} ${interestText}`;
}

/**
 * Calculate discount percentage between two prices
 * @param originalPrice - Original price in cents
 * @param discountedPrice - Discounted price in cents
 * @returns Discount percentage as integer (e.g., 25 for 25% off)
 * @example
 * calculateDiscountPercentage(10000, 7500) // 25
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice <= 0) {
    return 0;
  }
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
}
