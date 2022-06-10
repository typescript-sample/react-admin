import { ValueText } from "onecore";
import * as React from "react";
import { PageSizeSelect } from "../core/react-page-size-select";
import { useNavigate } from "react-router";
import { Pagination } from "reactx-pagination";
import { inputSearch } from "uione";
import femaleIcon from "../assets/images/female.png";
import maleIcon from "../assets/images/male.png";
import {
  checked,
  SearchComponentState,
  useSearch,
  value,
} from "../react-hook-core";
import { Article, ArticleFilter, getArticleService} from './service'

interface ArticleSearch extends SearchComponentState<Article, ArticleFilter> {
  statusList: ValueText[];
}
const articleFilter: ArticleFilter = {
  id: "",
  title: "",
  description: ""
};
const initialState: ArticleSearch = {
  statusList: [],
  filter: articleFilter,
};
export const ArticlesForm = () => {
  const navigate = useNavigate();
  const refForm = React.useRef();
  const {
    state,
    resource,
    component,
    updateState,
    search,
    sort,
    toggleFilter,
    changeView,
    pageChanged,
    pageSizeChanged,
  } = useSearch<Article, ArticleFilter, ArticleSearch>(
    refForm,
    initialState,
    getArticleService(),
    inputSearch()
  );
  component.viewable = true;
  component.editable = true;

  const edit = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.preventDefault();
    navigate(`${id}`);
  };

  const { list } = state;
  const filter = value(state.filter);
  return (
    <div className="view-container">
      <header>
        <h2>Articles</h2>
        <div className="btn-group">
          {component.view !== "table" && (
            <button
              type="button"
              id="btnTable"
              name="btnTable"
              className="btn-table"
              data-view="table"
              onClick={changeView}
            />
          )}
          {component.view === "table" && (
            <button
              type="button"
              id="btnListView"
              name="btnListView"
              className="btn-list-view"
              data-view="listview"
              onClick={changeView}
            />
          )}
          {component.addable && (
            <button
              type="button"
              id="btnNew"
              name="btnNew"
              className="btn-new"
            />
          )}
        </div>
      </header>
      <div>
        <form
          id="usersForm"
          name="usersForm"
          noValidate={true}
          ref={refForm as any}
        >
          <section className="row search-group">
            <label className="col s12 m4 search-input">
              <PageSizeSelect
                size={component.pageSize}
                sizes={component.pageSizes}
                onChange={pageSizeChanged}
              />
              <input
                type="text"
                id="q"
                name="q"
                value={filter.q}
                onChange={updateState}
                maxLength={255}
                placeholder={resource.keyword}
              />
              <button
                type="button"
                className="btn-filter"
                onClick={toggleFilter}
              />
              <button type="submit" className="btn-search" onClick={search} />
            </label>
            <Pagination
              className="col s12 m8"
              total={component.total}
              size={component.pageSize}
              max={component.pageMaxSize}
              page={component.pageIndex}
              onChange={pageChanged}
            />
          </section>
          <section
            className="row search-group inline"
            hidden={component.hideFilter}
          >
            <label className="col s12 m4 l4">
              {resource.person_title}
              <input
                type="text"
                id="title"
                name="title"
                value={filter.title}
                onChange={updateState}
                maxLength={255}
                placeholder={resource.person_title}
              />
            </label>
            <label className="col s12 m4 l4">
              {resource.description}
              <input
                type="text"
                id="description"
                name="description"
                value={filter.description}
                onChange={updateState}
                maxLength={255}
                placeholder={resource.description}
              />
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
                    <th data-field="id">
                      <button type="button" id="sortId" onClick={sort}>
                        {resource.id}
                      </button>
                    </th>
                    <th data-field="title">
                      <button type="button" id="sortTitle" onClick={sort}>
                        {resource.title}
                      </button>
                    </th>
                    <th data-field="description">
                      <button type="button" id="sortDescription" onClick={sort}>
                        {resource.description}
                      </button>
                    </th>
                    
                  </tr>
                </thead>
                {list &&
                  list.length > 0 &&
                  list.map((article, i) => {
                    return (
                      <tr key={i} onClick={(e) => edit(e, article.id)}>
                        <td className="text-right">
                          {(article as any).sequenceNo}
                        </td>
                        <td>{article.id}</td>
                        <td>{article.title}</td>
                        <td>{article.description}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}
          {component.view !== "table" && (
            <ul className="row list-view">
              {list &&
                list.length > 0 &&
                list.map((article, i) => {
                  return (
                    <li
                      key={i}
                      className="col s12 m6 l4 xl3"
                      onClick={(e) => edit(e, article.id)}
                    >
                      <section>
                        <div>
                          <h3>
                            {article.title}
                          </h3>
                          <p>{article.description}</p>
                        </div>
                        <button className="btn-detail" />
                      </section>
                    </li>
                  );
                })}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};
