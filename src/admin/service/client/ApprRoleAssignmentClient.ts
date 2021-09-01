import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {roleModel} from '../../metadata/RoleModel';
import {Role} from '../../model/Role';
import {RoleSM} from '../../search-model/RoleSM';
import {ApprAccessRoleAssignmentService} from '../ApprRoleAssignmentService';

export class ApprRoleAssignmentClient extends ViewSearchWebClient<Role, any, RoleSM> implements ApprAccessRoleAssignmentService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/accessRole', http, roleModel);
  }
  /*
  protected formatObject(obj): AccessRole {
    const role: AccessRole = super.formatObject(obj);
    if (role.modules) {
      role.modules.forEach(module => {
          module.showName = module.parentId ? module.parentId + '->' + module.moduleName : module.moduleName;
      });
    }
    return role;
  }*/
}
