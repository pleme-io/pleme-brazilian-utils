/**
 * Brazilian Payment Constants
 *
 * Comprehensive configuration for Brazilian payment methods including
 * installments (parcelamento), PIX, boleto, and credit card processing
 */

import type { BRLCents } from '../types/currency'

/**
 * Installment (Parcelamento) Configuration
 *
 * Brazilian e-commerce installment rules and interest rates
 */
export const PARCELAMENTO: {
  readonly MAX_INSTALLMENTS: {
    readonly CREDIT_CARD: 12
    readonly BOLETO: 1
    readonly PIX: 1
    readonly DEBIT_CARD: 1
  }
  readonly MIN_INSTALLMENT_VALUE: BRLCents
  readonly INTEREST_FREE_INSTALLMENTS: 3
  readonly INTEREST_RATES: {
    readonly 4: 0.0299
    readonly 5: 0.0299
    readonly 6: 0.0299
    readonly 7: 0.0299
    readonly 8: 0.0299
    readonly 9: 0.0299
    readonly 10: 0.0299
    readonly 11: 0.0299
    readonly 12: 0.0299
  }
  readonly SPECIAL_CONDITIONS: {
    readonly MIN_INTEREST_FREE: BRLCents
    readonly PREMIUM_CARD_BONUS: 3
    readonly ELO_TIER_BONUS: {
      readonly bronze: 0
      readonly silver: 1
      readonly gold: 2
      readonly platinum: 3
    }
  }
} = {
  // Maximum installments by payment method
  MAX_INSTALLMENTS: {
    CREDIT_CARD: 12,
    BOLETO: 1,
    PIX: 1,
    DEBIT_CARD: 1,
  },

  // Minimum installment value (R$ 50.00)
  MIN_INSTALLMENT_VALUE: 5000 as BRLCents,

  // Interest-free installments
  INTEREST_FREE_INSTALLMENTS: 3,

  // Interest rates per month (after interest-free period)
  INTEREST_RATES: {
    4: 0.0299, // 2.99%
    5: 0.0299,
    6: 0.0299,
    7: 0.0299,
    8: 0.0299,
    9: 0.0299,
    10: 0.0299,
    11: 0.0299,
    12: 0.0299,
  } as const,

  // Special conditions
  SPECIAL_CONDITIONS: {
    // Minimum purchase for interest-free
    MIN_INTEREST_FREE: 10000 as BRLCents, // R$ 100.00

    // Premium card additional interest-free installments
    PREMIUM_CARD_BONUS: 3,

    // ELO tier bonus installments
    ELO_TIER_BONUS: {
      bronze: 0,
      silver: 1,
      gold: 2,
      platinum: 3,
    } as const,
  },
} as const

/**
 * Payment Method Configuration
 *
 * Brazilian payment methods with their characteristics
 */
export const PAYMENT_METHODS: {
  readonly CREDIT_CARD: {
    readonly id: 'credit_card'
    readonly name: 'Cartão de Crédito'
    readonly icon: 'credit-card'
    readonly allowsInstallments: true
    readonly processingTime: 'Imediato'
    readonly fees: 0
  }
  readonly DEBIT_CARD: {
    readonly id: 'debit_card'
    readonly name: 'Cartão de Débito'
    readonly icon: 'credit-card'
    readonly allowsInstallments: false
    readonly processingTime: 'Imediato'
    readonly fees: 0
  }
  readonly PIX: {
    readonly id: 'pix'
    readonly name: 'PIX'
    readonly icon: 'pix'
    readonly allowsInstallments: false
    readonly processingTime: 'Imediato'
    readonly fees: 0
    readonly discount: 0.05
  }
  readonly BOLETO: {
    readonly id: 'boleto'
    readonly name: 'Boleto Bancário'
    readonly icon: 'barcode'
    readonly allowsInstallments: false
    readonly processingTime: '1-3 dias úteis'
    readonly fees: 0
    readonly discount: 0.03
  }
} = {
  CREDIT_CARD: {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: 'credit-card',
    allowsInstallments: true,
    processingTime: 'Imediato',
    fees: 0,
  },
  DEBIT_CARD: {
    id: 'debit_card',
    name: 'Cartão de Débito',
    icon: 'credit-card',
    allowsInstallments: false,
    processingTime: 'Imediato',
    fees: 0,
  },
  PIX: {
    id: 'pix',
    name: 'PIX',
    icon: 'pix',
    allowsInstallments: false,
    processingTime: 'Imediato',
    fees: 0,
    discount: 0.05, // 5% discount
  },
  BOLETO: {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: 'barcode',
    allowsInstallments: false,
    processingTime: '1-3 dias úteis',
    fees: 0,
    discount: 0.03, // 3% discount
  },
} as const

/**
 * Brazilian Card Brands
 *
 * Card brand detection and CVV configuration
 */
