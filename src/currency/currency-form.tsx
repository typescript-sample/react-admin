import { Item } from 'onecore';
import { useEffect, useRef } from 'react';
import { createModel, EditComponentParam, setReadOnly, useEdit } from 'react-hook-core';
import { hasPermission, inputEdit, Permission, requiredOnBlur, Status } from 'uione';
import { getCurrencyService, Currency } from './service';

interface InternalState {
  currency: Currency;
  titleList: Item[];
  positionList: Item[];
}

const createCurrency = (): Currency => {
  const currency = createModel<Currency>();
  currency.status = Status.Active;
  return currency;
};

const initialState: InternalState = {
  currency: {} as Currency,
  titleList: [],
  positionList: []
};

const param: EditComponentParam<Currency, string, InternalState> = {
  createModel: createCurrency,
};
export const CurrencyForm = () => {
  const refForm = useRef();
  const { resource, state, updateState, flag, save, back } = useEdit<Currency, string, InternalState>(refForm, initialState, getCurrencyService(), inputEdit(), param);
  useEffect(() => {
    const isReadOnly = !hasPermission(Permission.write, 1);
    if (isReadOnly) {
      setReadOnly(refForm.current as any)
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const currency = state.currency;
  return (
    <div className='view-container'>
      <form id='currencyForm' name='currencyForm' model-name='currency' ref={refForm as any}>
        <header className='view-header'>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2 className='view-title'>{resource.currency}</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            {resource.currency_code}
            <input
              type='text'
              id='code'
              name='code'
              className='form-control'
              value={currency.code || ''}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20} required={true}
              placeholder={resource.currency_code} />
          </label>
          <label className='col s12 m6'>
            {resource.currency_symbol}
            <input
              type='text'
              id='symbol'
              name='symbol'
              className='form-control'
              value={currency.symbol || ''}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40} required={true}
              placeholder={resource.currency_symbol} />
          </label>
          <label className='col s12 m6 flying'>
            {resource.currency_decimal_digits}
            <input
              type='text'
              id='decimalDigits'
              name='decimalDigits'
              className='text-right'
              data-type='integer'
              value={currency.decimalDigits || ''}
              onChange={updateState}
              maxLength={1}
              placeholder={resource.currency_decimal_digits} />
          </label>
          <div className='col s12 m6 radio-section'>
            {resource.status}
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  id='active'
                  name='status'
                  onChange={updateState}
                  value={Status.Active} checked={currency.status === Status.Active} />
                {resource.yes}
              </label>
              <label>
                <input
                  type='radio'
                  id='inactive'
                  name='status'
                  onChange={updateState}
                  value={Status.Inactive} checked={currency.status === Status.Inactive} />
                {resource.no}
              </label>
            </div>
          </div>
        </div>
        <footer className='view-footer'>
          {!flag.readOnly &&
            <button type='submit' id='btnSave' name='btnSave' onClick={save}>
              {resource.save}
            </button>}
        </footer>
      </form>
    </div>
  );
};
