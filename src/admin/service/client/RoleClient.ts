import {ResultInfo, RoleSM} from 'onecore';
import {GenericSearchDiffApprClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {roleModel} from '../../metadata/RoleModel';
import {Privilege, Role} from '../../model/Role';
import {RoleService} from '../RoleService';

export class RoleClient extends GenericSearchDiffApprClient<Role, any, number|ResultInfo<Role>, RoleSM> implements RoleService {
  constructor(http: HttpRequest, url: string) {
    super(http, url, roleModel.attributes, null);
  }
  getPrivileges(ctx?: any): Promise<Privilege[]> {
    return this.http.get<Privilege[]>(config.backOfficeUrl + 'privileges');
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
