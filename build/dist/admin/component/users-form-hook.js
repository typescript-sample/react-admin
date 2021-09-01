import * as React from 'react';
import { buildFromUrl, useRouter } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { mergeSearchModel } from 'search-utilities';
import { pageSizes, useSearch } from 'src/core/hooks/useSearch';
import { handleError, inputSearch } from 'uione';
import femaleIcon from '../../assets/images/female.png';
import maleIcon from '../../assets/images/male.png';
import { context } from '../app';
var sm = {
    userId: '',
    username: '',
    displayName: '',
    email: '',
    status: []
};
var initialState = {
    statusList: [],
    list: [],
    model: sm
};
var currentState = initialState;
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
export var UsersForm = function (props) {
    var refForm = React.useRef();
    var _a = useRouter(), match = _a.match, push = _a.push;
    var getSearchModel = function () {
        return currentState.model;
    };
    var p = { initialize: initialize, getSearchModel: getSearchModel };
    var hooks = useSearch(refForm, initialState, context.getUserService(), p, inputSearch());
    var state = hooks.state, resource = hooks.resource, component = hooks.component, updateState = hooks.updateState;
    currentState = state;
    component.viewable = true;
    component.editable = true;
    var edit = function (e, id) {
        e.preventDefault();
        push("users/" + id);
    };
    var approve = function (e, id) {
        e.preventDefault();
        push("users/approve/" + id);
    };
    var handleNavigateToUpload = function (e, userId) {
        e.preventDefault();
        push("uploads/" + userId + "/image");
    };
    var model = state.model, list = state.list;
    return (React.createElement("div", { className: 'view-container' },
        React.createElement("header", null,
            React.createElement("h2", null, resource.users),
            component.addable && React.createElement("button", { type: 'button', id: 'btnNew', name: 'btnNew', className: 'btn-new', onClick: hooks.add })),
        React.createElement("div", null,
            React.createElement("form", { id: 'usersForm', name: 'usersForm', noValidate: true, ref: refForm },
                React.createElement("section", { className: 'row search-group inline' },
                    React.createElement("label", { className: 'col s12 m4 l4' },
                        resource.username,
                        React.createElement("input", { type: 'text', id: 'username', name: 'username', value: model.username, onChange: updateState, maxLength: 255, placeholder: resource.username })),
                    React.createElement("label", { className: 'col s12 m4 l4' },
                        resource.display_name,
                        React.createElement("input", { type: 'text', id: 'displayName', name: 'displayName', value: model.displayName, onChange: updateState, maxLength: 255, placeholder: resource.display_name })),
                    React.createElement("label", { className: 'col s12 m4 l4 checkbox-section' },
                        resource.status,
                        React.createElement("section", { className: 'checkbox-group' },
                            React.createElement("label", null,
                                React.createElement("input", { type: 'checkbox', id: 'A', name: 'status', value: 'A', checked: model && model.status && model.status.includes('A'), onChange: updateState }),
                                resource.active),
                            React.createElement("label", null,
                                React.createElement("input", { type: 'checkbox', id: 'I', name: 'status', value: 'I', checked: model && model.status && model.status.includes('I'), onChange: updateState }),
                                resource.inactive)))),
                React.createElement("section", { className: 'btn-group' },
                    React.createElement("label", null,
                        resource.page_size,
                        React.createElement(PageSizeSelect, { pageSize: component.pageSize, pageSizes: component.pageSizes, onPageSizeChanged: hooks.pageSizeChanged })),
                    React.createElement("button", { type: 'submit', className: 'btn-search', onClick: hooks.searchOnClick }, resource.search))),
            React.createElement("form", { className: 'list-result' },
                React.createElement("ul", { className: 'row list-view' }, list && list.length > 0 && list.map(function (item, i) {
                    return (React.createElement("li", { key: i, className: 'col s12 m6 l4 xl3' },
                        React.createElement("section", null,
                            React.createElement("img", { onClick: function (e) { return handleNavigateToUpload(e, item.userId); }, src: item.gender === 'F' ? femaleIcon : maleIcon, className: 'round-border' }),
                            React.createElement("div", null,
                                React.createElement("h3", { onClick: function (e) { return edit(e, item.userId); }, className: item.status === 'I' ? 'inactive' : '' }, item.displayName),
                                React.createElement("p", null, item.email)),
                            React.createElement("button", { className: 'btn-detail' }))));
                })),
                React.createElement(Pagination, { className: 'col s12 m6', totalRecords: component.itemTotal, itemsPerPage: component.pageSize, maxSize: component.pageMaxSize, currentPage: component.pageIndex, onPageChanged: hooks.pageChanged, initPageSize: component.initPageSize })))));
};
//# sourceMappingURL=users-form-hook.js.map