var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericSearchDiffApprWebClient } from 'web-clients';
import config from '../../../config';
import { roleModel } from '../../metadata/RoleModel';
var RoleAssignmentClient = /** @class */ (function (_super) {
    __extends(RoleAssignmentClient, _super);
    function RoleAssignmentClient(http) {
        return _super.call(this, config.backOfficeUrl + 'accessRoleAssignment', http, roleModel) || this;
    }
    return RoleAssignmentClient;
}(GenericSearchDiffApprWebClient));
export { RoleAssignmentClient };
//# sourceMappingURL=RoleAssignmentClient.js.map