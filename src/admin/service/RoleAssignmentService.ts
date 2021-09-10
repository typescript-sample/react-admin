import {ResultInfo, RoleSM} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {Role} from '../model/Role';

export interface RoleAssignmentService extends GenericSearchDiffApprService<Role, any, number|ResultInfo<Role>, RoleSM> {
}
