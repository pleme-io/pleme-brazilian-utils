/**
 * @pleme/brazilian-utils
 *
 * Brazilian utilities for formatting and validation
 * Zero dependencies library
 */

// CPF formatting and validation
export { formatCPF, validateCPF } from './formatters/cpf';

// CEP formatting and validation
export {
  formatCEP,
  cleanCEP,
  isValidCEP,
  fetchAddressByCEP,
  type ViaCEPResponse,
  type AddressFromCEP,
} from './formatters/cep';

// Phone formatting and validation
export {
  formatPhone,
  validatePhone,
  validatePhoneStrict,
  phoneMask,
  cleanPhoneDigits,
  getPhoneValidationError,
  isValidAreaCode,
  extractAreaCode,
} from './formatters/phone';

// Currency formatting
export {
  formatCurrency,
  formatCurrencyNoSymbol,
  formatPercentage,
  parseCurrency,
  formatInstallments,
  calculateDiscountPercentage,
} from './formatters/currency';

// Date and time formatting
export {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
} from './formatters/date';

// Card number formatting
export { formatCardNumber } from './formatters/card';

// Text formatting
export { capitalize, titleCase, truncate, slugify } from './formatters/text';

// Number formatting
export { formatNumber, formatFileSize } from './formatters/number';

// State code validation
export {
  validateStateCode,
  normalizeStateCode,
  BRAZILIAN_STATES,
  type BrazilianState,
} from './validators/state';

// Card validation (generic, but useful)
export {
  validateCardNumber,
  validateCardExpiry,
  validateCVV,
} from './validators/card';

// Currency types
export {
  type BRLCents,
  isBRLCents,
  createBRLCents,
  reaisToCents,
  centsToReais,
} from './types/currency';

// Payment constants
export {
  PARCELAMENTO,
  PAYMENT_METHODS,
  CARD_BRANDS,
  INSTALLMENT_TEMPLATES,
  INTEREST_LABELS,
  CALCULATION_METHODS,
  PIX_CONFIG,
  BOLETO_CONFIG,
  PARCELAMENTO_CONFIG,
} from './constants/payment';

// City constants and utilities
export {
  BRAZILIAN_CITIES,
  CITY_MAP,
  getCityLabel,
  formatCityOption,
  findCity,
  isValidCity,
  getCitiesByState,
  getUniqueStates,
  type City,
  type CityValue,
  // Neighborhood utilities
  type Neighborhood,
  getNeighborhoodsByCity,
  isValidNeighborhood,
  findNeighborhood,
  getNeighborhoodLabel,
  formatNeighborhoodOption,
} from './constants/cities';
