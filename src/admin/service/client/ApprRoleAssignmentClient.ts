import {RoleSM} from 'onecore';
import {ViewSearchClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {roleModel} from '../../metadata/RoleModel';
import {Role} from '../../model/Role';
import {ApprAccessRoleAssignmentService} from '../ApprRoleAssignmentService';

export class ApprRoleAssignmentClient extends ViewSearchClient<Role, any, RoleSM> implements ApprAccessRoleAssignmentService {
  constructor(http: HttpRequest) {
    super(http, config.backOfficeUrl + 'common/resources/accessRole', roleModel.attributes);
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
