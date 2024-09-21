import { Attributes, Filter, Repository, Service } from "onecore"

export interface CountryFilter extends Filter {
  countryCode?: string
  countryName?: string
  nativeCountryName?: string
  decimalSeparator?: string
  groupSeparator?: string
  currencyCode?: string
  currencySymbol?: string
  currencyDecimalDigits?: number
  currencyPattern?: number
  currencySample?: string
  status?: string
}
export interface Country {
  countryCode: string
  countryName?: string
  nativeCountryName?: string
  decimalSeparator?: string
  groupSeparator?: string
  currencyCode?: string
  currencySymbol?: string
  currencyDecimalDigits?: number
  currencyPattern?: number
  currencySample?: string
  status?: string
}
export interface CountryRepository extends Repository<Country, string> {}
export interface CountryService extends Service<Country, string, CountryFilter> {}

export const countryModel: Attributes = {
  countryCode: {
    key: true,
    column: "country_code",
    length: 5,
  },
  countryName: {
    column: "country_name",
    length: 255,
  },
  nativeCountryName: {
    column: "native_country_name",
    length: 255,
  },
  decimalSeparator: {
    column: "decimal_separator",
    length: 3,
  },
  groupSeparator: {
    column: "group_separator",
    length: 3,
  },
  currencyCode: {
    column: "currency_code",
    length: 3,
  },
  currencySymbol: {
    column: "currency_symbol",
    length: 6,
  },
  currencyDecimalDigits: {
    column: "currency_decimal_digits",
    type: "integer",
  },
  currencyPattern: {
    column: "currency_pattern",
    type: "integer",
  },
  currencySample: {
    column: "currency_sample",
    length: 40,
  },
}
