import { Item } from "onecore"
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import {
  buildFromUrl,
  buildMessage,
  checked,
  getFields,
  getOffset,
  mergeFilter,
  onClearQ,
  onPageChanged,
  onPageSizeChanged,
  onSearch,
  onSort,
  onToggleSearch,
  PageChange,
  pageSizes,
  PageSizeSelect,
  resetSearch,
  resources,
  setSortFilter,
  Sortable,
  updateState,
  updateUrl,
} from "react-hook-core"
import { Link } from "react-router"
import { Pagination } from "reactx-pagination"
import { hideLoading, showLoading } from "ui-loading"
import { toast } from "ui-toast"
import { getStatusName, handleError, hasPermission, Permission, useResource } from "uione"
import { Currency, CurrencyFilter, getCurrencyService } from "./service"

interface CurrencySearch extends Sortable {
  statusList: Item[]
  total?: number
  view?: string
  fields?: string[]
}

export const CurrenciesForm = () => {
  const canWrite = hasPermission(Permission.write)

  const currencyFilter: CurrencyFilter = {
    limit: resources.defaultLimit,
    status: ["A"],
  }
  const initialState: CurrencySearch = {
    statusList: [],
  }

  const resource = useResource()
  const refForm = useRef<HTMLFormElement>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [list, setList] = useState<Currency[]>([])
  const [state, setState] = useState<CurrencySearch>(initialState)
  const [filter, setFilter] = useState<CurrencyFilter>(currencyFilter)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => updateState(e, filter, setFilter)
  const statusOnChange = (e: ChangeEvent<HTMLInputElement>) => resetSearch(e, filter, setFilter, search)

  useEffect(() => {
    const initFilter = mergeFilter(buildFromUrl<CurrencyFilter>(), filter, pageSizes, ["status"])
    setSortFilter(state, initFilter, setFilter)
    search(initFilter, state, true) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearQ = (e: MouseEvent<HTMLButtonElement>) => onClearQ(filter, setFilter)
  const toggleSearch = (e: MouseEvent<HTMLButtonElement>) => onToggleSearch(e, showFilter, setShowFilter)
  const sort = (e: MouseEvent<HTMLButtonElement>) => onSort(e, search, filter, state)
  const pageSizeChanged = (e: ChangeEvent<HTMLSelectElement>) => onPageSizeChanged(e, search, filter)
  const pageChanged = (data: PageChange) => onPageChanged(data, search, filter)
  const searchOnClick = (e: MouseEvent<HTMLButtonElement>) => onSearch(e, search, filter, state)

  const search = (obj: CurrencyFilter, sort?: Sortable, isFirstLoad?: boolean) => {
    showLoading()
    const fields = getFields(refForm.current, state.fields)
    updateUrl(obj, isFirstLoad, setFilter, sort)
    setFilter(obj)
    const { limit, page } = obj
    getCurrencyService()
      .search({ ...obj }, limit, page, fields)
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
        <h2>{resource.currencies}</h2>
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
      <div className="main-body">
        <form id="currencysForm" name="currencysForm" className="form" noValidate={true} ref={refForm}>
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <PageSizeSelect id="limit" name="limit" size={filter.limit} sizes={pageSizes} onChange={pageSizeChanged} />
              <input type="text" id="q" name="q" value={filter.q} maxLength={80} onChange={onChange} placeholder={resource.keyword} />
              <button type="button" id="btnClearQ" hidden={!filter.q} className="btn-remove-text" onClick={clearQ} />
              <button type="button" id="btnToggleSearch" className="btn-filter" onClick={toggleSearch} />
              <button type="submit" id="searchBtn" name="searchBtn" className="btn-search" onClick={searchOnClick} />
            </label>
            <Pagination className="col s12 m6" total={state.total} size={filter.limit} max={7} page={filter.page} onChange={pageChanged} />
          </section>
          <section className="row search-group inline" hidden={!showFilter}>
            <label className="col s12 m6">
              {resource.currency_decimal_digits}
              <input
                type="tel"
                id="decimalDigits"
                name="decimalDigits"
                data-type="integer"
                className="text-right"
                value={filter.decimalDigits?.toString()}
                onChange={onChange}
                maxLength={1}
                placeholder={resource.currency_decimal_digits}
              />
            </label>
            <label className="col s12 m6">
              {resource.status}
              <section className="checkbox-group">
                <label>
                  <input type="checkbox" id="active" name="status" value="A" checked={checked(filter.status, "A")} onChange={statusOnChange} />
                  {resource.active}
                </label>
                <label>
                  <input type="checkbox" id="inactive" name="status" value="I" checked={checked(filter.status, "I")} onChange={statusOnChange} />
                  {resource.inactive}
                </label>
              </section>
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
                    <button type="button" id="codeSort" onClick={sort}>
                      {resource.currency_code}
                    </button>
                  </th>
                  <th data-field="symbol">
                    <button type="button" id="symbolSort" onClick={sort}>
                      {resource.currency_symbol}
                    </button>
                  </th>
                  <th data-field="decimalDigits">
                    <button type="button" id="decimalDigitsSort" onClick={sort}>
                      {resource.currency_decimal_digits}
                    </button>
                  </th>
                  <th data-field="status">
                    <button type="button" id="statusSort" onClick={sort}>
                      {resource.status}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-right">{offset + i + 1}</td>
                        <td>
                          <Link to={`${item.code}`}>{item.code}</Link>
                        </td>
                        <td>{item.symbol}</td>
                        <td className="text-right">{item.decimalDigits}</td>
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
            {list &&
              list.map((item, i) => {
                return (
                  <li key={i} className="col s6 m4 l3 xl2 list-item">
                    <Link to={`${item.code}`}>{item.code}</Link>
                    <button className="btn-detail" />
                    <p>
                      {item.symbol} <span>{item.decimalDigits}</span>
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
