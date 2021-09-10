import {ValueText} from 'onecore';
import * as React from 'react';
import { EditComponent, HistoryProps } from 'src/core/hooks';
// import {EditComponent, HistoryProps} from 'react-onex';
import {handleError, inputEdit, resource as getResource} from 'uione';
import femaleIcon from '../../assets/images/female.png';
import maleIcon from '../../assets/images/male.png';
import {context} from '../app';
import {Role} from '../model/Role';
import {User} from '../model/User';
import {UsersLookup} from './users-lookup';

interface InternalState {
  role: Role;
  date: Date;
  userTypeList: ValueText[];
  roles: any[];
  roleAssignToUsers?: any[];
  textSearch: string;
  isOpenModel: boolean;
  isShowCheckbox: boolean;
  checkBoxList: any[];
}

export class RoleAssignmentForm extends EditComponent<Role, any, HistoryProps, InternalState> {
  constructor(props) {
    super(props, context.getRoleAssignmentService(), inputEdit());
    this.confirm = this.confirm.bind(this);
    this.state = {
      role: {} as any,
      date: new Date(),
      userTypeList: [],
      roles: [],
      roleAssignToUsers: null,
      textSearch: '',
      isOpenModel: false,
      isShowCheckbox: false,
      checkBoxList: []
    };
  }
  private readonly roleService = context.getApprRoleAssignmentService();

  async load(id: any) {
    Promise.all([
      this.roleService.all()
    ]).then(values => {
      const [roles] = values;
      this.setState({ roles }, () => super.load(id));
      this.newMode = false; // ??
    }).catch(handleError);
  }

