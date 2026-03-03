import {type Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

// Campos permitidos (máx. 10)
const FIELDS = [
  'name',
  'cca3',
  'region',
  'subregion',
  'capital',
  'population',
  'flags',
  'currencies',
  'languages',
  'borders'
].join(',');

/**
 * Obtener todos los países (requiere fields obligatoriamente)
 */
export const fetchAllCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
  if (!res.ok) throw new Error('Error al cargar países');
  return res.json();
};

/**
 * Obtener país por código (cca2, cca3, ccn3 o cioc)
 */
export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const res = await fetch(`${BASE_URL}/alpha/${code}?fields=${FIELDS}`);
  if (!res.ok) throw new Error('País no encontrado');
  return res.json();
};

/**
 * Obtener múltiples países por códigos (para fronteras)
 */
export const fetchCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
  if (!codes.length) return [];
  const joined = codes.join(',');
  const res = await fetch(`${BASE_URL}/alpha?codes=${joined}&fields=${FIELDS}`);
  if (!res.ok) throw new Error('Error al cargar países fronterizos');
  return res.json();
};
