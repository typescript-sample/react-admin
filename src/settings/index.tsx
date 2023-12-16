import React, { useEffect } from 'react';
import { OnClick, initForm, message, useUpdate } from 'react-hook-core';
import { confirm, getDateFormat, handleError, language, registerEvents, requiredOnBlur, showMessage, useResource } from 'uione';

import { Settings, getSettingsService } from './service';

interface InternalState {
  settings: Settings;
}

const initialState: InternalState = {
  settings: {} as any,
};

export const SettingsForm = () => {
  const resource = useResource();
  const refForm = React.useRef();
  const { state, setState, updateState } = useUpdate<InternalState>(initialState);
  const { settings } = state;

  useEffect(() => {
    initForm(refForm.current, registerEvents);
    const dateFormat = getDateFormat();
    const lang = language();
    const s: Settings = { dateFormat, language: lang };
    setState({ settings: s })
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
          <h2>{resource.role_assignment_subject}</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            {resource.language}
            <input
              type='text'
              id='language'
              name='language'
              value={settings.language}
              onChange={updateState}
              maxLength={3} required={true}
              onBlur={requiredOnBlur}
              placeholder={resource.language} />
          </label>
          <label className='col s12 m6'>
            {resource.date_format}
            <input
              type='text'
              id='dateFormat'
              name='dateFormat'
              value={settings.dateFormat}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={12} required={true}
              placeholder={resource.date_format} />
          </label>
        </div>
        <footer>
          <button type='submit' id='btnSave' name='btnSave' onClick={save}>{resource.save}</button>
        </footer>
      </form>
    </div>
  );
};
