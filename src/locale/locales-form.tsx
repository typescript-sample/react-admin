import { Item } from "onecore"
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { addParametersIntoUrl, buildFromUrl, buildMessage, buildSortFilter, getFields, getOffset, mergeFilter, onClearQ, onPageChanged, onPageSizeChanged, onSearch, onSort, onToggleSearch, PageChange, pageSizes, PageSizeSelect, resources, setSort, Sortable, updateState } from "react-hook-core"
import { Link } from "react-router-dom"
import { Pagination } from "reactx-pagination"
import { hideLoading, showLoading } from "ui-loading"
import { toast } from "ui-toast"
import { handleError, hasPermission, Permission, useResource } from "uione"
import { getLocaleService, Locale, LocaleFilter } from "./service"

interface LocaleSearch extends Sortable {
  statusList: Item[]
  total?: number
  view?: string
  fields?: string[]
}

export const LocalesForm = () => {
  const canWrite = hasPermission(Permission.write)

  const localeFilter: LocaleFilter = {
    limit: resources.defaultLimit,
    code: "",
    name: "",
    dateFormat: "",
  }
  const initialState: LocaleSearch = {
    statusList: [],
  }

  const resource = useResource()
  const refForm = useRef<HTMLFormElement>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [list, setList] = useState<Locale[]>([])
  const [state, setState] = useState<LocaleSearch>(initialState)
  const [filter, setFilter] = useState<LocaleFilter>(localeFilter)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => updateState(e, filter, setFilter)

  useEffect(() => {
    const initFilter = mergeFilter(buildFromUrl<LocaleFilter>(), filter, pageSizes, ["status"])
    setSort(state, filter.sort)
    setFilter(initFilter)
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
    const urlFilter = buildSortFilter(filter, state)
    addParametersIntoUrl(urlFilter, isFirstLoad)
    const fields = getFields(refForm.current, state.fields)
    setFilter(filter)
    const { limit, page } = filter
    getLocaleService()
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
        <h2>{resource.locales}</h2>
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
        <form id="localesForm" name="localesForm" className="form" noValidate={true} ref={refForm}>
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
          <section className="row search-group" hidden={!showFilter}>
            <label className="col s6 l3">
              {resource.date_format}
              <input
                type="text"
                id="dateFormat"
                name="dateFormat"
                value={filter.dateFormat}
                onChange={(e) => updateState(e, filter, setFilter)}
                maxLength={12}
                placeholder={resource.date_format}
              />
            </label>
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
            <label className="col s6 l3">
              {resource.first_day_of_week}
              <input
                type="text"
                id="groupSeparator"
                name="groupSeparator"
                className="text-right"
                data-type="int"
                value={filter.groupSeparator?.toString()}
                onChange={(e) => updateState(e, filter, setFilter)}
                maxLength={1}
                placeholder={resource.first_day_of_week}
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
                  <th data-field="code">
                    <button type="button" id="sortCode" onClick={sort}>
                      {resource.locale_code}
                    </button>
                  </th>
                  <th data-field="name">
                    <button type="button" id="sortName" onClick={sort}>
                      {resource.locale_name}
                    </button>
                  </th>
                  <th data-field="nativeName">
                    <button type="button" id="sortNativeName" onClick={sort}>
                      {resource.locale_native_name}
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
                  <th data-field="dateFormat">
                    <button type="button" id="sortDateFormat" onClick={sort}>
                      {resource.date_format}
                    </button>
                  </th>
                  <th data-field="firstDayOfWeek">
                    <button type="button" id="sortFirstDayOfWeek" onClick={sort}>
                      {resource.first_day_of_week}
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
                </tr>
              </thead>
              <tbody>
                {list && list.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-right">{offset + i + 1}</td>
                      <td>
                        {item.code}
                      </td>
                      <td><Link to={`${item.code}`}>{item.name}</Link></td>
                      <td>{item.nativeName}</td>
                      <td>{item.countryName}</td>
                      <td>{item.nativeCountryName}</td>
                      <td>{item.dateFormat}</td>
                      <td>{item.firstDayOfWeek}</td>
                      <td>{item.decimalSeparator}</td>
                      <td>{item.groupSeparator}</td>
                      <td>{item.currencyCode}</td>
                      <td>{item.currencySymbol}</td>
                      <td>{item.currencyDecimalDigits}</td>
                      <td>{item.currencyPattern}</td>
                      <td>{item.currencySample}</td>
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
                <li key={i} className="col s12 m6 l4 xl3 list-item">
                  <Link to={`${item.code}`}>
                    {item.code} - {item.name}
                  </Link>
                  <button className="btn-detail" />
                  <p className="space-between">
                    {item.nativeName}{" "}
                    <span>
                      {item.dateFormat} {item.currencyCode}
                    </span>
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
