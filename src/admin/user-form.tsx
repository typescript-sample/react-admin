import { ValueText } from 'onecore';
import * as React from 'react';
// import { createModel, DispatchWithCallback, EditComponentParam, useEditProps } from 'react-hook-core';
import { formatPhone } from 'ui-plus';
import { emailOnBlur, Gender, inputView, phoneOnBlur, Status } from 'uione';
import { useView } from '../react-hook-core/useView';
import { User, useUser } from './service';

interface InternalState {
  user: User;
  titleList: ValueText[];
  positionList: ValueText[];
}
/*
const createUser = (): User => {
  const user = createModel<User>();
  user.status = Status.Active;
  return user;
};
const initialize = (id: string|null, load: (id: string|null) => void, set: DispatchWithCallback<Partial<InternalState>>) => {
  const masterDataService = useMasterData();
  Promise.all([
    masterDataService.getTitles(),
    masterDataService.getPositions()
  ]).then(values => {
    const [titleList, positionList] = values;
    set({ titleList, positionList }, () => load(id));
  }).catch(handleError);
};
const updateTitle = (title: string, user: User, set: DispatchWithCallback<Partial<InternalState>>) => {
  user.title = title;
  user.gender = (user.title === 'Mr' ? Gender.Male : Gender.Female);
  set({ user });
};

const param: EditComponentParam<User, string, InternalState> = {
  createModel: createUser,
  initialize
};
*/
const initialState: InternalState = {
  user: {} as User,
  titleList: [],
  positionList: []
};
export const UserForm = () => {
  const refForm = React.useRef();
  const { resource, state, back } = useView<User, string, InternalState>(refForm, initialState, useUser(), inputView());
  const user = state.user;
  return (
    <div className='view-container'>
      <form id='userForm' name='userForm' model-name='user' ref={refForm as any}>
        <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            {resource.user_id}
            <input
              type='text'
              id='userId'
              name='userId'
              value={user.userId}
              maxLength={20} required={true}
              placeholder={resource.user_id} />
          </label>
          <label className='col s12 m6'>
            {resource.display_name}
            <input
              type='text'
              id='displayName'
              name='displayName'
              value={user.displayName}
              maxLength={40} required={true}
              placeholder={resource.display_name} />
          </label>
          <label className='col s12 m6'>
            {resource.phone}
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formatPhone(user.phone)}
              onBlur={phoneOnBlur}
              maxLength={17}
              placeholder={resource.phone} />
          </label>
          <label className='col s12 m6'>
            {resource.email}
            <input
              type='text'
              id='email'
              name='email'
              data-type='email'
              value={user.email}
              onBlur={emailOnBlur}
              maxLength={100}
              placeholder={resource.email} />
          </label>
          <label className='col s12 m6'>
            {resource.gender}
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  id='gender'
                  name='gender'
                  disabled={user.title !== 'Dr'}
                  value={Gender.Male} checked={user.gender === Gender.Male} />
                {resource.male}
              </label>
              <label>
                <input
                  type='radio'
                  id='gender'
                  name='gender'
                  disabled={user.title !== 'Dr'}
                  value={Gender.Female} checked={user.gender === Gender.Female} />
                {resource.female}
              </label>
            </div>
          </label>
          <div className='col s12 m6 radio-section'>
            {resource.status}
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  id='active'
                  name='status'
                  value={Status.Active} checked={user.status === Status.Active} />
                {resource.yes}
              </label>
              <label>
                <input
                  type='radio'
                  id='inactive'
                  name='status'
                  value={Status.Inactive} checked={user.status === Status.Inactive} />
                {resource.no}
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
