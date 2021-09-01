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
var httpRequest = new HttpRequest(axios, options);
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext() {
    }
    ApplicationContext.prototype.getMasterDataService = function () {
        if (!this.masterDataService) {
            this.masterDataService = new MasterDataClient();
        }
        return this.masterDataService;
    };
    ApplicationContext.prototype.getRoleAssignmentService = function () {
        if (!this.roleAssignmentService) {
            this.roleAssignmentService = new RoleAssignmentClient(httpRequest);
        }
        return this.roleAssignmentService;
    };
    ApplicationContext.prototype.getApprRoleAssignmentService = function () {
        if (!this.apprRoleAssignmentService) {
            this.apprRoleAssignmentService = new ApprRoleAssignmentClient(httpRequest);
        }
        return this.apprRoleAssignmentService;
    };
    ApplicationContext.prototype.getRoleService = function () {
        if (!this.roleService) {
            this.roleService = new RoleClient(httpRequest);
        }
        return this.roleService;
    };
    ApplicationContext.prototype.getUserService = function () {
        if (!this.userService) {
            this.userService = new UserClient(httpRequest);
        }
        return this.userService;
    };
    ApplicationContext.prototype.getAuditService = function () {
        if (!this.auditService) {
            this.auditService = new AuditClient(httpRequest);
        }
        return this.auditService;
    };
    ApplicationContext.prototype.getApprUserService = function () {
        if (!this.apprUserService) {
            this.apprUserService = new ApprUserClient(httpRequest);
        }
        return this.apprUserService;
    };
    return ApplicationContext;
}());
export var context = new ApplicationContext();
//# sourceMappingURL=app.js.map