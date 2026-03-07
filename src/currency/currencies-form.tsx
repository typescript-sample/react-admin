import { Item } from "onecore"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { addParametersIntoUrl, buildFromUrl, buildMessage, buildSortFilter, ButtonMouseEvent, checked, getFields, getOffset, handleToggle, mergeFilter, onPageChanged, onPageSizeChanged, onSearch, onSort, PageChange, pageSizes, resources, setSort, Sortable, updateState } from "react-hook-core"
import { Link } from "react-router-dom"
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

const sizes = pageSizes
export const CurrenciesForm = () => {
  const canWrite = hasPermission(Permission.write)

  const currencyFilter: CurrencyFilter = {
    limit: resources.defaultLimit,
    status: [],
  }
  const initialState: CurrencySearch = {
    statusList: [],
  }

  const resource = useResource()
  const refForm = useRef<HTMLFormElement>(null)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [state, setState] = useState<CurrencySearch>(initialState)
  const [filter, setFilter] = useState<CurrencyFilter>(currencyFilter)
  const [list, setList] = useState<Currency[]>([])

  useEffect(() => {
    const initFilter = mergeFilter(buildFromUrl<CurrencyFilter>(), filter, sizes, ["status"])
    setSort(state, filter.sort)
    setFilter(initFilter)
    search(true) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sort = (e: ButtonMouseEvent) => onSort(e, search, state)
  const pageSizeChanged = (e: ChangeEvent<HTMLSelectElement>) => onPageSizeChanged(e, search, filter, setFilter)
  const pageChanged = (data: PageChange) => onPageChanged(data, search, filter, setFilter)
  const searchOnClick = (e: ButtonMouseEvent) => onSearch(e, search, filter, state, setFilter, setState)

  const search = (isFirstLoad?: boolean) => {
    showLoading()
    const urlFilter = buildSortFilter(filter, state)
    addParametersIntoUrl(urlFilter, isFirstLoad)
    const fields = getFields(refForm.current, state.fields)
    setFilter(urlFilter)
    const { limit, page } = urlFilter
    getCurrencyService()
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
      <div className="search-body">
        <form id="currencysForm" name="currencysForm" className="form" noValidate={true} ref={refForm as any}>
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
                maxLength={255}
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
            <label className="col s12 m6">
              {resource.currency_decimal_digits}
              <input
                type="text"
                id="decimalDigits"
                name="decimalDigits"
                className="text-right"
                data-type="integer"
                value={filter.decimalDigits?.toString()}
                onChange={(e) => updateState(e, filter, setFilter)}
                maxLength={1}
                placeholder={resource.currency_decimal_digits}
              />
            </label>
            <label className="col s12 m6">
              {resource.status}
              <section className="checkbox-group">
                <label>
                  <input type="checkbox" id="active" name="status" value="A" checked={checked(filter.status, "A")} onChange={(e) => updateState(e, filter, setFilter)} />
                  {resource.active}
                </label>
                <label>
                  <input type="checkbox" id="inactive" name="status" value="I" checked={checked(filter.status, "I")} onChange={(e) => updateState(e, filter, setFilter)} />
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
                  <th>{resource.sequence}</th>
                  <th data-field="code">
                    <button type="button" id="sortCode" onClick={sort}>
                      {resource.currency_code}
                    </button>
                  </th>
                  <th data-field="symbol">
                    <button type="button" id="sortSymbol" onClick={sort}>
                      {resource.currency_symbol}
                    </button>
                  </th>
                  <th data-field="decimalDigits">
                    <button type="button" id="sortDecimalDigits" onClick={sort}>
                      {resource.currency_decimal_digits}
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
