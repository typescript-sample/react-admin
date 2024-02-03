import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options, storage } from 'uione';
import { LocaleClient, LocaleService } from './locale';

export * from './locale';

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  locale_url: string;
}
class ApplicationContext {
  localeService?: LocaleClient;
  constructor() {
    this.getConfig = this.getConfig.bind(this);
    this.getLocaleService = this.getLocaleService.bind(this);

  }
  getConfig(): Config {
    return storage.config();
  }
  getLocaleService(): LocaleService {
    if (!this.localeService) {
      const c = this.getConfig();
      this.localeService = new LocaleClient(httpRequest, c.locale_url);
    }
    return this.localeService;
  }
}

export const context = new ApplicationContext();
export const getLocaleService = context.getLocaleService;
