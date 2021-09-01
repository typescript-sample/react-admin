import {Format, Model, Type} from 'onecore';

export const userModel: Model = {
  name: 'user',
  attributes: {
    userId: {
      type: Type.string,
      length: 40,
      required: true,
      key: true
    },
    username: {
      type: Type.string,
      length: 100,
      required: true
    },
    displayName: {
      type: Type.string,
      length: 100,
      required: true
    },
    gender: {
      type: Type.string,
      length: 10
    },
    title: {
      type: Type.string,
      length: 20
    },
    position: {
      type: Type.string,
      length: 20
    },
    phone: {
      type: Type.string,
      format: Format.phone,
      length: 14
    },
    email: {
      type: Type.string,
      length: 100
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
    }
  }
};
