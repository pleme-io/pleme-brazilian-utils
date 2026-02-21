/**
 * Brazilian State Code Validation
 *
 * Validates state codes (UF - Unidade Federativa) for all 27 Brazilian states
 */

/**
 * All valid Brazilian state codes
 */
export const BRAZILIAN_STATES: readonly string[] = [
  'AC', // Acre
  'AL', // Alagoas
  'AP', // Amapá
  'AM', // Amazonas
  'BA', // Bahia
  'CE', // Ceará
  'DF', // Distrito Federal
  'ES', // Espírito Santo
  'GO', // Goiás
  'MA', // Maranhão
  'MT', // Mato Grosso
  'MS', // Mato Grosso do Sul
  'MG', // Minas Gerais
  'PA', // Pará
  'PB', // Paraíba
  'PR', // Paraná
  'PE', // Pernambuco
  'PI', // Piauí
  'RJ', // Rio de Janeiro
  'RN', // Rio Grande do Norte
  'RS', // Rio Grande do Sul
  'RO', // Rondônia
  'RR', // Roraima
  'SC', // Santa Catarina
  'SP', // São Paulo
  'SE', // Sergipe
  'TO', // Tocantins
] as const;

/**
 * Brazilian state code type
 */
export type BrazilianState = typeof BRAZILIAN_STATES[number];

/**
 * Validate Brazilian state code (UF)
 * @param state - State code (e.g., "SP", "RJ", "sp", "rj")
 * @returns true if valid Brazilian state code
 * @example
 * validateStateCode("SP") // true
 * validateStateCode("sp") // true
 * validateStateCode("XX") // false
 */
export function validateStateCode(state: string): boolean {
  if (!state || typeof state !== 'string') {
    return false;
  }
  return BRAZILIAN_STATES.includes(state.toUpperCase() as BrazilianState);
}

/**
 * Check if a state code is valid and return the normalized uppercase version
 * @param state - State code
 * @returns Normalized state code or null if invalid
 * @example
 * normalizeStateCode("sp") // "SP"
 * normalizeStateCode("XX") // null
 */
export function normalizeStateCode(state: string): BrazilianState | null {
  if (!validateStateCode(state)) {
    return null;
  }
  return state.toUpperCase() as BrazilianState;
}
