import {SearchModel} from 'onecore';

export interface RoleSM extends SearchModel {
  roleId?: string;
  roleName?: string;
  remark?: string;
  status?: string[];
}
