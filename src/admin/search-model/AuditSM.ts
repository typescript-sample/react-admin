import {SearchModel} from 'onecore';
export interface AuditSM extends SearchModel {
  id?: string;
  resource?: string;
  userId?: string;
  ip?: string;
  action?: string;
  timestamp?: string;
  status?: string;
}
