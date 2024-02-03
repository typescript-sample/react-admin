import { Item } from 'onecore';
import { useRef } from 'react';
import { checked, OnClick,  PageSizeSelect, SearchComponentState, useSearch, value } from 'react-hook-core';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Pagination } from 'reactx-pagination';
import { hasPermission, inputSearch, write } from 'uione';
import { getLocaleService, Locale, LocaleFilter } from './service';

interface LocaleSearch extends SearchComponentState<Locale, LocaleFilter> {
  statusList: Item[];
}
const localeFilter: LocaleFilter = {
  q: '',
  code: '',
  name: '',
};
const localeSearch: LocaleSearch = {
  statusList: [],
  list: [],
  filter: localeFilter
};
export const LocalesForm = () => {
  const navigate = useNavigate();
  const refForm = useRef();
  const { state, resource, component, updateState, search, sort, toggleFilter, clearQ, changeView, pageChanged, pageSizeChanged } = useSearch<Locale, LocaleFilter, LocaleSearch>(refForm, localeSearch, getLocaleService(), inputSearch());
  const canWrite = hasPermission(write);
  const edit = (e: OnClick, code: string) => {
    e.preventDefault();
    navigate(`${code}`);
  };

  const filter = value(state.filter);
  return (
    <div className='view-container'>
      <header>
        <h2>{resource.locale_list}</h2>
        <div className='btn-group'>
          {component.view !== 'table' && <button type='button' id='btnTable' name='btnTable' className='btn-table' data-view='table' onClick={changeView} />}
          {component.view === 'table' && <button type='button' id='btnListView' name='btnListView' className='btn-list-view' data-view='listview' onClick={changeView} />}
          {canWrite && <Link id='btnNew' className='btn-new' to='new'/>}
        </div>
      </header>
      <div>
        <form id='localesForm' name='localesForm' noValidate={true} ref={refForm as any}>
          <section className='row search-group'>
            <label className='col s12 m6 search-input'>
              <PageSizeSelect size={component.pageSize} sizes={component.pageSizes} onChange={pageSizeChanged} />
              <input type='text' id='q' name='q' value={filter.q || ''} onChange={updateState} maxLength={255} placeholder={resource.keyword}/>
              <button type='button' hidden={!filter.q} className='btn-remove-text' onClick={clearQ}/>
              <button type='submit' className='btn-search' onClick={search}/>
            </label>
            <Pagination className='col s12 m6' total={component.total} size={component.pageSize} max={component.pageMaxSize} page={component.pageIndex} onChange={pageChanged} />
          </section>
        </form>
        <form className='list-result'>
          {component.view === 'table' && <div className='table-responsive'>
            <table>
              <thead>
                <tr>
                  <th>{resource.sequence}</th>
                  <th data-field='code'><button type='button' id='sortCode' onClick={sort}>{resource.locale_code}</button></th>
                  <th data-field='name'><button type='button' id='sortName' onClick={sort}>{resource.locale_name}</button></th>
                  <th data-field='nativeName'><button type='button' id='sortNativeName' onClick={sort}>{resource.locale_native_name}</button></th>
                  <th data-field='countryName'><button type='button' id='sortCountryName' onClick={sort}>{resource.country_name}</button></th>
                  <th data-field='nativeCountryName'><button type='button' id='sortNativeCountryName' onClick={sort}>{resource.country_native_name}</button></th>
                  <th data-field='dateFormat'><button type='button' id='sortDateFormat' onClick={sort}>{resource.country_native_name}</button></th>
                  <th data-field='decimalSeparator'><button type='button' id='sortDecimalSeparator' onClick={sort}>{resource.decimal_separator}</button></th>
                  <th data-field='groupSeparator'><button type='button' id='sortGroupSeparator' onClick={sort}>{resource.group_separator}</button></th>
                  <th data-field='currencyCode'><button type='button' id='sortCurrencyCode' onClick={sort}>{resource.currency_code}</button></th>
                  <th data-field='currencySymbol'><button type='button' id='sortCurrencySymbol' onClick={sort}>{resource.currency_symbol}</button></th>
                  <th data-field='currencyDecimalDigits'><button type='button' id='sortCurrencyDecimalDigits' onClick={sort}>{resource.currency_decimal_digits}</button></th>
                  <th data-field='currencyPattern'><button type='button' id='sortCurrencyPattern' onClick={sort}>{resource.currency_pattern}</button></th>
                  <th data-field='currencySample'><button type='button' id='sortCurrencySample' onClick={sort}>{resource.currency_sample}</button></th>
                </tr>
              </thead>
              <tbody>
                {state.list && state.list.length > 0 && state.list.map((item, i) => {
                  return (
                    <tr key={i} onClick={e => edit(e, item.code)}>
                      <td className='text-right'>{(item as any).sequenceNo}</td>
                      <td><Link to={`${item.code}`}>{item.code}</Link></td>
                      <td>{item.name}</td>
                      <td>{item.nativeName}</td>
                      <td>{item.countryName}</td>
                      <td>{item.nativeCountryName}</td>
                      <td>{item.dateFormat}</td>
                      <td>{item.decimalSeparator}</td>
                      <td>{item.groupSeparator}</td>
                      <td>{item.currencyCode}</td>
                      <td>{item.currencySymbol}</td>
                      <td>{item.currencyDecimalDigits}</td>
                      <td>{item.currencyPattern}</td>
                      <td>{item.currencySample}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>}
          {component.view !== 'table' && <ul className='row list-view'>
            {state.list && state.list.length > 0 && state.list.map((item, i) => {
              return (
                <li key={i} className='col s6 m4 l3 xl2' onClick={e => edit(e, item.code)}>
                  <section>
                    <div>
                      <h3><Link to={`${item.code}`}>{item.code} {item.name} ({item.nativeName}</Link></h3>
                      <p className='space-between'>{item.countryName} <span>{item.dateFormat} {item.currencyCode}</span></p>
                    </div>
                    <button className='btn-detail' />
                  </section>
                </li>
              );
            })}
          </ul>}
        </form>
      </div>
    </div>
  );
};
