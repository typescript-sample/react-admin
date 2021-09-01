import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient, HttpRequest} from 'web-clients';
import config from '../../../config';
import { auditModel } from '../../metadata/AuditModel';
import { Audit, Privilege } from '../../model/Audit';
import { AuditSM } from '../../search-model/AuditSM';
import { AuditService } from '../AuditService';

export class AuditClient extends GenericSearchDiffApprWebClient<Audit, any, number|ResultInfo<Audit>, AuditSM> implements AuditService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'audit-logs', http, auditModel, null, true);
  }
  getPrivileges(ctx?: any): Promise<Privilege[]> {
    return this.http.get<Privilege[]>(config.backOfficeUrl + 'privileges');
  }
}
