import { describe, it, expect } from 'vitest'
import {
  BRAZILIAN_CITIES,
  CITY_MAP,
  getCityLabel,
  formatCityOption,
  findCity,
  isValidCity,
  getCitiesByState,
  getUniqueStates,
} from './cities'

describe('cities', () => {
  describe('BRAZILIAN_CITIES', () => {
    it('contains 20 cities', () => {
      expect(BRAZILIAN_CITIES).toHaveLength(20)
    })

    it('has São Paulo as first city', () => {
      expect(BRAZILIAN_CITIES[0]?.value).toBe('sao-paulo')
    })

    it('all cities have required properties', () => {
      for (const city of BRAZILIAN_CITIES) {
        expect(city).toHaveProperty('value')
        expect(city).toHaveProperty('label')
        expect(city).toHaveProperty('state')
        expect(city).toHaveProperty('population')
        expect(city.value).toBeTruthy()
        expect(city.label).toBeTruthy()
        expect(city.state).toHaveLength(2)
        expect(city.population).toBeGreaterThan(0)
      }
    })
  })

  describe('CITY_MAP', () => {
    it('contains all cities', () => {
      expect(CITY_MAP.size).toBe(BRAZILIAN_CITIES.length)
    })

    it('can look up cities by value', () => {
      const sp = CITY_MAP.get('sao-paulo')
      expect(sp?.label).toBe('São Paulo')
      expect(sp?.state).toBe('SP')
    })
  })

  describe('getCityLabel', () => {
    it('returns formatted label for valid city', () => {
      expect(getCityLabel('sao-paulo')).toBe('São Paulo, SP')
      expect(getCityLabel('rio-de-janeiro')).toBe('Rio de Janeiro, RJ')
    })

    it('returns value for unknown city', () => {
      expect(getCityLabel('unknown-city')).toBe('unknown-city')
    })
  })

  describe('formatCityOption', () => {
    it('formats city for display', () => {
      const city = { value: 'test', label: 'Test City', state: 'TS', population: 100 }
      expect(formatCityOption(city)).toBe('Test City, TS')
    })
  })

  describe('findCity', () => {
    it('finds city by value', () => {
      const city = findCity('brasilia')
      expect(city?.label).toBe('Brasília')
      expect(city?.state).toBe('DF')
    })

    it('returns undefined for unknown city', () => {
      expect(findCity('unknown')).toBeUndefined()
    })
  })

  describe('isValidCity', () => {
    it('returns true for valid city', () => {
      expect(isValidCity('sao-paulo')).toBe(true)
      expect(isValidCity('rio-de-janeiro')).toBe(true)
    })

    it('returns false for invalid city', () => {
      expect(isValidCity('invalid-city')).toBe(false)
      expect(isValidCity('')).toBe(false)
    })
  })

  describe('getCitiesByState', () => {
    it('returns cities for given state', () => {
      const spCities = getCitiesByState('SP')
      expect(spCities.length).toBeGreaterThan(0)
      expect(spCities.every((c) => c.state === 'SP')).toBe(true)
    })

    it('handles lowercase state', () => {
      const rjCities = getCitiesByState('rj')
      expect(rjCities.length).toBeGreaterThan(0)
    })

    it('returns empty array for unknown state', () => {
      expect(getCitiesByState('XX')).toEqual([])
    })
  })

  describe('getUniqueStates', () => {
    it('returns sorted unique states', () => {
      const states = getUniqueStates()
      expect(states.length).toBeGreaterThan(0)
      expect(states).toContain('SP')
      expect(states).toContain('RJ')
      // Check sorting
      const sorted = [...states].sort()
      expect(states).toEqual(sorted)
    })
  })
})
