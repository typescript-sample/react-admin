import {ViewSearchService} from 'onecore';
import {Role} from '../model/Role';
import {RoleSM} from '../search-model/RoleSM';

export interface ApprAccessRoleAssignmentService extends ViewSearchService<Role, any, RoleSM> {
}
