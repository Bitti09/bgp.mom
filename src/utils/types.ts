/**
 * Supported currency codes for provider pricing.
 */
export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CHF",
  "SEK",
  "CZK",
] as const;

/**
 * Table type for BGP route tables.
 */
export const TABLE_TYPES = ["full", "half"] as const;

/**
 * RPKI status values.
 */
export const RPKI_STATUSES = ["yes", "no"] as const;

/**
 * Prefix update status values.
 */
export const PREFIX_UPDATE_STATUSES = ["automatic", "manual"] as const;

/**
 * LOA required values.
 */
export const LOA_REQUIRED_VALUES = ["yes", "no"] as const;

/**
 * Currency symbol mapping for display.
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CHF: "CHF",
  SEK: "SEK",
  CZK: "CZK",
};

/**
 * BGP Provider data type.
 */
export interface BGPProvider {
  title: string;
  image?: string;
  asn: string;
  tableType?: "full" | "half";
  locations?: string[];
  services?: string[];
  features?: string[];
  rpkiStatus?: "yes" | "no";
  prefixUpdateStatus?: "automatic" | "manual";
  loaRequired?: "yes" | "no";
  notes?: string;
  bgpFee: string;
  pricing: string;
  currency: "USD" | "EUR" | "GBP" | "CHF" | "SEK" | "CZK";
  url: string;
}

/**
 * Parsed location with city and country code.
 */
export interface ParsedLocation {
  city: string;
  countryCode: string;
}

/**
 * Parses a location string into city and country code.
 * @param location - Location string in format "City, CC"
 * @returns Parsed location object
 */
export function parseLocation(location: string): ParsedLocation {
  const [city, countryCode] = location.split(", ");
  return { city, countryCode: countryCode || "" };
}

/**
 * Gets the currency symbol for a given currency code.
 * @param currency - Currency code
 * @returns Currency symbol or the currency code itself
 */
export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

/**
 * Gets the display text for a table type.
 * @param tableType - Table type value
 * @returns Display text
 */
export function getTableTypeText(tableType: "full" | "half"): string {
  return tableType === "full" ? "Full Table" : "Half Table";
}
