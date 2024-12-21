import { Item } from "onecore"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import {
  buildFromUrl,
  buildMessage,
  buildSortFilter,
  getFields,
  getNumber,
  getSortElement,
  handleSort,
  handleToggle,
  mergeFilter,
  OnClick,
  PageChange,
  pageSizes,
  removeSortStatus,
  setSort,
  Sortable,
  value,
} from "react-hook-core"
import ReactModal from "react-modal"
import Pagination from "reactx-pagination"
import { hideLoading, showLoading } from "ui-loading"
import { toast } from "ui-toast"
import { handleError, inputSearch } from "uione"
import { getUserService, User, UserFilter } from "../service"

ReactModal.setAppElement("#root")
interface Props {
  isOpenModel: boolean
  users: User[]
  onModelClose?: (e: React.MouseEvent | KeyboardEvent) => void
  onModelSave: (e: User[]) => void
}

interface UserSearch extends Sortable {
  statusList: Item[]
  filter: UserFilter
  list: User[]
  total?: number
  view?: string
  hideFilter?: boolean
  fields?: string[]
  users: User[]
  availableUsers: User[]
}
const userFilter: UserFilter = {
  limit: 24,
  userId: "",
  username: "",
  displayName: "",
  status: [],
  email: "",
  q: "",
}

