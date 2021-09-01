import {Format, Model, Type} from 'onecore';

export const auditModel: Model = {
  name: 'audit',
  attributes: {
    id: {
      type: Type.string,
      length: 40,
      required: true,
      key: true
    },
    resource: {
      type: Type.string,
      length: 100,
      required: true
    },
    userId: {
      type: Type.string,
      length: 20
    },
    ip: {
      type: Type.string,
      length: 20
    },
    action: {
      type: Type.string,
      length: 20
    },
    timestamp: {
      type: Type.string,
      length: 14
    },
    status: {
      type: Type.string,
      length: 10
    },
    remark: {
      type: Type.string,
      length: 100
    },
  }
};
