import * as React from 'react';
import { buildFromUrl } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { useHistory } from 'react-router-dom';
import { mergeSearchModel } from 'search-utilities';
import { pageSizes, useSearch } from 'src/core/hooks/useSearch';
import { handleError, inputSearch } from 'uione';
import { context } from '../app';
var sm = {
    roleId: '',
    roleName: '',
};
var RoleSearch = {
    statusList: [],
    list: [],
    model: sm
};
var initialize = function (load, setPrivateState, c) {
    var masterDataService = context.getMasterDataService();
    Promise.all([
        masterDataService.getStatus()
    ]).then(function (values) {
        var s2 = mergeSearchModel(buildFromUrl(), sm, pageSizes, ['activate']);
        var activationStatuses = values[0];
        setPrivateState({ statusList: activationStatuses }, function () { return load(s2, true); });
    }).catch(handleError);
};
var RolesForm = function () {
    var _a, _b;
    var history = useHistory();
    var refForm = React.useRef();
    var getSearchModel = function () {
        return RoleSearch.model;
    };
    var p = { initialize: initialize, getSearchModel: getSearchModel };
    var hooks = useSearch(refForm, RoleSearch, context.getRoleService(), p, inputSearch());
    var state = hooks.state, resource = hooks.resource, component = hooks.component, updateState = hooks.updateState;
    var edit = function (e, id) {
        e.preventDefault();
        history.push('roles/' + id);
    };
    return (React.createElement("div", { className: 'view-container' },
        React.createElement("header", null,
            React.createElement("h2", null, resource.role_list),
            component.addable && React.createElement("button", { type: 'button', id: 'btnNew', name: 'btnNew', className: 'btn-new', onClick: hooks.add })),
        React.createElement("div", null,
            React.createElement("form", { id: 'rolesForm', name: 'rolesForm', noValidate: true, ref: refForm },
                React.createElement("section", { className: 'row search-group inline' },
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.role_name,
                        React.createElement("input", { type: 'text', id: 'roleName', name: 'roleName', value: state.model.roleName, onChange: updateState, maxLength: 240, placeholder: resource.roleName })),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.status,
                        React.createElement("section", { className: 'checkbox-group' },
                            React.createElement("label", null,
                                React.createElement("input", { type: 'checkbox', id: 'active', name: 'status', value: 'A', checked: (_a = state.model.status) === null || _a === void 0 ? void 0 : _a.includes('A'), onChange: updateState }),
                                resource.active),
                            React.createElement("label", null,
                                React.createElement("input", { type: 'checkbox', id: 'inactive', name: 'status', value: 'I', checked: (_b = state.model.status) === null || _b === void 0 ? void 0 : _b.includes('I'), onChange: updateState }),
                                resource.inactive)))),
                React.createElement("section", { className: 'btn-group' },
                    React.createElement("label", null,
                        resource.page_size,
                        React.createElement(PageSizeSelect, { pageSize: component.pageSize, pageSizes: component.pageSizes, onPageSizeChanged: hooks.pageSizeChanged })),
                    React.createElement("button", { type: 'submit', className: 'btn-search', onClick: hooks.searchOnClick }, resource.search))),
            React.createElement("form", { className: 'list-result' },
                React.createElement("ul", { className: 'row list-view' }, state.list && state.list.length > 0 && state.list.map(function (item, i) {
                    return (React.createElement("li", { key: i, className: 'col s12 m6 l4 xl3', onClick: function (e) { return edit(e, item.roleId); } },
                        React.createElement("section", null,
                            React.createElement("div", null,
                                React.createElement("h3", { className: item.status === 'I' ? 'inactive' : '' }, item.roleName),
                                React.createElement("p", null, item.remark)),
                            React.createElement("button", { className: 'btn-detail' }))));
                })),
                React.createElement(Pagination, { className: 'col s12 m6', totalRecords: component.itemTotal, itemsPerPage: component.pageSize, maxSize: component.pageMaxSize, currentPage: component.pageIndex, onPageChanged: hooks.pageChanged })))));
};
export default RolesForm;
//# sourceMappingURL=roles-form-hook.js.map