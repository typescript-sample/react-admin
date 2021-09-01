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
import { initForm, inputSearch, registerEvents, storage } from 'uione';
import { context } from '../app';
var RolesForm = /** @class */ (function (_super) {
    __extends(RolesForm, _super);
    function RolesForm(props) {
        var _this = _super.call(this, props, context.getRoleService(), inputSearch()) || this;
        _this.masterDataService = context.getMasterDataService();
        _this.edit = function (e, id) {
            e.preventDefault();
            _this.props.history.push('roles/' + id);
        };
        _this.approve = function (e, role) {
            e.preventDefault();
            _this.props.history.push('access-role-definition/approve/' + role.roleId);
        };
        _this.viewable = true;
        _this.editable = true;
        _this.state = {
            statusList: [],
            list: [],
            model: {
                keyword: '',
                roleName: '',
                status: []
            }
        };
        return _this;
    }
    RolesForm.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
        var s = this.mergeSearchModel(buildFromUrl(), this.state.model, ['status']);
        this.load(s, storage.autoSearch);
    };
    RolesForm.prototype.getSearchModel = function () {
        var name = this.getModelName();
        var lc = this.getLocale();
        var cc = this.getCurrencyCode();
        var fields = this.getDisplayFields();
        var f = this.getSearchForm();
        var dc = (this.ui ? this.ui.decodeFromForm : null);
        var obj3 = getModel(this.state, name, this, fields, this.excluding, this.keys, [], f, dc, lc, cc);
        return obj3;
    };
    RolesForm.prototype.render = function () {
        var _this = this;
        var resource = this.resource;
        var _a = this.state, model = _a.model, list = _a.list;
        console.log(this.editable);
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("header", null,
                React.createElement("h2", null, resource.role_list),
                this.addable && React.createElement("button", { type: 'button', id: 'btnNew', name: 'btnNew', className: 'btn-new', onClick: this.add })),
            React.createElement("div", null,
                React.createElement("form", { id: 'rolesForm', name: 'rolesForm', noValidate: true, ref: this.ref },
                    React.createElement("section", { className: 'row search-group inline' },
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.role_name,
                            React.createElement("input", { type: 'text', id: 'roleName', name: 'roleName', value: model.roleName, onChange: this.updateState, maxLength: 240, placeholder: resource.roleName })),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.status,
                            React.createElement("section", { className: 'checkbox-group' },
                                React.createElement("label", null,
                                    React.createElement("input", { type: 'checkbox', id: 'active', name: 'status', value: 'A', checked: model.status.includes('A'), onChange: this.updateState }),
                                    resource.active),
                                React.createElement("label", null,
                                    React.createElement("input", { type: 'checkbox', id: 'inactive', name: 'status', value: 'I', checked: model.status.includes('I'), onChange: this.updateState }),
                                    resource.inactive)))),
                    React.createElement("section", { className: 'btn-group' },
                        React.createElement("label", null,
                            resource.page_size,
                            React.createElement(PageSizeSelect, { pageSize: this.pageSize, pageSizes: this.pageSizes, onPageSizeChanged: this.pageSizeChanged })),
                        React.createElement("button", { type: 'submit', className: 'btn-search', onClick: this.searchOnClick }, resource.search))),
                React.createElement("form", { className: 'list-result' },
                    React.createElement("ul", { className: 'row list-view' }, list && list.length > 0 && list.map(function (item, i) {
                        return (React.createElement("li", { key: i, className: 'col s12 m6 l4 xl3', onClick: function (e) { return _this.edit(e, item.roleId); } },
                            React.createElement("section", null,
                                React.createElement("div", null,
                                    React.createElement("h3", { className: item.status === 'I' ? 'inactive' : '' }, item.roleName),
                                    React.createElement("p", null, item.remark)),
                                React.createElement("button", { className: 'btn-detail' }))));
                    })),
                    React.createElement(Pagination, { className: 'col s12 m6', totalRecords: this.itemTotal, itemsPerPage: this.pageSize, maxSize: this.pageMaxSize, currentPage: this.pageIndex, onPageChanged: this.pageChanged })))));
    };
    return RolesForm;
}(SearchComponent));
export { RolesForm };
//# sourceMappingURL=roles-form.js.map