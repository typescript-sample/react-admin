import {TrackingModel} from './TrackingModel';

export interface User extends TrackingModel {
  userId: string;
  username: string;
  email: string;
  displayName: string;
  status: string;
  gender?: string;
  phone?: string;
  title?: string;
  position?: string;
  roles?: string[];
}
