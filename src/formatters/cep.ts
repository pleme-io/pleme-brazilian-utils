/**
 * CEP (Código de Endereçamento Postal) Formatting and Validation
 *
 * Brazilian postal code
 * Format: #####-###
 */

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface AddressFromCEP {
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

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
 * Clean CEP string to numbers only
 */
export function cleanCEP(cep: string): string {
  return cleanDigits(cep);
}

/**
 * Validate CEP format
 */
export function isValidCEP(cep: string): boolean {
  const cleaned = cleanCEP(cep);
  return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
}

/**
 * Format CEP (#####-###)
 */
export function formatCEP(cep: string): string {
  if (!cep) {
    return '';
  }
  const cleaned = cleanDigits(String(cep));
  if (cleaned.length !== 8) {
    return String(cep);
  }

  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Fetch address data from ViaCEP API
 */
export async function fetchAddressByCEP(cep: string): Promise<AddressFromCEP | null> {
  const cleanedCEP = cleanCEP(String(cep));

  if (!isValidCEP(cleanedCEP)) {
    throw new Error('CEP inválido');
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCEP}/json/`);

    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }

    const data: ViaCEPResponse = await response.json();

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      street: data.logradouro,
      ...(data.complemento !== undefined ? { complement: data.complemento } : {}),
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    } as AddressFromCEP;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro ao buscar endereço');
  }
}
