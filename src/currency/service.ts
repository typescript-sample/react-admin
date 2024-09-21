import axios from "axios"
import { HttpRequest } from "axios-core"
import { options, storage } from "uione"
import { CurrencyClient, CurrencyService } from "./currency"

export * from "./currency"

const httpRequest = new HttpRequest(axios, options)
export interface Config {
  currency_url: string
}
class ApplicationContext {
  currencyService?: CurrencyClient
  constructor() {
    this.getConfig = this.getConfig.bind(this)
    this.getCurrencyService = this.getCurrencyService.bind(this)
  }
  getConfig(): Config {
    return storage.config()
  }
  getCurrencyService(): CurrencyService {
    if (!this.currencyService) {
      const c = this.getConfig()
      this.currencyService = new CurrencyClient(httpRequest, c.currency_url)
    }
    return this.currencyService
  }
}

export const context = new ApplicationContext()
export const getCurrencyService = context.getCurrencyService
