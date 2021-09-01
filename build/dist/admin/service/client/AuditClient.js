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
import { auditModel } from '../../metadata/AuditModel';
var AuditClient = /** @class */ (function (_super) {
    __extends(AuditClient, _super);
    function AuditClient(http) {
        return _super.call(this, config.backOfficeUrl + 'audit-logs', http, auditModel, null, true) || this;
    }
    AuditClient.prototype.getPrivileges = function (ctx) {
        return this.http.get(config.backOfficeUrl + 'privileges');
    };
    return AuditClient;
}(GenericSearchDiffApprWebClient));
export { AuditClient };
//# sourceMappingURL=AuditClient.js.map