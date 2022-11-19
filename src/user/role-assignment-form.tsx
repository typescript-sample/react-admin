import { useEffect, useState } from 'react';
import * as React from 'react';
import { buildId, DispatchWithCallback, error, message } from 'react-hook-core';
import { useNavigate, useParams } from 'react-router-dom';
import { confirm, handleError, showMessage, storage, useResource } from 'uione';
import { getUserService, User } from './service';
import { getRoleService } from './service';
import { Role } from './user';

interface InternalState {
  user: User;
  roles: Role[];
  selectedRoles: Role[];
  checkedAll: boolean;
}

const initialState: InternalState = {
  user: {} as any,
  roles: [],
  selectedRoles: [],
  checkedAll: false,
};
const getRoles = (roles?: Role[]): string[] => {
  return roles ? roles.map(item => item.roleId) : [];
};

const initialize = (id: string, set: DispatchWithCallback<Partial<InternalState>>, state: Partial<InternalState>) => {
  const userService = getUserService();
  const roleService = getRoleService();
  Promise.all([
    roleService.all(),
    userService.load(id),
  ]).then(values => {
    const [roles, user] = values;
    const userRoles = roles.filter(role => user?.roles?.includes(role.roleId));
    if (user) {
      const checkedAll = roles.length === user?.roles?.length;
      set({ ...state, roles, selectedRoles: userRoles, user, checkedAll });
    }
  }).catch(err => error(err, storage.resource().value, storage.alert));
};

export const RoleAssignmentForm = () => {
  const resource = useResource();
  const navigate = useNavigate();
  const params = useParams();
  const userService = getUserService();
  const [state, setState] = useState(initialState);
  const { user } = state;
  let { roles, selectedRoles, checkedAll } = state;

  useEffect(() => {
    const id = buildId<string>(params);
    if (id) {
      initialize(id, setState as any, state);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userRoles = getRoles(selectedRoles);
    const msg = message(resource, 'msg_confirm_save', 'confirm', 'yes', 'no');
    confirm(msg.message, msg.title, () => {
      userService.patch({
        userId: user.userId,
        roles: userRoles,
      }).then(res => {
        showMessage(resource.msg_save_success);
      }).catch(handleError);
    }, msg.no, msg.yes);
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (roles) {
      const role = roles.find(v => v.roleId === id);
      if (role) {
        const index = selectedRoles.indexOf(role);
        if (index !== -1) {
          selectedRoles = selectedRoles.filter(item => item.roleId !== id);
        } else {
          selectedRoles.push(role);
        }
      }
      checkedAll = roles.length === selectedRoles.length;
    }
    setState({ ...state, selectedRoles, checkedAll });
  };

  const onCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && roles) {
      selectedRoles = roles;
      checkedAll = true;
    } else {
      selectedRoles = [];
      checkedAll = false;
    }
    setState({ ...state, selectedRoles, checkedAll });
  };

  const back = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    navigate(-1);
  };
  return (
    <div className='view-container'>
      <form id='roleAssignmentForm' name='roleAssignmentForm' model-name='role'>
      <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2>{resource.role_assignment_subject}</h2>
        </header>
        <div>
          <section className='row'>
            <label className='col s12 m6'>
              {resource.email}
              <input type='text'
                id='email' name='email'
                value={user.email || ''}
                maxLength={255}
                placeholder={resource.email}
                disabled={true} />
            </label>
          </section>
          <section className='list-container'>
            <ul className='row list-view'>
            <li className="col">
            <section>
              <input
                type='checkbox' 
                id='checkAll'
                name='checkAll'
                checked={checkedAll} 
                onChange={e => onCheckAll(e)}
              />
              <span>{resource.check_all}</span>
            </section>
            <hr></hr>
            </li>
              {roles && roles?.map((item, i) => {
                return (
                  <li key={i} className='col'>
                    <section>
                      <input 
                        type='checkbox' 
                        name='selected' 
                        checked={selectedRoles.includes(item)} 
                        onChange={(e) => onCheck(e, item.roleId)}
                      />
                      <span>
                        {item.roleName}
                      </span>
                    </section>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <footer>
          <button type='submit' id='btnSave' name='btnSave' onClick={save}>{resource.save}</button>
        </footer>
      </form>
    </div>
  );
};
