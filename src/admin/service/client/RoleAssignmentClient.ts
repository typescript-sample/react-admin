import {ResultInfo, RoleSM} from 'onecore';
import {GenericSearchDiffApprClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {roleModel} from '../../metadata/RoleModel';
import {Role} from '../../model/Role';
import {RoleAssignmentService} from '../RoleAssignmentService';

export class RoleAssignmentClient extends GenericSearchDiffApprClient<Role, number|ResultInfo<Role>, any, RoleSM> implements RoleAssignmentService {
  constructor(http: HttpRequest) {
    super(http, config.backOfficeUrl + 'accessRoleAssignment', roleModel.attributes);
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
  }
  */
}
