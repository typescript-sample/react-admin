import { ValueText } from 'onecore';
import * as React from 'react';
import { createModel, DispatchWithCallback, EditComponentParam, useEdit } from '../react-hook-core';
import { formatPhone } from 'ui-plus';
import { emailOnBlur, Gender, handleError, inputEdit, phoneOnBlur, Status } from 'uione';
import { getMasterData, Item, getItemService } from './service';

interface InternalState {
  item: Item;
  titleList: ValueText[];
  positionList: ValueText[];
}

const createItem = (): Item => {
  const item = createModel<Item>();
  return item;
};
const initialize = (id: string|null, load: (id: string|null) => void, set: DispatchWithCallback<Partial<InternalState>>) => {
  const masterDataService = getMasterData();
  Promise.all([
    masterDataService.getTitles(),
    masterDataService.getPositions()
  ]).then(values => {
    const [titleList, positionList] = values;
    set({ titleList, positionList }, () => load(id));
  }).catch(handleError);
};
const updateTitle = (title: string, item: Item, set: DispatchWithCallback<Partial<InternalState>>) => {
    item.title = title;
  set({ item });
};

const initialState: InternalState = {
    item: {} as Item,
    titleList: [],
    positionList: []
};

const param: EditComponentParam<Item, string, InternalState> = {
  createModel: createItem,
  initialize
};
export const ItemForm = () => {
  const refForm = React.useRef();
  const { resource, state, setState, updateState, flag, save, updatePhoneState, back } = useEdit<Item, string, InternalState>(refForm, initialState, getItemService(), inputEdit(), param);
  const item = state.item;
  console.log('dataa:::',state);
  
  return (
    <div className='view-container'>
      <form id='itemForm' name='itemForm' model-name='item' ref={refForm as any}>
        <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2>Edit Item</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            Id
            <input
              type='text'
              id='userId'
              name='userId'
              value={item.id}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20} required={true}
               />
          </label>
          <label className='col s12 m6'>
            {resource.person_title}
            <input
              type='text'
              id='title'
              name='title'
              value={item.title}
              onChange={updateState}
              maxLength={40} 
              required={true}
              placeholder={resource.person_title} />
          </label>
          <label className='col s12 m6'>
            {resource.description}
            <input
              type='text'
              id='description'
              name='description'
              value={item.description}
              onChange={updateState}
              maxLength={40} 
              required={true}
              placeholder={resource.description} />
          </label>
        </div>
        <footer>
          {!flag.readOnly &&
            <button type='submit' id='btnSave' name='btnSave' onClick={save}>
              {resource.save}
            </button>}
        </footer>
      </form>
    </div>
  );
};
