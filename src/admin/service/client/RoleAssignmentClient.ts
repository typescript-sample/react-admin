import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {roleModel} from '../../metadata/RoleModel';
import {Role} from '../../model/Role';
import {RoleSM} from '../../search-model/RoleSM';
import {RoleAssignmentService} from '../RoleAssignmentService';

export class RoleAssignmentClient extends GenericSearchDiffApprWebClient<Role, number|ResultInfo<Role>, any, RoleSM> implements RoleAssignmentService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'accessRoleAssignment', http, roleModel);
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