  handleUsersDeselect = (deselectedOptions) => {
    const { role } = this.state;
    const selectedOptions = role.users.slice();
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1);
    });
    this.setState({ role: { ...role, users: selectedOptions } });
  }

  handleUsersSelect = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.id - b.id);
    const { role } = this.state;
    this.setState({ role: { ...role, users: selectedOptions } });
  }

  handleGroupdIdChange = () => {
    const { roles, role } = this.state;
    const a = roles.filter(item => item['roleId'] === role.roleId);
    if (a.length > 0) {
      const selectedRole = a[0];
      const uType = '';
      const setRole = { ...selectedRole, userType: uType };
      this.setState({ role: setRole });
    }
  }

  onSearch = (event) => {
    const { role } = this.state;
    if (role.users) {
      const result = role.users.filter((value) => {
        return value['userId'].includes(event.target.value);
      });
      this.setState({ [event.target.name]: event.target.value, roleAssignToUsers: result } as any);
    }
  }

  onModelSave = (array: []) => {
    let { roleAssignToUsers } = this.state;
    const { role } = this.state;
    const roles = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];

    array.map((value) => {
      roles.push(value);
    });
    roleAssignToUsers = roles;
    role.users = roles;
    this.setState({ role, roleAssignToUsers, isOpenModel: false });
  }

  onModelClose = () => {
    this.setState({ isOpenModel: false });
  }

  onCheckBox = (userId) => {
    const { role, checkBoxList } = this.state;
    if (role.users) {
      const result = role.users.find((value) => {
        if (value) {
          return value.userId === userId;
        }
      });
      if (result) {
        const index = checkBoxList.indexOf(result);
        if (index !== -1) {
          delete checkBoxList[index];
        } else {
          checkBoxList.push(result);
        }
      }
    }
    this.setState({ checkBoxList });
  }

  onShowCheckBox = () => {
    let { isShowCheckbox } = this.state;
    if (isShowCheckbox === false) {
      isShowCheckbox = true;
    } else {
      isShowCheckbox = false;
    }
    this.setState({ isShowCheckbox });
  }

  onDeleteCheckBox = () => {
    const r = getResource();
    this.confirm(r.value('msg_confirm_delete'), r.value('confirm'), () => {
      let { roleAssignToUsers, checkBoxList } = this.state;
      const { role } = this.state;
      const roles = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];
      const arr = [];
      roles.map((value) => {
        const result = checkBoxList.find((v) => {
          if (v) {
            return v.userId === value.userId;
          }
        });
        if (result === undefined) {
          arr.push(value);
        }
      });
      roleAssignToUsers = arr;
      role.users = arr;
      checkBoxList = [];
      this.setState({ role, roleAssignToUsers, checkBoxList, isShowCheckbox: false });
    });
  }

  onCheckAll = () => {
    let { checkBoxList } = this.state;
    const { role } = this.state;
    if (role.users) {
      checkBoxList = role.users;
    }
    this.setState({ checkBoxList });
  }

  onUnCheckAll = () => {
    this.setState({ checkBoxList: [] });
  }

  render() {
    const resource = this.resource;
    const { role, roleAssignToUsers, roles, isOpenModel, isShowCheckbox, checkBoxList } = this.state;
    const resultRoleAssignToUsers = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];
    return (
      <div className='view-container'>
        <form id='roleAssignmentForm' name='roleAssignmentForm' model-name='role' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{this.newMode ? resource.create : resource.edit} {resource.role_assignment_subject}</h2>
          </header>
          <div>
            <section className='row'>
              <h4>{resource.role_assignment_subject}</h4>
              <label className='col s12 m6'>
                {resource.role_id}
                <select id='roleId' name='roleId' defaultValue={''} required={true}
                  value={role.roleId}
                   disabled={!this.newMode}
                   onChange={(e) => {
                    this.updateState(e, this.handleGroupdIdChange);
                  }}>
                  <option selected={true} value=''>{resource.please_select}</option>
                  {roles.map((item, index) => (
                    <option key={index} value={item.roleId}>{item.roleId}</option>)
                  )}
                </select>
              </label>
              <label className='col s12 m6'>
                {resource.role_name}
                <input type='text'
                  id='roleName' name='roleName'
                  value={role.roleName || ''}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.role_name}
                  disabled={true} />
              </label>
              <label className='col s12 m6'>
                {resource.description}
                <input type='text'
                  id='remark' name='remark'
                  value={role.remark || ''}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.description}
                  disabled={true} />
              </label>
            </section>
            <section className='row detail'>
              <h4>
                {resource.user}
                <div className='btn-group'>
                  {!this.readOnly && <button type='button' onClick={() => this.setState({ isOpenModel: true })}>{resource.add}</button>}
                  {!this.readOnly && <button type='button' onClick={this.onShowCheckBox}>{isShowCheckbox ? resource.deselect : resource.select}</button>}
                  {isShowCheckbox ? <button type='button' onClick={this.onCheckAll}>{resource.check_all}</button> : ''}
                  {isShowCheckbox ? <button type='button' onClick={this.onUnCheckAll}>{resource.uncheck_all}</button> : ''}
                  {isShowCheckbox ? <button type='button' onClick={this.onDeleteCheckBox}>{resource.delete}</button> : ''}
                </div>
              </h4>
              {!this.readOnly &&
                <label className='col s12 search-input'>
                  <i className='btn-search' />
                  <input type='text'
                    id='textSearch'
                    name='textSearch'
                    onChange={this.onSearch}
                    value={this.state.textSearch}
                    maxLength={40}
                    placeholder={resource.role_assignment_search_user} />
                </label>
              }
              <ul className='row list-view'>
                {resultRoleAssignToUsers && resultRoleAssignToUsers.map((value, i) => {
                  const result = checkBoxList.find((v) => {
                    if (v) {
                      return v.userId === value.userId;
                    }
                  });
                  return (
                    <li key={i} className='col s12 m6 l4 xl3' onClick={isShowCheckbox === true ? () => this.onCheckBox(value.userId) : () => { }}>
                      <section>
                        {isShowCheckbox === true ? <input type='checkbox' name='selected' checked={result ? true : false} /> : ''}
                        <img src={value.gender === 'F' ? femaleIcon : maleIcon} className='round-border' />
                        <div>
                          <h3>{value.userId}</h3>
                          <p>{value.firstName} {value.lastName}</p>
                        </div>
                        <button className='btn-detail' />
                      </section>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
          <footer>
            {!this.readOnly &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
                {resource.save}
              </button>}
          </footer>
        </form>
        <UsersLookup
          location={this.props.location}
          history={this.props.history}
          props={this.props['props']}
          isOpenModel={isOpenModel}
          onModelClose={this.onModelClose}
          onModelSave={this.onModelSave}
          roleAssignToUsers={resultRoleAssignToUsers}
        />
      </div >
    );
  }
}

