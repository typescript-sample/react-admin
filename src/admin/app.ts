import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options } from 'uione';
import { ApprRoleAssignmentClient } from './service/client/ApprRoleAssignmentClient';
import { ApprUserClient } from './service/client/ApprUserClient';
import { AuditClient } from './service/client/AuditClient';
import { MasterDataClient } from './service/client/MasterDataClient';
import { RoleAssignmentClient } from './service/client/RoleAssignmentClient';
import { RoleClient } from './service/client/RoleClient';
import { UserClient } from './service/client/UserClient';
import { MasterDataService } from './service/MasterDataService';

const httpRequest = new HttpRequest(axios, options);
class ApplicationContext {
  public masterDataService: MasterDataService;
  public roleAssignmentService: RoleAssignmentClient;
  public apprRoleAssignmentService: ApprRoleAssignmentClient;
  public roleService: RoleClient;
  public userService: UserClient;
  public auditService: AuditClient;
  public apprUserService: ApprUserClient;
  getMasterDataService(): MasterDataService {
    if (!this.masterDataService) {
      this.masterDataService = new MasterDataClient();
    }
    return this.masterDataService;
  }
  getRoleAssignmentService(): RoleAssignmentClient {
    if (!this.roleAssignmentService) {
      this.roleAssignmentService = new RoleAssignmentClient(httpRequest);
    }
    return this.roleAssignmentService;
  }
  getApprRoleAssignmentService(): ApprRoleAssignmentClient {
    if (!this.apprRoleAssignmentService) {
      this.apprRoleAssignmentService = new ApprRoleAssignmentClient(httpRequest);
    }
    return this.apprRoleAssignmentService;
  }
  getRoleService(): RoleClient {
    if (!this.roleService) {
      this.roleService = new RoleClient(httpRequest);
    }
    return this.roleService;
  }
  getUserService(): UserClient {
    if (!this.userService) {
      this.userService = new UserClient(httpRequest);
    }
    return this.userService;
  }
  getAuditService(): AuditClient {
    if (!this.auditService) {
      this.auditService = new AuditClient(httpRequest);
    }
    return this.auditService;
  }
  getApprUserService(): ApprUserClient {
    if (!this.apprUserService) {
      this.apprUserService = new ApprUserClient(httpRequest);
    }
    return this.apprUserService;
  }
  // readonly masterDataService: MasterDataService = new MasterDataClient();
  // readonly roleAssignmentService = new RoleAssignmentClient(httpRequest);
  // readonly apprRoleAssignmentService = new ApprRoleAssignmentClient(httpRequest);
  // readonly roleService = new RoleClient(httpRequest);
  // readonly userService = new UserClient(httpRequest);
  // readonly auditService = new AuditClient(httpRequest);
  // readonly apprUserService = new ApprUserClient(httpRequest);
}

export const context = new ApplicationContext();