export const CARD_BRANDS: {
  readonly VISA: {
    readonly id: 'visa'
    readonly name: 'Visa'
    readonly regex: RegExp
    readonly cvvLength: 3
  }
  readonly MASTERCARD: {
    readonly id: 'mastercard'
    readonly name: 'Mastercard'
    readonly regex: RegExp
    readonly cvvLength: 3
  }
  readonly AMEX: {
    readonly id: 'amex'
    readonly name: 'American Express'
    readonly regex: RegExp
    readonly cvvLength: 4
  }
  readonly ELO: {
    readonly id: 'elo'
    readonly name: 'Elo'
    readonly regex: RegExp
    readonly cvvLength: 3
  }
  readonly HIPERCARD: {
    readonly id: 'hipercard'
    readonly name: 'Hipercard'
    readonly regex: RegExp
    readonly cvvLength: 3
  }
  readonly DINERS: {
    readonly id: 'diners'
    readonly name: 'Diners Club'
    readonly regex: RegExp
    readonly cvvLength: 3
  }
} = {
  VISA: {
    id: 'visa',
    name: 'Visa',
    regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
    cvvLength: 3,
  },
  MASTERCARD: {
    id: 'mastercard',
    name: 'Mastercard',
    regex: /^5[1-5][0-9]{14}$/,
    cvvLength: 3,
  },
  AMEX: {
    id: 'amex',
    name: 'American Express',
    regex: /^3[47][0-9]{13}$/,
    cvvLength: 4,
  },
  ELO: {
    id: 'elo',
    name: 'Elo',
    regex:
      /^(4011|4312|4389|4514|4576|5041|5066|5067|6277|6362|6363|6504|6505|6506|6507|6509|6516|6550)/,
    cvvLength: 3,
  },
  HIPERCARD: {
    id: 'hipercard',
    name: 'Hipercard',
    regex: /^(606282|384100|384140|384160)/,
    cvvLength: 3,
  },
  DINERS: {
    id: 'diners',
    name: 'Diners Club',
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    cvvLength: 3,
  },
} as const

/**
 * Installment Display Templates
 *
 * Templates for displaying installment information to users
 */
export const INSTALLMENT_TEMPLATES: {
  readonly FULL: '{installments}x de {amount} {interest}'
  readonly SHORT: '{installments}x {amount}'
  readonly SINGLE: 'À vista {amount}'
  readonly WITH_TOTAL: '{installments}x de {amount} (Total: {total})'
} = {
  FULL: '{installments}x de {amount} {interest}',
  SHORT: '{installments}x {amount}',
  SINGLE: 'À vista {amount}',
  WITH_TOTAL: '{installments}x de {amount} (Total: {total})',
} as const

/**
 * Interest Labels
 *
 * User-facing labels for interest information
 */
export const INTEREST_LABELS: {
  readonly FREE: 'sem juros'
  readonly WITH: 'com juros'
} = {
  FREE: 'sem juros',
  WITH: 'com juros',
} as const

/**
 * Installment Calculation Methods
 */
export const CALCULATION_METHODS: {
  readonly PRICE_TABLE: 'price_table'
  readonly SIMPLE_INTEREST: 'simple_interest'
  readonly COMPOUND_INTEREST: 'compound_interest'
} = {
  PRICE_TABLE: 'price_table', // Pre-calculated by payment gateway
  SIMPLE_INTEREST: 'simple_interest',
  COMPOUND_INTEREST: 'compound_interest',
} as const

/**
 * PIX Configuration
 *
 * Brazilian instant payment system configuration
 */
export const PIX_CONFIG: {
  readonly QR_CODE_EXPIRY: 3600
  readonly COPY_PASTE_EXPIRY: 3600
  readonly DISCOUNT_PERCENTAGE: 0.05
  readonly MIN_VALUE: BRLCents
  readonly MAX_VALUE: BRLCents
} = {
  QR_CODE_EXPIRY: 3600, // 1 hour in seconds
  COPY_PASTE_EXPIRY: 3600,
  DISCOUNT_PERCENTAGE: 0.05, // 5%
  MIN_VALUE: 100 as BRLCents, // R$ 1.00
  MAX_VALUE: 1000000000 as BRLCents, // R$ 10,000,000.00
} as const

/**
 * Boleto Configuration
 *
 * Brazilian bank slip payment configuration
 */
export const BOLETO_CONFIG: {
  readonly EXPIRY_DAYS: 3
  readonly DISCOUNT_PERCENTAGE: 0.03
  readonly MIN_VALUE: BRLCents
  readonly MAX_VALUE: BRLCents
  readonly BANK_SLIP_FEE: BRLCents
} = {
  EXPIRY_DAYS: 3,
  DISCOUNT_PERCENTAGE: 0.03, // 3%
  MIN_VALUE: 500 as BRLCents, // R$ 5.00
  MAX_VALUE: 500000000 as BRLCents, // R$ 5,000,000.00
  BANK_SLIP_FEE: 299 as BRLCents, // R$ 2.99
} as const

/**
 * Unified Parcelamento Configuration
 *
 * Backward compatibility configuration for legacy code
 */
export const PARCELAMENTO_CONFIG: {
  readonly minInstallmentAmount: BRLCents
  readonly maxInstallments: 12
  readonly interestRates: typeof PARCELAMENTO.INTEREST_RATES
  readonly interestFreeInstallments: 3
} = {
  minInstallmentAmount: PARCELAMENTO.MIN_INSTALLMENT_VALUE,
  maxInstallments: PARCELAMENTO.MAX_INSTALLMENTS.CREDIT_CARD,
  interestRates: PARCELAMENTO.INTEREST_RATES,
  interestFreeInstallments: PARCELAMENTO.INTEREST_FREE_INSTALLMENTS,
} as const
