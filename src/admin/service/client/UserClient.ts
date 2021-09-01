import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient, json} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {userModel} from '../../metadata/UserModel';
import {User} from '../../model/User';
import {UserSM} from '../../search-model/UserSM';
import {UserService} from '../UserService';

export class UserClient extends GenericSearchDiffApprWebClient<User, number, number|ResultInfo<User>, UserSM> implements UserService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'users', http, userModel, null, true);
    this.searchGet = true;
  }
  async load(id: number, ctx?: any): Promise<User> {
      let url = this.serviceUrl + '/' + id;
      url = this.serviceUrl + '/' + id;
      const obj = await this.http.get<User>(url);
      return json(obj, this._metamodel);
  }
  protected postOnly(s: UserSM): boolean {
    return true;
  }
}
