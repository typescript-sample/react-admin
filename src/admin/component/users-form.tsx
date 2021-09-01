import { SearchModel, ValueText } from 'onecore';
import * as React from 'react';
import { buildFromUrl, HistoryProps, SearchComponent, SearchState } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { getModel } from 'search-utilities';
import { handleError, initForm, inputSearch, registerEvents, setSearchPermission, storage, user } from 'uione';
import { context } from '../app';
import { User } from '../model/User';
import { UserSM } from '../search-model/UserSM';

interface InternalState extends SearchState<User, UserSM> {
  statusList: ValueText[];
}
export class UsersForm extends SearchComponent<User, UserSM, HistoryProps, InternalState> {
  constructor(props) {
    super(props, context.getUserService(), inputSearch());
    this.viewable = true;
    this.editable = true;
    this.state = {
      statusList: [],
      list: [],
      model: {
        userId: '',
        keyword: '',
        status: []
      }
    };
  }
  private readonly masterDataService = context.getMasterDataService();

  componentDidMount() {
    this.form = initForm(this.ref.current, registerEvents);
    const s = this.mergeSearchModel(buildFromUrl(), this.state.model, ['ctrlStatus', 'activate']);
    this.load(s, storage.autoSearch);
  }

  load(s: UserSM, autoSearch: boolean) {
    Promise.all([
      this.masterDataService.getStatus()
    ]).then(values => {
      const [statusList] = values;
      this.setState({ statusList }, () => super.load(s, autoSearch));
    }).catch(handleError);
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push(`users/${id}`);
  }

  approve = (e: any, id: number) => {
    e.preventDefault();
    this.props.history.push(`users/approve/${id}`);
  }

  getSearchModel(): any {
    const name = this.getModelName();
    const lc = this.getLocale();
    const cc = this.getCurrencyCode();
    const fields = this.getDisplayFields();
    const f = this.getSearchForm();
    const dc = (this.ui ? this.ui.decodeFromForm : null);
    const obj3 = getModel(this.state, name, this, fields, this.excluding, this.keys, [], f, dc, lc, cc);
    return obj3;
  }
  render() {
    const resource = this.resource;
    const { statusList, model } = this.state;
    console.log(this.editable);
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.users}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='usersForm' name='usersForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m4 l3'>
                {resource.user_id}
                <input type='text'
                  id='userId' name='userId'
                  value={model.userId}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.user_id} />
              </label>
              <label className='col s12 m8 l4 checkbox-section'>
                {resource.activation_status}
                <section className='checkbox-group'>
                  {statusList.map((item, index) => (
                    <label key={index}>
                      <input
                        type='checkbox'
                        id={item.value}
                        name='status'
                        key={index}
                        value={item.value}
                        checked={model.status.includes(item.value)}
                        onChange={this.updateState} />
                      {item.text}
                    </label>
                  )
                  )}
                </section>
              </label>
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
              </label>
              <button type='submit' className='btn-search' onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field='userId'><button type='button' id='sortUserId' onClick={this.sort}>{resource.user_id}</button></th>
                    <th data-field='username'><button type='button' id='sortUserName' onClick={this.sort}>{resource.username}</button></th>
                    <th data-field='email'><button type='button' id='sortEmail' onClick={this.sort}>{resource.email}</button></th>
                    <th data-field='displayname'><button type='button' id='sortDisplayName' onClick={this.sort}>{resource.display_name}</button></th>
                    <th data-field='status'><button type='button' id='sortStatus' onClick={this.sort}>{resource.status}</button></th>
                    <th className='action'>{resource.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.list && this.state.list.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{(item as any).sequenceNo}</td>
                        <td>{item.userId}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.displayName}</td>
                        <td>{item.status}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'}
                              onClick={(e) => this.edit(e, item.userId)} />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize} />
          </form>
        </div>
      </div>
    );
  }
}
