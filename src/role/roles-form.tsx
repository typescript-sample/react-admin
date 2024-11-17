import { Item } from "onecore"
import { ChangeEvent, useEffect, useRef } from "react"
import {
  OnClick,
  PageChange,
  PageSizeSelect,
  SearchComponentState,
  addParametersIntoUrl,
  buildFromUrl,
  buildMessage,
  checked,
  getFieldsFromForm,
  getOffset,
  handleSort,
  handleToggle,
  initFilter,
  mergeFilter,
  removeSortStatus,
  resources,
  showPaging,
  useMergeState,
  value,
} from "react-hook-core"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Pagination } from "reactx-pagination"
import { hideLoading, showLoading } from "ui-loading"
import { getStatusName, handleError, hasPermission, inputSearch, showMessage, write } from "uione"
import { Role, RoleFilter, getRoleService } from "./service"

interface RoleSearch extends SearchComponentState<Role, RoleFilter> {
  statusList: Item[]
}
const roleFilter: RoleFilter = {
  limit: resources.limit,
  q: "",
  roleId: "",
  roleName: "",
  status: [],
  remark: "",
}

export const RolesForm = () => {
  const initialState: RoleSearch = {
    pageSize: resources.limit,
    statusList: [],
    list: [],
    filter: roleFilter,
  }
  const navigate = useNavigate()
  const refForm = useRef()
  const sp = inputSearch()
  const resource = sp.resource.resource()
  const [state, setState] = useMergeState<SearchComponentState<Role, RoleFilter>>(initialState)
  const canWrite = hasPermission(write)
  useEffect(() => {
    const filter = mergeFilter(buildFromUrl<RoleFilter>(), state.filter, state.pageSizes, ["status", "userType"])
    initFilter(filter, state)
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const sort = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (event && event.target) {
      const target = event.target as any
      const s = handleSort(target, state.sortTarget, state.sortField, state.sortType)
      setState({
        sortField: s.field,
        sortType: s.type,
        sortTarget: target,
      })
      state.sortField = s.field
      state.sortType = s.type
      state.sortTarget = target
    }
    search()
  }
  const pageSizeChanged = (event: any) => {
    const size = parseInt(event.currentTarget.value, 10)
    state.pageSize = size
    state.pageIndex = 1
    state.tmpPageIndex = 1
    // setState({
    //   pageSize: size,
    //   pageIndex: 1,
    //   tmpPageIndex: 1
    // });
    search()
  }
  const pageChanged = (data: PageChange) => {
    const { page, size } = data
    // setState({ pageIndex: page, pageSize: size, append: false });
    state.pageIndex = page
    state.pageSize = size
    state.append = false
    search()
  }
  const searchOnClick = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (event) {
      event.preventDefault()
    }
    setState({ pageIndex: 1, tmpPageIndex: 1 })
    removeSortStatus(state.sortTarget)
    setState({
      sortTarget: undefined,
      sortField: undefined,
      append: false,
      pageIndex: 1,
    })
    state.sortTarget = undefined
    state.sortField = undefined
    state.append = false
    state.pageIndex = 1
    search()
  }
  const search = (isFirstLoad?: boolean) => {
    showLoading()
    const filter = value(state.filter)
    state.fields = getFieldsFromForm(state.fields, state.initFields, refForm.current)
    const offset = getOffset(value(state.pageSize), state.pageIndex)
    // buildSort(filter, state)
    addParametersIntoUrl(filter, isFirstLoad)
    getRoleService()
      .search(filter, state.pageSize, offset, state.fields)
      .then((res) => {
        setState({ list: res.list })
        showPaging(state, res.list, state.pageSize, res.total)
        showMessage(buildMessage(resource, res.list, filter.limit, filter.page, res.total))
      })
      .catch(handleError)
      .finally(hideLoading)
  }
  const edit = (e: OnClick, id: string) => {
    e.preventDefault()
    navigate(`${id}`)
  }
  const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    state.pageIndex = 1
    search()
  }
  const changeView = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event && event.target) {
      const target = event.target as any
      const v: string = target.getAttribute("data-view")
      if (v && v.length > 0) {
        setState({ view: v })
      }
    }
  }
  const toggleFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const x = !state.hideFilter
    handleToggle(event.target as HTMLInputElement, !x)
    setState({ hideFilter: x })
  }
  const updateQ = (event: ChangeEvent<HTMLInputElement>) => {
    filter.q = event.target.value
    setState({ ...state, filter })
  }
  const clearQ = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault()
    }
    let f = value(state.filter)
    f.q = ""
    setState({ filter: f })
  }
  const filter = value(state.filter)
  return (
    <div className="view-container">
      <header>
        <h2>{resource.roles}</h2>
        <div className="btn-group">
          {state.view !== "table" && <button type="button" id="btnTable" name="btnTable" className="btn-table" data-view="table" onClick={changeView} />}
          {state.view === "table" && (
            <button type="button" id="btnListView" name="btnListView" className="btn-list-view" data-view="listview" onClick={changeView} />
          )}
          {canWrite && <Link id="btnNew" className="btn-new" to="new" />}
        </div>
      </header>
      <div>
        <form id="rolesForm" name="rolesForm" noValidate={true} ref={refForm as any}>
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <PageSizeSelect size={state.pageSize} sizes={state.pageSizes} onChange={pageSizeChanged} />
              <input type="text" id="q" name="q" value={filter.q || ""} onChange={updateQ} maxLength={255} placeholder={resource.keyword} />
              <button type="button" hidden={!filter.q} className="btn-remove-text" onClick={clearQ} />
              <button type="button" className="btn-filter" onClick={toggleFilter} />
              <button type="submit" className="btn-search" onClick={searchOnClick} />
            </label>
            <Pagination
              className="col s12 m6"
              total={state.total}
              size={state.pageSize}
              max={state.pageMaxSize}
              page={state.pageIndex}
              onChange={pageChanged}
            />
          </section>
          <section className="row search-group inline" hidden={state.hideFilter}>
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
          {state.view === "table" && (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field="roleId">
                      <button type="button" id="sortRoleId" onClick={sort}>
                        {resource.role_id}
                      </button>
                    </th>
                    <th data-field="roleName">
                      <button type="button" id="sortRoleName" onClick={sort}>
                        {resource.role_name}
                      </button>
                    </th>
                    <th data-field="remark">
                      <button type="button" id="sortRemark" onClick={sort}>
                        {resource.remark}
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
                        <tr key={i} onClick={(e) => edit(e, item.roleId)}>
                          <td className="text-right">{(item as any).sequenceNo}</td>
                          <td>{item.roleId}</td>
                          <td>
                            <Link to={`${item.roleId}`}>{item.roleName}</Link>
                          </td>
                          <td>{item.remark}</td>
                          <td>{getStatusName(item.status, resource)}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
          {state.view !== "table" && (
            <ul className="row list-view">
              {state.list &&
                state.list.length > 0 &&
                state.list.map((item, i) => {
                  return (
                    <li key={i} className="col s12 m6 l4 xl3" onClick={(e) => edit(e, item.roleId)}>
                      <section>
                        <div>
                          <h4 className={item.status === "I" ? "inactive" : ""}>
                            <Link to={`${item.roleId}`}>{item.roleName}</Link>
                          </h4>
                          <p>{item.remark}</p>
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
