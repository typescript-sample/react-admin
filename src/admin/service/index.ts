import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options, storage } from 'uione';
import { AuditClient } from './audit-log';
import { AuditLogService } from './audit-log/audit-log';
import { MasterDataClient, MasterDataService } from './master-data';
import { RoleClient, RoleService } from './role';
import { UserClient, UserService } from './user';
import { ItemClient, ItemService } from './item';
import { ArticleClient, ArticleService } from './article';

export * from './role';
export * from './user';
export * from './audit-log';
export * from './item';
export * from './article';
axios.defaults.withCredentials = true;

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  user_url: string;
  role_url: string;
  item_url: string;
  article_url: string;
  privilege_url: string;
  audit_log_url: string;
}
class ApplicationContext {
  roleService?: RoleClient;
  userService?: UserService;
  itemService?: ItemService;
  articleService?: ArticleService;
  masterDataService?: MasterDataService;
  private auditService?: AuditClient;
  constructor() {
    this.getConfig = this.getConfig.bind(this);
    this.getRoleService = this.getRoleService.bind(this);
    this.getUserService = this.getUserService.bind(this);
    this.getMasterDataService = this.getMasterDataService.bind(this);
  }
  getConfig(): Config {
    return storage.config();
  }
  getRoleService(): RoleService {
    if (!this.roleService) {
      const c = this.getConfig();
      this.roleService = new RoleClient(httpRequest, c.role_url, c.privilege_url);
    }
    return this.roleService;
  }
  getUserService(): UserService {
    if (!this.userService) {
      const c = this.getConfig();
      this.userService = new UserClient(httpRequest, c.user_url);
    }
    return this.userService;
  }
  getMasterDataService(): MasterDataService {
    if (!this.masterDataService) {
      this.masterDataService = new MasterDataClient();
    }
    return this.masterDataService;
  }
  getAuditService(): AuditClient {
    if (!this.auditService) {
      const c = this.getConfig();
      this.auditService = new AuditClient(httpRequest, c.audit_log_url);
    }
    return this.auditService;
  }

  getItemService(): ItemService {
    if (!this.itemService) {
      const c = this.getConfig();
      this.itemService = new ItemClient(httpRequest, c.item_url);
    }
    return this.itemService;
  }

  getArticleService(): ArticleService {
    if (!this.articleService) {
      const c = this.getConfig();
      this.articleService = new ArticleClient(httpRequest, c.article_url);
    }
    return this.articleService;
  }

}

export const context = new ApplicationContext();
export function getRoleService(): RoleService {
  return context.getRoleService();
}
export function getUserService(): UserService {
  return context.getUserService();
}
export function getMasterData(): MasterDataService {
  return context.getMasterDataService();
}
export function useAuditLog(): AuditLogService {
  return context.getAuditService();
}

export function getItemService(): ItemService {
  return context.getItemService();
}


export function getArticleService(): ArticleService {
  return context.getArticleService();
}