const sizes = pageSizes
export const UsersLookup = (props: Props) => {
  const initialState: UserSearch = {
    statusList: [],
    list: [],
    filter: userFilter,
    users: [],
    availableUsers: [],
  }
  const refForm = useRef()
  const sp = inputSearch()
  const resource = sp.resource.resource()
  const [state, setState] = useState<UserSearch>(initialState)

  const isOpenModel = props.isOpenModel
  const users = props.users ? props.users : []
  let index = 0

  useEffect(() => {
    const filter = mergeFilter(buildFromUrl<UserFilter>(), state.filter, sizes, ["status", "userType"])
    setSort(state, filter.sort)
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const sort = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = getSortElement(event.target as HTMLElement)
    const sort = handleSort(target, state.sortTarget, state.sortField, state.sortType)
    state.sortField = sort.field
    state.sortType = sort.type
    state.sortTarget = target
    search()
  }
  const pageSizeChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    state.filter.page = 1
    state.filter.limit = getNumber(event)
    search()
  }
  const pageChanged = (data: PageChange) => {
    const { page, size } = data
    state.filter.page = page
    state.filter.limit = size
    search()
  }
  const searchOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault()
    removeSortStatus(state.sortTarget)
    state.filter.page = 1
    state.sortTarget = undefined
    state.sortField = undefined
    search()
  }
  const limit = state.filter.limit
  const page = state.filter.page
  const search = (isFirstLoad?: boolean) => {
    showLoading()
    const filter = buildSortFilter(state.filter, state)
    const fields = getFields(refForm.current, state.fields)
    getUserService()
      .search(filter, limit, page, fields)
      .then((res) => {
        setState({ ...state, filter: state.filter, list: res.list, total: res.total, fields })
        toast(buildMessage(resource, res.list, limit, page, res.total))
      })
      .catch(handleError)
      .finally(hideLoading)
  }
  const onCheckUser = (e: OnClick) => {
    const listState = state.list
    const usersState = state.users
    const target: HTMLInputElement = e.target as HTMLInputElement
    const result = listState ? listState.find((v: any) => v.userId === target.value) : undefined
    if (result) {
      const indexCheck = usersState.indexOf(result)
      if (indexCheck !== -1) {
        delete usersState[indexCheck]
      } else {
        usersState.push(result)
      }
      setState({ ...state, users: usersState })
    }
  }

  const onModelSave = () => {
    setState({
      ...state,
      users: [],
      availableUsers: [],
      filter: userFilter,
    })
    props.onModelSave(state.users)
  }

  const onModelClose = (e: React.MouseEvent | KeyboardEvent) => {
    setState({
      ...state,
      users: [],
      availableUsers: [],
      filter: userFilter,
    })
    if (props.onModelClose) {
      props.onModelClose(e)
    }
  }

  const { list } = state
  const filter = value(state.filter)
  return (
    <ReactModal
      isOpen={isOpenModel}
      onRequestClose={onModelClose}
      contentLabel="Modal"
      // portalClassName='modal-portal'
      className="modal-portal-content"
      bodyOpenClassName="modal-portal-open"
      overlayClassName="modal-portal-backdrop"
    >
      <div className="view-container">
        <header>
          <h2>{resource.users_lookup}</h2>
          <div className="btn-group">
            {state.view !== "table" && (
              <button
                type="button"
                id="btnTable"
                name="btnTable"
                className="btn-table"
                data-view="table"
                onClick={(e) => setState({ ...state, view: "table" })}
              />
            )}
            {state.view === "table" && (
              <button
                type="button"
                id="btnListView"
                name="btnListView"
                className="btn-list-view"
                data-view="listview"
                onClick={(e) => setState({ ...state, view: "" })}
              />
            )}
          </div>
          <button type="button" id="btnClose" name="btnClose" className="btn-close" onClick={onModelClose} />
        </header>
        <div>
          <form id="usersLookupForm" name="usersLookupForm" className="usersLookupForm" noValidate={true} ref={refForm as any}>
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
                  onChange={(e) => {
                    filter.q = e.target.value
                    setState({ ...state, filter })
                  }}
                  placeholder={resource.keyword}
                />
                <button
                  type="button"
                  hidden={!filter.q}
                  className="btn-remove-text"
                  onClick={(e) => {
                    filter.q = ""
                    setState({ ...state, filter })
                  }}
                />
                <button
                  type="button"
                  className="btn-filter"
                  onClick={(e) => {
                    const hideFilter = handleToggle(e.target as HTMLElement, state.hideFilter)
                    setState({ ...state, hideFilter })
                  }}
                />
                <button type="submit" className="btn-search" onClick={searchOnClick} />
              </label>
              <Pagination className="col s12 m6" total={state.total} size={state.filter.limit} max={7} page={state.filter.page} onChange={pageChanged} />
            </section>
          </form>
          <form className="list-result">
            {state.view === "table" && (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>{resource.sequence}</th>
                      <th data-field="userId">
                        <button type="button" id="sortUserId" onClick={sort}>
                          {resource.user_id}
                        </button>
                      </th>
                      <th data-field="username">
                        <button type="button" id="sortUsername" onClick={sort}>
                          {resource.username}
                        </button>
                      </th>
                      <th data-field="email">
                        <button type="button" id="sortEmail" onClick={sort}>
                          {resource.email}
                        </button>
                      </th>
                      <th data-field="displayname">
                        <button type="button" id="sortDisplayName" onClick={sort}>
                          {resource.display_name}
                        </button>
                      </th>
                      <th data-field="status">
                        <button type="button" id="sortStatus" onClick={sort}>
                          {resource.status}
                        </button>
                      </th>
                      <th>{resource.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state &&
                      list &&
                      list.map((user: any, i: number) => {
                        const result = users.find((v) => v.userId === user.userId)
                        if (!result) {
                          index++
                          return (
                            <tr key={i}>
                              <td className="text-right">{index}</td>
                              <td>{user.userId}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.displayName}</td>
                              <td>{user.status}</td>
                              <td>
                                <input type="checkbox" id={`chkSelect${i}`} value={user.userId} onClick={onCheckUser} />
                              </td>
                            </tr>
                          )
                        }
                        return null
                      })}
                  </tbody>
                </table>
              </div>
            )}
            {state.view !== "table" && (
              <ul className="row list-view">
                {state &&
                  list &&
                  list.map((user: any, i: number) => {
                    const result = users.find((v) => v.userId === user.userId)
                    if (!result) {
                      index++
                      return (
                        <li key={i} className="col s12 m6 l4 xl3 img-item">
                          <img src={user.imageURL && user.imageURL.length > 0 ? user.imageURL : ""} alt="user" className="round-border" />
                          <input type="checkbox" name="selected" value={user.userId} onClick={onCheckUser} />
                          <h4 className={user.status === "I" ? "inactive" : ""}>{user.displayName}</h4>
                          <p>{user.email}</p>
                        </li>
                      )
                    }
                    return null
                  })}
              </ul>
            )}
          </form>
        </div>
        <footer>
          <button type="button" onClick={onModelSave}>
            {resource.select}
          </button>
        </footer>
      </div>
    </ReactModal>
  )
}
