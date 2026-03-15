import { Item } from "onecore"
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { addParametersIntoUrlWithSort, buildFromUrl, buildMessage, getFields, getOffset, mergeFilter, onClearQ, onPageChanged, onPageSizeChanged, onSearch, onSort, onToggleSearch, PageChange, pageSizes, PageSizeSelect, resources, setSortFilter, Sortable, updateState } from "react-hook-core"
import { Link } from "react-router-dom"
import { Pagination } from "reactx-pagination"
import { hideLoading, showLoading } from "ui-loading"
import { toast } from "ui-toast"
import { getStatusName, handleError, hasPermission, Permission, useResource } from "uione"
import { Country, CountryFilter, getCountryService } from "./service"

interface CountrySearch extends Sortable {
  statusList: Item[]
  total?: number
  view?: string
  fields?: string[]
}

export const CountriesForm = () => {
  const canWrite = hasPermission(Permission.write)

  const countryFilter: CountryFilter = {
    limit: resources.defaultLimit,
  }
  const initialState: CountrySearch = {
    statusList: [],
  }

  const resource = useResource()
  const refForm = useRef<HTMLFormElement>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [state, setState] = useState<CountrySearch>(initialState)
  const [list, setList] = useState<Country[]>([])
  const [filter, setFilter] = useState<CountryFilter>(countryFilter)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => updateState(e, filter, setFilter)

  useEffect(() => {
    const initFilter = mergeFilter(buildFromUrl<CountryFilter>(), filter, pageSizes, ["status"])
    setSortFilter(initFilter, state, setFilter)
    search(true) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearQ = (e: MouseEvent<HTMLButtonElement>) => onClearQ(filter, setFilter)
  const toggleSearch = (e: MouseEvent<HTMLButtonElement>) => onToggleSearch(e, showFilter, setShowFilter)
  const sort = (e: MouseEvent<HTMLButtonElement>) => onSort(e, search, state)
  const pageSizeChanged = (e: ChangeEvent<HTMLSelectElement>) => onPageSizeChanged(e, search, filter, setFilter)
  const pageChanged = (data: PageChange) => onPageChanged(data, search, filter, setFilter)
  const searchOnClick = (e: MouseEvent<HTMLButtonElement>) => onSearch(e, search, filter, state, setFilter, setState)

  const search = (isFirstLoad?: boolean) => {
    showLoading()
    const fields = getFields(refForm.current, state.fields)
    addParametersIntoUrlWithSort(filter, state, isFirstLoad, setFilter)
    const { limit, page } = filter
    getCountryService()
      .search({ ...filter }, limit, page, fields)
      .then((res) => {
        setState({ ...state, total: res.total, fields })
        setList(res.list)
        toast(buildMessage(resource, res.list, limit, page, res.total))
      })
      .catch(handleError)
      .finally(hideLoading)
  }

  const offset = getOffset(filter.limit, filter.page)
  return (
    <div>
      <header>
        <h2>{resource.countries}</h2>
        <div className="btn-group">
          {state.view === "list" && (
            <button type="button" id="btnTable" name="btnTable" className="btn-table" onClick={(e) => setState({ ...state, view: "table" })} />
          )}
          {state.view !== "list" && (
            <button type="button" id="btnListView" name="btnListView" className="btn-list" onClick={(e) => setState({ ...state, view: "list" })} />
          )}
          {canWrite && <Link id="btnNew" className="btn-new" to="new" />}
        </div>
      </header>
      <div className="search-body">
        <form id="countrysForm" name="countrysForm" className="form" noValidate={true} ref={refForm}>
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <PageSizeSelect id="limit" name="limit" size={filter.limit} sizes={pageSizes} onChange={pageSizeChanged} />
              <input type="text" id="q" name="q" value={filter.q} maxLength={80} onChange={onChange} placeholder={resource.keyword} />
              <button type="button" id="btnClearQ" hidden={!filter.q} className="btn-remove-text" onClick={clearQ} />
              <button type="button" id="btnToggleSearch" className="btn-filter" onClick={toggleSearch} />
              <button type="submit" id="btnSearch" className="btn-search" onClick={searchOnClick} />
            </label>
            <Pagination className="col s12 m6" total={state.total} size={filter.limit} max={7} page={filter.page} onChange={pageChanged} />
          </section>
          <section className="row search-group inline" hidden={!showFilter}>
            <label className="col s6 l3">
              {resource.currency_decimal_digits}
              <input
                type="text"
                id="currencyDecimalDigits"
                name="currencyDecimalDigits"
                className="text-right"
                data-type="int"
                value={filter.currencyDecimalDigits?.toString()}
                onChange={(e) => updateState(e, filter, setFilter)}
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
                data-type="int"
                value={filter.currencyPattern?.toString()}
                onChange={(e) => updateState(e, filter, setFilter)}
                maxLength={1}
                placeholder={resource.currency_pattern}
              />
            </label>
          </section>
        </form>
        {state.view !== "list" && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>{resource.number}</th>
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
                {list && list.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-right">{offset + i + 1}</td>
                      <td>
                        {item.countryCode}
                      </td>
                      <td><Link to={`${item.countryCode}`}>{item.countryName}</Link></td>
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
        {state.view === "list" && (
          <ul className="row list">
            {list && list.map((item, i) => {
              return (
                <li key={i} className="col s12 m6 l3 xl4 list-item">
                  <Link to={`${item.countryCode}`}>
                    {item.countryCode} - {item.currencyCode}
                  </Link>
                  <button className="btn-detail" />
                  <p className="space-between">
                    {item.countryName} <span>{item.currencySymbol}</span>
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
