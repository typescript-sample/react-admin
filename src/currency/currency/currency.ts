import { Attributes, Filter, Service } from "onecore"

export interface Currency {
  code: string
  symbol: string
  decimalDigits: number
  status?: string
}

export interface CurrencyFilter extends Filter {
  code?: string
  symbol?: string
  decimalDigits?: number
  status?: string[]
}

export interface CurrencyService extends Service<Currency, string, CurrencyFilter> {}

export const currencyModel: Attributes = {
  code: {
    key: true,
    length: 3,
  },
  symbol: {
    length: 6,
  },
  decimalDigits: {
    column: "decimal_digits",
    type: "integer",
  },
}
