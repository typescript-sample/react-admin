import {Model, Type} from 'onecore';
import {userModel} from './UserModel';

export const roleModel: Model = {
  name: 'role',
  attributes: {
    roleId: {
      type: Type.string,
      length: 40,
      key: true
    },
    roleName: {
      type: Type.string ,
      length: 120
    },
    remark: {
      type: Type.string,
      length: 255
    },
    status: {
      type: Type.string,
      length: 1
    },
    createdBy: {
      type: Type.string,
      length: 40
    },
    createdAt: {
      type: Type.date
    },
    updatedBy: {
      type: Type.string,
      length: 40
    },
    updatedAt: {
      type: Type.date
    },
    modules: {
      type: Type.array
    },
    users: {
      type: Type.array,
      typeof: userModel
    }
  }
};
