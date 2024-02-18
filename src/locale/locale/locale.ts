import { Attributes, Filter, Repository, Service } from 'onecore';

export interface LocaleFilter extends Filter {
  code?: string;
  name?: string;
  nativeName?: string;
  countryCode?: string;
  countryName?: string;
  nativeCountryName?: string;
  dateFormat: string;
  firstDayOfWeek?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  currencyCode?: string;
  currencySymbol?: string;
  currencyDecimalDigits?: number;
  currencyPattern?: number;
  currencySample?: string;
}
export interface Locale {
  code: string;
  name?: string;
  nativeName?: string;
  countryCode?: string;
  countryName?: string;
  nativeCountryName?: string;
  dateFormat?: string;
  firstDayOfWeek?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  currencyCode?: string;
  currencySymbol?: string;
  currencyDecimalDigits?: number;
  currencyPattern?: number;
  currencySample?: string;
}
export interface LocaleRepository extends Repository<Locale, string> {
}
export interface LocaleService extends Service<Locale, string, LocaleFilter> {
}

export const localeModel: Attributes = {
  code: {
    key: true,
    length: 40,
  },
  name: {
    length: 255,
  },
  nativeName: {
    column: 'native_name',
    length: 255,
  },
  countryCode: {
    column: 'country_code',
    length: 5,
  },
  countryName: {
    column: 'country_name',
    length: 255,
  },
  nativeCountryName: {
    column: 'native_country_name',
    length: 255,
  },
  dateFormat: {
    column: 'date_format',
    length: 14,
  },
  firstDayOfWeek: {
    column: 'first_day_of_week',
    type: 'integer',
  },
  decimalSeparator: {
    column: 'decimal_separator',
    length: 3,
  },
  groupSeparator: {
    column: 'group_separator',
    length: 3,
  },
  currencyCode: {
    column: 'currency_code',
    length: 3,
  },
  currencySymbol: {
    column: 'currency_symbol',
    length: 6,
  },
  currencyDecimalDigits: {
    column: 'currency_decimal_digits',
    type: 'integer',
  },
  currencyPattern: {
    column: 'currency_pattern',
    type: 'integer',
  },
  currencySample: {
    column: 'currency_sample',
    length: 40,
  },
};
