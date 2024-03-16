import { Item } from 'onecore';
import { ChangeEvent, useRef } from 'react';
import { checked, OnClick,  PageSizeSelect, SearchComponentState, useSearch, value } from 'react-hook-core';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Pagination } from 'reactx-pagination';
import { getStatusName, hasPermission, inputSearch, write } from 'uione';
import { getCurrencyService, Currency, CurrencyFilter } from './service';

interface CurrencySearch extends SearchComponentState<Currency, CurrencyFilter> {
  statusList: Item[];
}
const currencyFilter: CurrencyFilter = {
  q: '',
  code: '',
  symbol: '',
  status: [],
};
const currencySearch: CurrencySearch = {
  statusList: [],
  list: [],
  filter: currencyFilter
};
export const CurrenciesForm = () => {
  const navigate = useNavigate();
  const refForm = useRef();
  const { state, resource, component, updateState, doSearch, search, sort, toggleFilter, clearQ, changeView, pageChanged, pageSizeChanged } = useSearch<Currency, CurrencyFilter, CurrencySearch>(refForm, currencySearch, getCurrencyService(), inputSearch());
  const canWrite = hasPermission(write);
  const edit = (e: OnClick, code: string) => {
    e.preventDefault();
    navigate(`${code}`);
  };
  const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState(event, (newState) => {
      component.pageIndex = 1;
      doSearch({ ...component, ...newState.filter});
    });
  }
  const filter = value(state.filter);
  return (
    <div className='view-container'>
      <header>
        <h2>{resource.currency_list}</h2>
        <div className='btn-group'>
          {component.view !== 'table' && <button type='button' id='btnTable' name='btnTable' className='btn-table' data-view='table' onClick={changeView} />}
          {component.view === 'table' && <button type='button' id='btnListView' name='btnListView' className='btn-list-view' data-view='listview' onClick={changeView} />}
          {canWrite && <Link id='btnNew' className='btn-new' to='new'/>}
        </div>
      </header>
      <div>
        <form id='currencysForm' name='currencysForm' noValidate={true} ref={refForm as any}>
          <section className='row search-group'>
            <label className='col s12 m6 search-input'>
              <PageSizeSelect size={component.pageSize} sizes={component.pageSizes} onChange={pageSizeChanged} />
              <input type='text' id='q' name='q' value={filter.q || ''} onChange={updateState} maxLength={255} placeholder={resource.keyword}/>
              <button type='button' hidden={!filter.q} className='btn-remove-text' onClick={clearQ}/>
              <button type='button' className='btn-filter' onClick={toggleFilter}/>
              <button type='submit' className='btn-search' onClick={search}/>
            </label>
            <Pagination className='col s12 m6' total={component.total} size={component.pageSize} max={component.pageMaxSize} page={component.pageIndex} onChange={pageChanged} />
          </section>
          <section className='row search-group inline' hidden={component.hideFilter}>
            <label className='col s12 m6'>
              {resource.currency_decimal_digits}
              <input type='text'
                id='decimalDigits'
                name='decimalDigits'
                className='text-right'
                data-type='integer'
                value={filter.decimalDigits || ''}
                onChange={updateState}
                maxLength={1}
                placeholder={resource.currency_decimal_digits} />
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
                    checked={checked(filter.status, 'A')}
                    onChange={checkboxOnChange} />
                  {resource.active}
                </label>
                <label>
                  <input
                    type='checkbox'
                    id='inactive'
                    name='status'
                    value='I'
                    checked={checked(filter.status, 'I')}
                    onChange={checkboxOnChange} />
                  {resource.inactive}
                </label>
              </section>
            </label>
          </section>
        </form>
        <form className='list-result'>
          {component.view === 'table' && <div className='table-responsive'>
            <table>
              <thead>
                <tr>
                  <th>{resource.sequence}</th>
                  <th data-field='code'><button type='button' id='sortCode' onClick={sort}>{resource.currency_code}</button></th>
                  <th data-field='symbol'><button type='button' id='sortSymbol' onClick={sort}>{resource.currency_symbol}</button></th>
                  <th data-field='decimalDigits'><button type='button' id='sortDecimalDigits' onClick={sort}>{resource.currency_decimal_digits}</button></th>
                  <th data-field='status'><button type='button' id='sortStatus' onClick={sort}>{resource.status}</button></th>
                </tr>
              </thead>
              <tbody>
                {state.list && state.list.length > 0 && state.list.map((item, i) => {
                  return (
                    <tr key={i} onClick={e => edit(e, item.code)}>
                      <td className='text-right'>{(item as any).sequenceNo}</td>
                      <td><Link to={`${item.code}`}>{item.code}</Link></td>
                      <td>{item.symbol}</td>
                      <td className='text-right'>{item.decimalDigits}</td>
                      <td>{getStatusName(item.status)}</td>
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
                      <h4><Link to={`${item.code}`}>{item.code}</Link></h4>
                      <p>{item.symbol} <span>{item.decimalDigits}</span></p>
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
