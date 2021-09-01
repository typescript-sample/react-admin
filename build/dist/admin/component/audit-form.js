import * as React from 'react';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { useHistory } from 'react-router-dom';
import { useSearch } from 'src/core/hooks/useSearch';
import { inputSearch } from 'uione';
import { context } from '../app';
var sm = {
    id: '',
    action: '',
};
var AuditSearch = {
    statusList: [],
    list: [],
    model: sm
};
var RolesForm = function () {
    var history = useHistory();
    var refForm = React.useRef();
    var getSearchModel = function () {
        return AuditSearch.model;
    };
    var p = { getSearchModel: getSearchModel };
    var hooks = useSearch(refForm, AuditSearch, context.getAuditService(), p, inputSearch());
    var state = hooks.state, resource = hooks.resource, component = hooks.component, updateState = hooks.updateState;
    var edit = function (e, id) {
        e.preventDefault();
        history.push('audit-logs/' + id);
    };
    return (React.createElement("div", { className: 'view-container' },
        React.createElement("header", null,
            React.createElement("h2", null, resource.role_list),
            component.addable && React.createElement("button", { type: 'button', id: 'btnNew', name: 'btnNew', className: 'btn-new', onClick: hooks.add })),
        React.createElement("div", null,
            React.createElement("form", { id: 'rolesForm', name: 'rolesForm', noValidate: true, ref: refForm },
                React.createElement("section", { className: 'row search-group inline' },
                    React.createElement("label", { className: 'col s12 m6' },
                        "Action",
                        React.createElement("input", { type: 'text', id: 'action', name: 'action', value: state.model.action, onChange: updateState, maxLength: 240 }))),
                React.createElement("section", { className: 'btn-group' },
                    React.createElement("label", null,
                        resource.page_size,
                        React.createElement(PageSizeSelect, { pageSize: component.pageSize, pageSizes: component.pageSizes, onPageSizeChanged: hooks.pageSizeChanged })),
                    React.createElement("button", { type: 'submit', className: 'btn-search', onClick: hooks.searchOnClick }, resource.search))),
            React.createElement("form", { className: 'list-result' },
                React.createElement("ul", { className: 'row list-view' }, state.list && state.list.length > 0 && state.list.map(function (item, i) {
                    return (React.createElement("li", { key: i, className: 'col s12 m6 l4 xl3', onClick: function (e) { return edit(e, item.userId); } },
                        React.createElement("section", null,
                            React.createElement("div", null,
                                React.createElement("h3", null, item.userId),
                                React.createElement("h4", null, item.action),
                                React.createElement("p", null, item.remark)),
                            React.createElement("button", { className: 'btn-detail' }))));
                })),
                React.createElement(Pagination, { className: 'col s12 m6', totalRecords: component.itemTotal, itemsPerPage: component.pageSize, maxSize: component.pageMaxSize, currentPage: component.pageIndex, onPageChanged: hooks.pageChanged })))));
};
export default RolesForm;
//# sourceMappingURL=audit-form.js.map