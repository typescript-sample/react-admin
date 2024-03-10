import { Item } from 'onecore';
import { useEffect, useRef } from 'react';
import { createModel, EditComponentParam, setReadOnly, useEdit } from 'react-hook-core';
import { hasPermission, inputEdit, Permission, requiredOnBlur } from 'uione';
import { getCountryService, Country } from './service';

interface InternalState {
  country: Country;
  titleList: Item[];
  positionList: Item[];
}

const createCountry = (): Country => {
  const country = createModel<Country>();
  return country;
};

const initialState: InternalState = {
  country: {} as Country,
  titleList: [],
  positionList: []
};

const param: EditComponentParam<Country, string, InternalState> = {
  createModel: createCountry,
};
export const CountryForm = () => {
  const refForm = useRef();
  const { resource, state, updateState, flag, save, back } = useEdit<Country, string, InternalState>(refForm, initialState, getCountryService(), inputEdit(), param);
  useEffect(() => {
    const isReadOnly = !hasPermission(Permission.write, 1);
    if (isReadOnly) {
      setReadOnly(refForm.current as any)
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const country = state.country;
  return (
    <div className='view-container'>
      <form id='countryForm' name='countryForm' model-name='country' ref={refForm as any}>
        <header className='view-header'>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2 className='view-title'>{flag.newMode ? resource.create : resource.edit} {resource.country}</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            {resource.country_code}
            <input
              type='text'
              id='countryCode'
              name='countryCode'
              value={country.countryCode || ''}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={3} required={true}
              placeholder={resource.country_code} />
          </label>
          <label className='col s12 m6'>
            {resource.country_name}
            <input
              type='text'
              id='countryName'
              name='countryName'
              value={country.countryName || ''}
              onChange={updateState}
              maxLength={20} required={true}
              placeholder={resource.country_name} />
          </label>
          <label className='col s12 m6'>
            {resource.country_native_name}
            <input
              type='text'
              id='nativeCountryName'
              name='nativeCountryName'
              value={country.nativeCountryName || ''}
              onChange={updateState}
              maxLength={100} required={true}
              placeholder={resource.country_native_name} />
          </label>
          <label className='col s12 m6'>
            {resource.currency_code}
            <input
              type='text'
              id='currencyCode'
              name='currencyCode'
              value={country.currencyCode || ''}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={3} required={true}
              placeholder={resource.currency_code} />
          </label>
          <label className='col s12 m6'>
            {resource.currency_symbol}
            <input
              type='text'
              id='currencySymbol'
              name='currencySymbol'
              value={country.currencySymbol || ''}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40} required={true}
              placeholder={resource.currency_symbol} />
          </label>
          <label className='col s12 m6 flying'>
            {resource.currency_decimal_digits}
            <input
              type='text'
              id='currencyDecimalDigits'
              name='currencyDecimalDigits'
              className='text-right'
              data-type='integer'
              value={country.currencyDecimalDigits || ''}
              onChange={updateState}
              maxLength={1}
              placeholder={resource.currency_decimal_digits} />
          </label>
          <label className='col s12 m6'>
            {resource.currency_pattern}
            <input
              type='text'
              id='currencyPattern'
              name='currencyPattern'
              className='text-right'
              data-type='integer'
              value={country.currencyPattern || ''}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40} required={true}
              placeholder={resource.currency_pattern} />
          </label>
          <label className='col s12 m6'>
            {resource.currency_sample}
            <input
              type='text'
              id='currencySample'
              name='currencySample'
              value={country.currencySample || ''}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40} required={true}
              placeholder={resource.currency_sample} />
          </label>
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
