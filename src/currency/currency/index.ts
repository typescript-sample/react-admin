import { HttpRequest } from "axios-core"
import { Client } from "web-clients"
import { Currency, CurrencyFilter, currencyModel, CurrencyService } from "./currency"

export * from "./currency"

export class CurrencyClient extends Client<Currency, string, CurrencyFilter> implements CurrencyService {
  constructor(http: HttpRequest, url: string) {
    super(http, url, currencyModel)
    this.searchGet = true
  }
}
