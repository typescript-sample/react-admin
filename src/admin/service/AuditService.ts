import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import { Audit, Privilege } from '../model/Audit';
import {AuditSM} from '../search-model/AuditSM';

export interface AuditService extends GenericSearchDiffApprService<Audit, any, number|ResultInfo<Audit>, AuditSM> {
  getPrivileges?(ctx?: any): Promise<Privilege[]>;
}
