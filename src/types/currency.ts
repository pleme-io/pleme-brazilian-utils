/**
 * Brazilian Currency Types
 *
 * Branded types for Brazilian Real (BRL) currency handling
 */

// Brand utility type
type Brand<K, T> = K & { readonly _brand: T }

/**
 * BRLCents - Brazilian Real in cents
 *
 * Using cents (integers) instead of reais (floats) prevents floating-point precision issues
 * Example: R$ 10,50 = 1050 BRLCents
 */
export type BRLCents = Brand<number, 'BRLCents'>

/**
 * Type guard for BRLCents
 */
export const isBRLCents = (value: unknown): value is BRLCents =>
  typeof value === 'number' && value >= 0 && Number.isInteger(value)

/**
 * Constructor for BRLCents with validation
 * @param value - Amount in cents (must be non-negative integer)
 * @returns BRLCents branded type
 * @throws Error if value is negative or not an integer
 */
export const createBRLCents = (value: number): BRLCents => {
  if (value < 0 || !Number.isInteger(value)) {
    throw new Error('BRLCents must be a non-negative integer')
  }
  return value as BRLCents
}

/**
 * Convert reais to cents
 * @param reais - Amount in reais (R$)
 * @returns Amount in cents (BRLCents)
 * @example
 * reaisToCents(10.50) // 1050 BRLCents
 */
export const reaisToCents = (reais: number): BRLCents => {
  return createBRLCents(Math.round(reais * 100))
}

/**
 * Convert cents to reais
 * @param cents - Amount in cents (BRLCents)
 * @returns Amount in reais (R$)
 * @example
 * centsToReais(1050) // 10.50
 */
export const centsToReais = (cents: BRLCents): number => {
  return cents / 100
}
