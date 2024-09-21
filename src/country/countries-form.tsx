import { Item } from "onecore"
import { ChangeEvent, useRef } from "react"
import { OnClick, PageSizeSelect, SearchComponentState, checked, useSearch, value } from "react-hook-core"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Pagination } from "reactx-pagination"
import { getStatusName, hasPermission, inputSearch, write } from "uione"
import { Country, CountryFilter, getCountryService } from "./service"

interface CountrySearch extends SearchComponentState<Country, CountryFilter> {
  statusList: Item[]
}
const countryFilter: CountryFilter = {
  q: "",
}
const countrySearch: CountrySearch = {
  statusList: [],
  list: [],
  filter: countryFilter,
}
export const CountriesForm = () => {
  const navigate = useNavigate()
  const refForm = useRef()
  const { state, resource, component, updateState, doSearch, search, sort, toggleFilter, clearQ, changeView, pageChanged, pageSizeChanged } = useSearch<
    Country,
    CountryFilter,
    CountrySearch
  >(refForm, countrySearch, getCountryService(), inputSearch())
  const canWrite = hasPermission(write)
  const edit = (e: OnClick, code: string) => {
    e.preventDefault()
    navigate(`${code}`)
  }
  const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState(event, (newState) => {
      component.pageIndex = 1
      doSearch({ ...component, ...newState.filter })
    })
  }
  const filter = value(state.filter)
  return (
    <div className="view-container">
      <header>
        <h2>{resource.countries}</h2>
        <div className="btn-group">
          {component.view !== "table" && <button type="button" id="btnTable" name="btnTable" className="btn-table" data-view="table" onClick={changeView} />}
          {component.view === "table" && (
            <button type="button" id="btnListView" name="btnListView" className="btn-list-view" data-view="listview" onClick={changeView} />
          )}
          {canWrite && <Link id="btnNew" className="btn-new" to="new" />}
        </div>
      </header>
      <div>
        <form id="countrysForm" name="countrysForm" noValidate={true} ref={refForm as any}>
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <PageSizeSelect size={component.pageSize} sizes={component.pageSizes} onChange={pageSizeChanged} />
              <input type="text" id="q" name="q" value={filter.q || ""} onChange={updateState} maxLength={255} placeholder={resource.keyword} />
              <button type="button" hidden={!filter.q} className="btn-remove-text" onClick={clearQ} />
              <button type="button" className="btn-filter" onClick={toggleFilter} />
              <button type="submit" className="btn-search" onClick={search} />
            </label>
            <Pagination
              className="col s12 m6"
              total={component.total}
              size={component.pageSize}
              max={component.pageMaxSize}
              page={component.pageIndex}
              onChange={pageChanged}
            />
          </section>
          <section className="row search-group" hidden={component.hideFilter}>
            <label className="col s6 l3">
              {resource.currency_decimal_digits}
              <input
                type="text"
                id="currencyDecimalDigits"
                name="currencyDecimalDigits"
                className="text-right"
                data-type="integer"
                value={filter.currencyDecimalDigits || ""}
                onChange={updateState}
                maxLength={1}
                placeholder={resource.currency_decimal_digits}
              />
            </label>
            <label className="col s6 l3">
              {resource.currency_pattern}
              <input
                type="text"
                id="currencyPattern"
                name="currencyPattern"
                className="text-right"
                data-type="integer"
                value={filter.currencyPattern || ""}
                onChange={updateState}
                maxLength={1}
                placeholder={resource.currency_pattern}
              />
            </label>
            <label className="col s12 m6">
              {resource.status}
              <section className="checkbox-group">
                <label>
                  <input type="checkbox" id="active" name="status" value="A" checked={checked(filter.status, "A")} onChange={checkboxOnChange} />
                  {resource.active}
                </label>
                <label>
                  <input type="checkbox" id="inactive" name="status" value="I" checked={checked(filter.status, "I")} onChange={checkboxOnChange} />
                  {resource.inactive}
                </label>
              </section>
            </label>
          </section>
        </form>
        <form className="list-result">
          {component.view === "table" && (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field="countryCode">
                      <button type="button" id="sortCountryCode" onClick={sort}>
                        {resource.country_code}
                      </button>
                    </th>
                    <th data-field="countryName">
                      <button type="button" id="sortCountryName" onClick={sort}>
                        {resource.country_name}
                      </button>
                    </th>
                    <th data-field="nativeCountryName">
                      <button type="button" id="sortNativeCountryName" onClick={sort}>
                        {resource.country_native_name}
                      </button>
                    </th>
                    <th data-field="decimalSeparator">
                      <button type="button" id="sortDecimalSeparator" onClick={sort}>
                        {resource.decimal_separator}
                      </button>
                    </th>
                    <th data-field="groupSeparator">
                      <button type="button" id="sortGroupSeparator" onClick={sort}>
                        {resource.group_separator}
                      </button>
                    </th>
                    <th data-field="currencyCode">
                      <button type="button" id="sortCurrencyCode" onClick={sort}>
                        {resource.currency_code}
                      </button>
                    </th>
                    <th data-field="currencySymbol">
                      <button type="button" id="sortCurrencySymbol" onClick={sort}>
                        {resource.currency_symbol}
                      </button>
                    </th>
                    <th data-field="currencyDecimalDigits">
                      <button type="button" id="sortCurrencyDecimalDigits" onClick={sort}>
                        {resource.currency_decimal_digits}
                      </button>
                    </th>
                    <th data-field="currencyPattern">
                      <button type="button" id="sortCurrencyPattern" onClick={sort}>
                        {resource.currency_pattern}
                      </button>
                    </th>
                    <th data-field="currencySample">
                      <button type="button" id="sortCurrencySample" onClick={sort}>
                        {resource.currency_sample}
                      </button>
                    </th>
                    <th data-field="status">
                      <button type="button" id="sortStatus" onClick={sort}>
                        {resource.status}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.list &&
                    state.list.length > 0 &&
                    state.list.map((item, i) => {
                      return (
                        <tr key={i} onClick={(e) => edit(e, item.countryCode)}>
                          <td className="text-right">{(item as any).sequenceNo}</td>
                          <td>
                            <Link to={`${item.countryCode}`}>{item.countryCode}</Link>
                          </td>
                          <td>{item.countryName}</td>
                          <td>{item.nativeCountryName}</td>
                          <td>{item.decimalSeparator}</td>
                          <td>{item.groupSeparator}</td>
                          <td>{item.currencyCode}</td>
                          <td>{item.currencySymbol}</td>
                          <td>{item.currencyDecimalDigits}</td>
                          <td>{item.currencyPattern}</td>
                          <td>{item.currencySample}</td>
                          <td>{getStatusName(item.status)}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
          {component.view !== "table" && (
            <ul className="row list-view">
              {state.list &&
                state.list.length > 0 &&
                state.list.map((item, i) => {
                  return (
                    <li key={i} className="col s12 m6 l3 xl4" onClick={(e) => edit(e, item.countryCode)}>
                      <section>
                        <div>
                          <h4>
                            <Link to={`${item.countryCode}`}>
                              {item.countryCode} - {item.currencyCode}
                            </Link>
                          </h4>
                          <p className="space-between">
                            {item.countryName} <span>{item.currencySymbol}</span>
                          </p>
                        </div>
                        <button className="btn-detail" />
                      </section>
                    </li>
                  )
                })}
            </ul>
          )}
        </form>
      </div>
    </div>
  )
}
