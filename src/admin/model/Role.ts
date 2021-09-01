import {TrackingModel} from './TrackingModel';
import {User} from './User';

export interface Role extends TrackingModel {
  roleId: string;
  roleName: string;
  status: string;
  remark?: string;
  privileges?: string[];
  users?: User[];
}

export interface Privilege {
  id: string;
  name: string;
  children?: Privilege[];
}
