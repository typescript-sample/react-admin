import { Item } from "onecore"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { addParametersIntoUrl, buildFromUrl, buildMessage, buildSortFilter, getFields, getNumber, getOffset, handleToggle, mergeFilter, onSort, PageChange, pageSizes, removeSortStatus, resources, setSort, Sortable, updateState } from "react-hook-core"
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

const sizes = pageSizes
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
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [state, setState] = useState<CountrySearch>(initialState)
  const [filter, setFilter] = useState<CountryFilter>(countryFilter)
  const [list, setList] = useState<Country[]>([])

  useEffect(() => {
    const initFilter = mergeFilter(buildFromUrl<CountryFilter>(), filter, sizes, ["status"])
    setSort(state, filter.sort)
    setFilter(initFilter)
    search(true) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSort(e, search, state, setState)
  const pageSizeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    filter.page = 1
    filter.limit = getNumber(e)
    setFilter(filter)
    search()
  }
  const pageChanged = (data: PageChange) => {
    const { page, size } = data
    filter.page = page
    filter.limit = size
    setFilter(filter)
    search()
  }
  const searchOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    removeSortStatus(state.sortTarget)
    filter.page = 1
    state.sortTarget = undefined
    state.sortField = undefined
    setFilter(filter)
    setState(state)
    search()
  }

  const search = (isFirstLoad?: boolean) => {
    showLoading()
    const urlFilter = buildSortFilter(filter, state)
    addParametersIntoUrl(urlFilter, isFirstLoad)
    const fields = getFields(refForm.current, state.fields)
    setFilter(urlFilter)
    const { limit, page } = urlFilter
    getCountryService()
      .search(urlFilter, limit, page, fields)
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
        <form id="countrysForm" name="countrysForm" className="form" noValidate={true} ref={refForm as any}>
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <select id="limit" name="limit" onChange={pageSizeChanged} defaultValue={filter.limit}>
                {sizes.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              <input
                type="text"
                id="q"
                name="q"
                value={filter.q || ""}
                maxLength={40}
                onChange={(e) => updateState(e, filter, setFilter)}
                placeholder={resource.keyword}
              />
              <button
                type="button"
                hidden={!filter.q}
                className="btn-remove-text"
                onClick={(e) => {
                  filter.q = ""
                  setFilter({ ...filter })
                }}
              />
              <button
                type="button"
                className="btn-filter"
                onClick={(e) => {
                  const toggleFilter = handleToggle(e.target as HTMLElement, showFilter)
                  setShowFilter(toggleFilter)
                }}
              />
              <button type="submit" className="btn-search" onClick={searchOnClick} />
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
