import axios from "axios";
import { HttpRequest } from "axios-core";
import { options, storage } from "uione";
import { SettingsClient, SettingsService } from "./settings";

export * from "./settings";

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  settings_url: string;
}

class ApplicationContext {
  private settingsService?: SettingsClient;
  constructor() {
    this.getConfig = this.getConfig.bind(this);
    this.getSettingsService = this.getSettingsService.bind(this);
  }
  getConfig(): Config {
    return storage.config();
  }
  getSettingsService(): SettingsClient {
    if (!this.settingsService) {
      const c = this.getConfig();
      this.settingsService = new SettingsClient(httpRequest, c.settings_url);
    }
    return this.settingsService;
  }
}

export const context = new ApplicationContext();
export function getSettingsService(): SettingsService {
  return context.getSettingsService();
}
