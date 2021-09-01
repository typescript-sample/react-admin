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
import { buildFromUrl, SearchComponent } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import { getModel } from 'search-utilities';
import { handleError, initForm, inputSearch, registerEvents, storage } from 'uione';
import { context } from '../app';
var UsersForm = /** @class */ (function (_super) {
    __extends(UsersForm, _super);
    function UsersForm(props) {
        var _this = _super.call(this, props, context.getUserService(), inputSearch()) || this;
        _this.masterDataService = context.getMasterDataService();
        _this.edit = function (e, id) {
            e.preventDefault();
            _this.props.history.push("users/" + id);
        };
        _this.approve = function (e, id) {
            e.preventDefault();
            _this.props.history.push("users/approve/" + id);
        };
        _this.viewable = true;
        _this.editable = true;
        _this.state = {
            statusList: [],
            list: [],
            model: {
                userId: '',
                keyword: '',
                status: []
            }
        };
        return _this;
    }
    UsersForm.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
        var s = this.mergeSearchModel(buildFromUrl(), this.state.model, ['ctrlStatus', 'activate']);
        this.load(s, storage.autoSearch);
    };
    UsersForm.prototype.load = function (s, autoSearch) {
        var _this = this;
        Promise.all([
            this.masterDataService.getStatus()
        ]).then(function (values) {
            var statusList = values[0];
            _this.setState({ statusList: statusList }, function () { return _super.prototype.load.call(_this, s, autoSearch); });
        }).catch(handleError);
    };
    UsersForm.prototype.getSearchModel = function () {
        var name = this.getModelName();
        var lc = this.getLocale();
        var cc = this.getCurrencyCode();
        var fields = this.getDisplayFields();
        var f = this.getSearchForm();
        var dc = (this.ui ? this.ui.decodeFromForm : null);
        var obj3 = getModel(this.state, name, this, fields, this.excluding, this.keys, [], f, dc, lc, cc);
        return obj3;
    };
    UsersForm.prototype.render = function () {
        var _this = this;
        var resource = this.resource;
        var _a = this.state, statusList = _a.statusList, model = _a.model;
        console.log(this.editable);
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("header", null,
                React.createElement("h2", null, resource.users),
                this.addable && React.createElement("button", { type: 'button', id: 'btnNew', name: 'btnNew', className: 'btn-new', onClick: this.add })),
            React.createElement("div", null,
                React.createElement("form", { id: 'usersForm', name: 'usersForm', noValidate: true, ref: this.ref },
                    React.createElement("section", { className: 'row search-group inline' },
                        React.createElement("label", { className: 'col s12 m4 l3' },
                            resource.user_id,
                            React.createElement("input", { type: 'text', id: 'userId', name: 'userId', value: model.userId, onChange: this.updateState, maxLength: 255, placeholder: resource.user_id })),
                        React.createElement("label", { className: 'col s12 m8 l4 checkbox-section' },
                            resource.activation_status,
                            React.createElement("section", { className: 'checkbox-group' }, statusList.map(function (item, index) { return (React.createElement("label", { key: index },
                                React.createElement("input", { type: 'checkbox', id: item.value, name: 'status', key: index, value: item.value, checked: model.status.includes(item.value), onChange: _this.updateState }),
                                item.text)); })))),
                    React.createElement("section", { className: 'btn-group' },
                        React.createElement("label", null,
                            resource.page_size,
                            React.createElement(PageSizeSelect, { pageSize: this.pageSize, pageSizes: this.pageSizes, onPageSizeChanged: this.pageSizeChanged })),
                        React.createElement("button", { type: 'submit', className: 'btn-search', onClick: this.searchOnClick }, resource.search))),
                React.createElement("form", { className: 'list-result' },
                    React.createElement("div", { className: 'table-responsive' },
                        React.createElement("table", null,
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, resource.sequence),
                                    React.createElement("th", { "data-field": 'userId' },
                                        React.createElement("button", { type: 'button', id: 'sortUserId', onClick: this.sort }, resource.user_id)),
                                    React.createElement("th", { "data-field": 'username' },
                                        React.createElement("button", { type: 'button', id: 'sortUserName', onClick: this.sort }, resource.username)),
                                    React.createElement("th", { "data-field": 'email' },
                                        React.createElement("button", { type: 'button', id: 'sortEmail', onClick: this.sort }, resource.email)),
                                    React.createElement("th", { "data-field": 'displayname' },
                                        React.createElement("button", { type: 'button', id: 'sortDisplayName', onClick: this.sort }, resource.display_name)),
                                    React.createElement("th", { "data-field": 'status' },
                                        React.createElement("button", { type: 'button', id: 'sortStatus', onClick: this.sort }, resource.status)),
                                    React.createElement("th", { className: 'action' }, resource.action))),
                            React.createElement("tbody", null, this.state && this.state.list && this.state.list.map(function (item, i) {
                                return (React.createElement("tr", { key: i },
                                    React.createElement("td", { className: 'text-right' }, item.sequenceNo),
                                    React.createElement("td", null, item.userId),
                                    React.createElement("td", null, item.username),
                                    React.createElement("td", null, item.email),
                                    React.createElement("td", null, item.displayName),
                                    React.createElement("td", null, item.status),
                                    React.createElement("td", null, (_this.editable || _this.viewable) &&
                                        React.createElement("button", { type: 'button', id: 'btnView' + i, className: _this.editable ? 'btn-edit' : 'btn-view', onClick: function (e) { return _this.edit(e, item.userId); } }))));
                            })))),
                    React.createElement(Pagination, { className: 'col s12 m6', totalRecords: this.itemTotal, itemsPerPage: this.pageSize, maxSize: this.pageMaxSize, currentPage: this.pageIndex, onPageChanged: this.pageChanged, initPageSize: this.initPageSize })))));
    };
    return UsersForm;
}(SearchComponent));
export { UsersForm };
//# sourceMappingURL=users-form.js.map