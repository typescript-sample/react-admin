import { ValueText } from 'onecore';
import * as React from 'react';
import { buildFromUrl, HistoryProps, SearchComponent, SearchState } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { getModel } from 'search-utilities';
import { handleError, initForm, inputSearch, registerEvents, storage } from 'uione';
import { context } from '../app';
import { Role } from '../model/Role';
import { RoleSM } from '../search-model/RoleSM';

interface InternalState extends SearchState<Role, RoleSM> {
  statusList: ValueText[];
}
export class RolesForm extends SearchComponent<Role, RoleSM, HistoryProps, InternalState> {
  constructor(props: HistoryProps) {
    super(props, context.getRoleService(), inputSearch());
    this.viewable = true;
    this.editable = true;
    this.state = {
      statusList: [],
      list: [],
      model: {
        keyword: '',
        roleName: '',
        status: []
      }
    };
  }

  private readonly masterDataService = context.getMasterDataService();

  componentDidMount() {
    this.form = initForm(this.ref.current, registerEvents);
    const s = this.mergeSearchModel(buildFromUrl(), this.state.model, ['status']);
    this.load(s, storage.autoSearch);
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('roles/' + id );
  }

  approve = (e: any, role: Role) => {
    e.preventDefault();
    this.props.history.push('access-role-definition/approve/' + role.roleId);
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
    const { model, list } = this.state;
    console.log(this.editable);
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.role_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='rolesForm' name='rolesForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6'>
                {resource.role_name}
                <input
                  type='text'
                  id='roleName'
                  name='roleName'
                  value={model.roleName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.roleName} />
              </label>
              <label className='col s12 m6'>
                {resource.status}
                <section className='checkbox-group'>
                  <label>
                    <input
                      type='checkbox'
                      id='active'
                      name='status'
                      value='A'
                      checked={model.status.includes('A')}
                      onChange={this.updateState} />
                    {resource.active}
                  </label>
                  <label>
                    <input
                      type='checkbox'
                      id='inactive'
                      name='status'
                      value='I'
                      checked={model.status.includes('I')}
                      onChange={this.updateState} />
                    {resource.inactive}
                  </label>
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
            <ul className='row list-view'>
            {list && list.length > 0 && list.map((item, i) => {
              return (
                <li key={i} className='col s12 m6 l4 xl3' onClick={e => this.edit(e, item.roleId)}>
                  <section>
                    <div>
                      <h3 className={item.status === 'I' ? 'inactive' : ''}>{item.roleName}</h3>
                      <p>{item.remark}</p>
                    </div>
                    <button className='btn-detail' />
                  </section>
                </li>
              );
            })}
            </ul>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} />
          </form>
        </div>
      </div>
    );
  }
}
