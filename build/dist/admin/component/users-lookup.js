var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import Modal from 'react-modal';
import { SearchComponent } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { initForm, inputSearch, registerEvents, storage } from 'uione';
import { context } from '../app';
var UsersLookup = /** @class */ (function (_super) {
    __extends(UsersLookup, _super);
    function UsersLookup(props) {
        var _this = _super.call(this, props, context.getUserService(), inputSearch()) || this;
        _this.onCheckUser = function (event) {
            var _a = _this.state, users = _a.users, list = _a.list;
            var result = list.find(function (value) { return value.userId === event.target.value; });
            if (result) {
                var index = users.indexOf(result);
                if (index !== -1) {
                    delete users[index];
                }
                else {
                    users.push(result);
                }
                _this.setState({ users: users });
            }
        };
        _this.onModelSave = function () {
            _this.setState({ users: [], availableUsers: null, textSearch: '' });
            _this.props.onModelSave(_this.state.users);
        };
        _this.onModelClose = function (event) {
            _this.setState({ users: [], availableUsers: null, textSearch: '' });
            _this.props.onModelClose(event);
        };
        _this.clearUserId = function () {
            var m = _this.state.model;
            m.userId = '';
            _this.setState({ model: m });
        };
        _this.onChangeText = function (event) {
            var _a;
            _this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        };
        _this.onSearch = function (e) {
            _this.setState({ list: [] });
            _this.searchOnClick(e);
        };
        _this.createSearchModel = _this.createSearchModel.bind(_this);
        _this.state = {
            list: [],
            users: [],
            availableUsers: null,
            model: {
                keyword: '',
                userId: '',
            }
        };
        return _this;
    }
    UsersLookup.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
        this.load(this.createSearchModel(), storage.autoSearch);
    };
    UsersLookup.prototype.createSearchModel = function () {
        var obj = {};
        return obj;
    };
    UsersLookup.prototype.render = function () {
        var _this = this;
        var _a = this.props, isOpenModel = _a.isOpenModel, roleAssignToUsers = _a.roleAssignToUsers;
        var _b = this.state, list = _b.list, model = _b.model;
        var resource = this.resource;
        var index = 0;
        return (React.createElement(Modal, { isOpen: isOpenModel, onRequestClose: this.props.onModelClose, contentLabel: 'Modal', 
            // portalClassName='modal-portal'
            className: 'modal-portal-content', bodyOpenClassName: 'modal-portal-open', overlayClassName: 'modal-portal-backdrop' },
            React.createElement("div", { className: 'view-container' },
                React.createElement("header", null,
                    React.createElement("h2", null, resource.users_lookup),
                    React.createElement("button", { type: 'button', id: 'btnClose', name: 'btnClose', className: 'btn-close', onClick: this.onModelClose })),
                React.createElement("div", null,
                    React.createElement("form", { id: 'usersLookupForm', name: 'usersLookupForm', noValidate: true, ref: this.ref },
                        React.createElement("section", { className: 'row search-group' },
                            React.createElement("label", { className: 'col s12 m6 search-input' },
                                React.createElement(PageSizeSelect, { pageSize: this.pageSize, pageSizes: this.pageSizes, onPageSizeChanged: this.pageSizeChanged }),
                                React.createElement("input", { type: 'text', id: 'userId', name: 'userId', onChange: this.onChangeText, value: model.userId, maxLength: 40, placeholder: resource.user_lookup }),
                                React.createElement("button", { type: 'button', hidden: !model.userId, className: 'btn-remove-text', onClick: this.clearUserId }),
                                React.createElement("button", { type: 'submit', className: 'btn-search', onClick: this.onSearch })),
                            React.createElement(Pagination, { className: 'col s12 m6', totalRecords: this.itemTotal, itemsPerPage: this.pageSize, maxSize: this.pageMaxSize, currentPage: this.pageIndex, onPageChanged: this.pageChanged, initPageSize: this.initPageSize }))),
                    React.createElement("form", { className: 'list-result' },
                        React.createElement("div", { className: 'table-responsive' },
                            React.createElement("table", null,
                                React.createElement("thead", null,
                                    React.createElement("tr", null,
                                        React.createElement("th", null, resource.sequence),
                                        React.createElement("th", { "data-field": 'userId' },
                                            React.createElement("button", { type: 'button', id: 'sortUserId', onClick: this.sort }, resource.user_id)),
                                        React.createElement("th", { "data-field": 'username' },
                                            React.createElement("button", { type: 'button', id: 'sortUsername', onClick: this.sort }, resource.username)),
                                        React.createElement("th", { "data-field": 'email' },
                                            React.createElement("button", { type: 'button', id: 'sortEmail', onClick: this.sort }, resource.email)),
                                        React.createElement("th", { "data-field": 'displayname' },
                                            React.createElement("button", { type: 'button', id: 'sortDisplayName', onClick: this.sort }, resource.display_name)),
                                        React.createElement("th", { "data-field": 'status' },
                                            React.createElement("button", { type: 'button', id: 'sortStatus', onClick: this.sort }, resource.status)),
                                        React.createElement("th", { "data-field": '' }, resource.action))),
                                React.createElement("tbody", null, this.state && list && list.map(function (item, i) {
                                    var result = roleAssignToUsers.find(function (v) {
                                        if (v) {
                                            return v.userId === item.userId;
                                        }
                                        return false;
                                    });
                                    if (!result) {
                                        index++;
                                        return (React.createElement("tr", { key: i },
                                            React.createElement("td", { className: 'text-right' }, index),
                                            React.createElement("td", null, item.userId),
                                            React.createElement("td", null, item.username),
                                            React.createElement("td", null, item.email),
                                            React.createElement("td", null, item.displayName),
                                            React.createElement("td", null, item.status),
                                            React.createElement("td", null,
                                                React.createElement("input", { type: 'checkbox', id: 'chkSelect' + i, value: item.userId, onClick: _this.onCheckUser }))));
                                    }
                                })))))),
                React.createElement("footer", null,
                    React.createElement("button", { type: 'button', onClick: this.onModelSave }, resource.select)))));
    };
    return UsersLookup;
}(SearchComponent));
export { UsersLookup };
//# sourceMappingURL=users-lookup.js.map