import {SearchModel} from 'onecore';

export interface UserSM extends SearchModel {
  userId?: string;
  username?: string;
  email?: string;
  displayName?: string;
  status?: string[];
}
