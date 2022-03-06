import {GenericSearchDiffApprService, Model, ResultInfo, RoleSM, Tracking} from 'onecore';

export interface Role extends Tracking {
  roleId: string;
  roleName: string;
  status: string;
  remark?: string;
  privileges?: string[];
  users?: User[];
}
interface User extends Tracking {
  userId: string;
  username: string;
  email: string;
  displayName: string;
  imageURL?: string;
  status: string;
  gender?: string;
  phone?: string;
  title?: string;
  position?: string;
  roles?: string[];
}
export interface Privilege {
  id: string;
  name: string;
  children?: Privilege[];
}
export interface RoleService extends GenericSearchDiffApprService<Role, any, number|ResultInfo<Role>, RoleSM> {
  getPrivileges?(ctx?: any): Promise<Privilege[]>;
}

export const roleModel: Model = {
  name: 'role',
  attributes: {
    roleId: {
      length: 40,
      key: true
    },
    roleName: {
      type: 'string' ,
      length: 120
    },
    remark: {
      length: 255
    },
    status: {
      length: 1
    },
    createdBy: {
      length: 40
    },
    createdAt: {
      type: 'datetime'
    },
    updatedBy: {
      length: 40
    },
    updatedAt: {
      type: 'datetime'
    },
    modules: {
      type: 'array'
    }
  }
};
