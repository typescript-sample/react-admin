import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options, storage } from 'uione';
import { CountryClient, CountryService } from './country';

export * from './country';

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  country_url: string;
}
class ApplicationContext {
  countryService?: CountryClient;
  constructor() {
    this.getConfig = this.getConfig.bind(this);
    this.getCountryService = this.getCountryService.bind(this);

  }
  getConfig(): Config {
    return storage.config();
  }
  getCountryService(): CountryService {
    if (!this.countryService) {
      const c = this.getConfig();
      this.countryService = new CountryClient(httpRequest, c.country_url);
    }
    return this.countryService;
  }
}

export const context = new ApplicationContext();
export const getCountryService = context.getCountryService;
