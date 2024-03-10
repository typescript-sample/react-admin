import { HttpRequest } from 'axios-core';
import { Client } from 'web-clients';
import { Country, CountryFilter, countryModel, CountryService } from './country';

export * from './country';

export class CountryClient extends Client<Country, string, CountryFilter> implements CountryService {
  constructor(http: HttpRequest, url: string) {
    super(http, url, countryModel);
    this.searchGet = true;
  }
}
