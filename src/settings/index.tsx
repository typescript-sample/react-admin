import { Item } from 'onecore';
import React, { useEffect } from 'react';
import { OnClick, initForm, message, useUpdate } from 'react-hook-core';
import { confirm, getDateFormat, getLanguage, handleError, registerEvents, requiredOnBlur, showMessage, useResource } from 'uione';
import { Settings, getMasterDataService, getSettingsService } from './service';

interface InternalState {
  settings: Settings;
  languageList: Item[];
  dateFormatList: Item[];
}

const initialState: InternalState = {
  settings: {} as any,
  languageList: [],
  dateFormatList: []
};

export const SettingsForm = () => {
  const resource = useResource();
  const refForm = React.useRef();
  const { state, setState, updateState } = useUpdate<InternalState>(initialState);
  const { settings } = state;

  useEffect(() => {
    initForm(refForm.current, registerEvents);
    const masterDataService = getMasterDataService();
    const dateFormat = getDateFormat();
    const language = getLanguage();
    const s: Settings = { dateFormat, language };
    setState({ settings: s }, () => {
      Promise.all([
        masterDataService.getLanguages(),
        masterDataService.getDateFormats()
      ]).then(values => {
        const [languageList, dateFormatList] = values;
        setState({ languageList, dateFormatList });
      }).catch(handleError);
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = (e: OnClick) => {
    e.preventDefault();
    const msg = message(resource, 'msg_confirm_save', 'confirm', 'yes', 'no');
    confirm(msg.message, msg.title, () => {
      const settingsService = getSettingsService();
      settingsService.save(settings).then(res => {
        showMessage(resource.msg_save_success);
      }).catch(handleError);
    }, msg.no, msg.yes);
  };

  return (
    <div className='view-container'>
      <form id='settingsForm' name='settingsForm' model-name='settings' ref={refForm as any}>
        <header>
          <h2>{resource.settings}</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            {resource.language}
            <select
              id='language'
              name='language'
              value={settings.language}
              onChange={updateState}
              onBlur={requiredOnBlur}>
              {
                state.languageList.map((item, index) => (<option key={index} value={item.value}>{item.text}</option>))
              }
            </select>
          </label>
          <label className='col s12 m6'>
            {resource.date_format}
            <select
              id='dateFormat'
              name='dateFormat'
              value={settings.dateFormat}
              onChange={updateState}
              onBlur={requiredOnBlur}>
              {
                state.dateFormatList.map((item, index) => (<option key={index} value={item.value}>{item.text}</option>))
              }
            </select>
          </label>
        </div>
        <footer>
          <button type='submit' id='btnSave' name='btnSave' onClick={save}>{resource.save}</button>
        </footer>
      </form>
    </div>
  );
};
