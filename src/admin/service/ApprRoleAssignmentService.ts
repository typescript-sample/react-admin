import {RoleSM, ViewSearchService} from 'onecore';
import {Role} from '../model/Role';

export interface ApprAccessRoleAssignmentService extends ViewSearchService<Role, any, RoleSM> {
}
